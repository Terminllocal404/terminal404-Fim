<?php
/**
 * Terminal_404 - Funções Auxiliares
 * Funções de segurança, validação, email e utilidades
 */

// ==================== FUNÇÕES DE RESPOSTA JSON ==================== //

/**
 * Envia resposta JSON de sucesso
 */
function send_json_response($data, $status_code = 200) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Envia resposta JSON de erro
 */
function send_json_error($message, $status_code = 400) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'error' => $message
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // Log do erro
    log_message("ERRO [$status_code]: $message");
    exit;
}

/**
 * Lê e decodifica JSON do input
 */
function get_json_input() {
    $json = file_get_contents('php://input');
    if (empty($json)) {
        return null;
    }
    
    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return null;
    }
    
    return $data;
}

// ==================== FUNÇÕES DE SEGURANÇA ==================== //

/**
 * Sanitiza input para prevenir XSS
 */
function sanitize_input($input) {
    if (is_array($input)) {
        return array_map('sanitize_input', $input);
    }
    
    // Remove tags HTML
    $input = strip_tags($input);
    
    // Converte entidades HTML
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    
    // Remove espaços extras
    $input = trim($input);
    
    return $input;
}

/**
 * Valida e sanitiza email
 */
function validate_email($email) {
    $email = trim($email);
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Rate Limiting - Controla número de requisições
 * 
 * @param string $key Identificador único (ex: 'contact', 'project')
 * @param int $max_requests Número máximo de requisições
 * @param int $time_window Janela de tempo em segundos
 * @return bool True se permitido, False se bloqueado
 */
function check_rate_limit($key, $max_requests, $time_window) {
    // Obter IP do cliente
    $ip = get_client_ip();
    
    // Chave única: tipo + IP
    $rate_key = $key . '_' . md5($ip);
    
    // Carregar dados de rate limiting
    $rate_data = [];
    if (file_exists(RATE_LIMIT_FILE)) {
        $content = file_get_contents(RATE_LIMIT_FILE);
        $rate_data = json_decode($content, true) ?? [];
    }
    
    // Limpar dados antigos (mais de 1 hora)
    $now = time();
    $rate_data = array_filter($rate_data, function($item) use ($now) {
        return ($now - $item['first_request']) < 3600;
    });
    
    // Verificar se o IP está no rate limit
    if (isset($rate_data[$rate_key])) {
        $item = $rate_data[$rate_key];
        
        // Se passou o tempo, resetar
        if (($now - $item['first_request']) > $time_window) {
            unset($rate_data[$rate_key]);
        } else {
            // Verificar se excedeu o limite
            if ($item['count'] >= $max_requests) {
                log_message("RATE LIMIT EXCEDIDO: $ip para $key");
                return false;
            }
            
            // Incrementar contador
            $rate_data[$rate_key]['count']++;
            $rate_data[$rate_key]['last_request'] = $now;
        }
    }
    
    // Criar novo registro se não existir
    if (!isset($rate_data[$rate_key])) {
        $rate_data[$rate_key] = [
            'first_request' => $now,
            'last_request' => $now,
            'count' => 1,
            'ip' => $ip
        ];
    }
    
    // Salvar dados atualizados
    file_put_contents(RATE_LIMIT_FILE, json_encode($rate_data, JSON_PRETTY_PRINT));
    
    return true;
}

/**
 * Obtém IP real do cliente (considerando proxies)
 */
function get_client_ip() {
    $ip_keys = [
        'HTTP_CF_CONNECTING_IP',  // CloudFlare
        'HTTP_X_FORWARDED_FOR',   // Proxy
        'HTTP_X_REAL_IP',         // Nginx
        'REMOTE_ADDR'             // Direto
    ];
    
    foreach ($ip_keys as $key) {
        if (isset($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            
            // Se tiver múltiplos IPs (proxy chain), pegar o primeiro
            if (strpos($ip, ',') !== false) {
                $ip = explode(',', $ip)[0];
            }
            
            $ip = trim($ip);
            
            // Validar IP
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    
    return '0.0.0.0';
}

// ==================== FUNÇÕES DE EMAIL ==================== //

/**
 * Envia email via SMTP do Gmail usando PHPMailer
 * 
 * @param string $subject Assunto do email
 * @param string $body Corpo do email (HTML)
 * @return bool True se enviado com sucesso
 */
function send_email($subject, $body) {
    try {
        // Usar mail() nativo do PHP (mais simples)
        // Para Gmail SMTP, seria necessário PHPMailer, mas vou criar uma versão simplificada
        
        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . SMTP_FROM_NAME . ' <' . SMTP_EMAIL . '>',
            'Reply-To: ' . SMTP_EMAIL,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        $success = mail(
            SMTP_RECIPIENT,
            $subject,
            $body,
            implode("\r\n", $headers)
        );
        
        if ($success) {
            log_message("Email enviado com sucesso: $subject");
            return true;
        } else {
            log_message("ERRO ao enviar email: $subject");
            
            // Fallback: Tentar com SMTP usando stream socket
            return send_email_smtp($subject, $body);
        }
        
    } catch (Exception $e) {
        log_message("ERRO no envio de email: " . $e->getMessage());
        return false;
    }
}

/**
 * Envia email via SMTP usando socket (fallback)
 */
function send_email_smtp($subject, $body) {
    try {
        // Conectar ao servidor SMTP
        $smtp = fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, 30);
        
        if (!$smtp) {
            log_message("ERRO SMTP: Não foi possível conectar - $errstr ($errno)");
            return false;
        }
        
        // Ler resposta inicial
        fgets($smtp, 515);
        
        // Comandos SMTP
        fputs($smtp, "EHLO " . SMTP_HOST . "\r\n");
        fgets($smtp, 515);
        
        // STARTTLS
        fputs($smtp, "STARTTLS\r\n");
        fgets($smtp, 515);
        
        // Autenticação
        fputs($smtp, "AUTH LOGIN\r\n");
        fgets($smtp, 515);
        
        fputs($smtp, base64_encode(SMTP_EMAIL) . "\r\n");
        fgets($smtp, 515);
        
        fputs($smtp, base64_encode(SMTP_PASSWORD) . "\r\n");
        $auth_response = fgets($smtp, 515);
        
        if (strpos($auth_response, '235') === false) {
            log_message("ERRO SMTP: Falha na autenticação");
            fclose($smtp);
            return false;
        }
        
        // Remetente
        fputs($smtp, "MAIL FROM: <" . SMTP_EMAIL . ">\r\n");
        fgets($smtp, 515);
        
        // Destinatário
        fputs($smtp, "RCPT TO: <" . SMTP_RECIPIENT . ">\r\n");
        fgets($smtp, 515);
        
        // Dados
        fputs($smtp, "DATA\r\n");
        fgets($smtp, 515);
        
        // Cabeçalhos e corpo
        $email_content = "Subject: $subject\r\n";
        $email_content .= "From: " . SMTP_FROM_NAME . " <" . SMTP_EMAIL . ">\r\n";
        $email_content .= "To: <" . SMTP_RECIPIENT . ">\r\n";
        $email_content .= "MIME-Version: 1.0\r\n";
        $email_content .= "Content-Type: text/html; charset=UTF-8\r\n";
        $email_content .= "\r\n";
        $email_content .= $body . "\r\n";
        $email_content .= ".\r\n";
        
        fputs($smtp, $email_content);
        fgets($smtp, 515);
        
        // Fechar conexão
        fputs($smtp, "QUIT\r\n");
        fclose($smtp);
        
        log_message("Email enviado via SMTP: $subject");
        return true;
        
    } catch (Exception $e) {
        log_message("ERRO SMTP: " . $e->getMessage());
        return false;
    }
}

// ==================== FORMATAÇÃO DE EMAILS ==================== //

/**
 * Formata email de contato em HTML
 */
function format_contact_email($name, $email, $message) {
    $name_safe = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email_safe = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message_safe = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
    $timestamp = date('d/m/Y \à\s H:i:s');
    
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #05070D; color: #fff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #0B0F1A; border: 2px solid #00E5FF; border-radius: 10px; padding: 30px; }
        .header { text-align: center; border-bottom: 2px solid #00E5FF; padding-bottom: 20px; margin-bottom: 20px; }
        .header h1 { color: #00E5FF; margin: 0; }
        .field { margin-bottom: 15px; padding: 15px; background: #05070D; border-left: 3px solid #00E5FF; border-radius: 5px; }
        .label { color: #00E5FF; font-weight: bold; margin-bottom: 5px; }
        .value { color: #B0B3B8; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #00E5FF; color: #B0B3B8; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💬 Nova Mensagem de Contato</h1>
            <p style="color: #B0B3B8; margin: 10px 0 0 0;">Terminal_404</p>
        </div>
        
        <div class="field">
            <div class="label">👤 Nome:</div>
            <div class="value">$name_safe</div>
        </div>
        
        <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">$email_safe</div>
        </div>
        
        <div class="field">
            <div class="label">💭 Mensagem:</div>
            <div class="value">$message_safe</div>
        </div>
        
        <div class="footer">
            <p>Recebido em: $timestamp</p>
            <p>Terminal_404 - Tecnologia & Desenvolvimento</p>
        </div>
    </div>
</body>
</html>
HTML;
}

/**
 * Formata email de solicitação de projeto em HTML
 */
function format_project_email($data) {
    $timestamp = date('d/m/Y \à\s H:i:s');
    
    // Sanitizar dados
    $safe = [];
    foreach ($data as $key => $value) {
        if (is_string($value)) {
            $safe[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        } elseif (is_array($value)) {
            $safe[$key] = array_map(function($item) {
                return htmlspecialchars($item, ENT_QUOTES, 'UTF-8');
            }, $value);
        } else {
            $safe[$key] = $value;
        }
    }
    
    // Formatar tech stack
    $tech_badges = '';
    if (!empty($safe['tech_stack'])) {
        foreach ($safe['tech_stack'] as $tech) {
            $tech_badges .= '<span class="tech-badge">' . $tech . '</span>';
        }
    }
    
    // Campos opcionais
    $company_html = $safe['company'] ? '<div class="field"><div class="label">Empresa:</div><div class="value">' . $safe['company'] . '</div></div>' : '';
    $deadline_html = $safe['deadline'] ? '<div class="field"><div class="label">Prazo:</div><div class="value">' . $safe['deadline'] . '</div></div>' : '';
    $budget_html = $safe['budget'] ? '<div class="field"><div class="label">Orçamento:</div><div class="value">' . $safe['budget'] . '</div></div>' : '';
    $additional_html = $safe['additional_info'] ? '<div class="field"><div class="label">Informações Adicionais:</div><div class="value">' . nl2br($safe['additional_info']) . '</div></div>' : '';
    
    $has_design_text = $safe['has_design'] ? '✅ Sim' : '❌ Não';
    $needs_hosting_text = $safe['needs_hosting'] ? '✅ Sim' : '❌ Não';
    
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #05070D; color: #fff; margin: 0; padding: 20px; }
        .container { max-width: 700px; margin: 0 auto; background: #0B0F1A; border: 2px solid #00E5FF; border-radius: 10px; padding: 30px; }
        .header { text-align: center; border-bottom: 2px solid #00E5FF; padding-bottom: 20px; margin-bottom: 20px; }
        .header h1 { color: #00E5FF; margin: 0; }
        .section { margin-bottom: 25px; }
        .section-title { color: #00E5FF; font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #00E5FF; }
        .field { margin-bottom: 15px; padding: 15px; background: #05070D; border-left: 3px solid #00E5FF; border-radius: 5px; }
        .label { color: #00E5FF; font-weight: bold; margin-bottom: 5px; }
        .value { color: #B0B3B8; }
        .tech-stack { display: flex; flex-wrap: wrap; gap: 10px; }
        .tech-badge { background: #00E5FF; color: #0B0F1A; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; margin: 5px; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #00E5FF; color: #B0B3B8; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Nova Solicitação de Projeto</h1>
            <p style="color: #B0B3B8; margin: 10px 0 0 0;">Terminal_404</p>
        </div>
        
        <div class="section">
            <div class="section-title">👤 Dados do Cliente</div>
            <div class="field">
                <div class="label">Nome:</div>
                <div class="value">{$safe['name']}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{$safe['email']}</div>
            </div>
            <div class="field">
                <div class="label">Telefone:</div>
                <div class="value">{$safe['phone']}</div>
            </div>
            $company_html
        </div>
        
        <div class="section">
            <div class="section-title">📋 Informações do Projeto</div>
            <div class="field">
                <div class="label">Tipo de Projeto:</div>
                <div class="value">{$safe['project_type']}</div>
            </div>
            <div class="field">
                <div class="label">Título:</div>
                <div class="value">{$safe['project_title']}</div>
            </div>
            <div class="field">
                <div class="label">Descrição:</div>
                <div class="value">{$safe['project_description']}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">⚙️ Especificações Técnicas</div>
            <div class="field">
                <div class="label">Tecnologias:</div>
                <div class="tech-stack">$tech_badges</div>
            </div>
            $deadline_html
            $budget_html
        </div>
        
        <div class="section">
            <div class="section-title">📦 Requisitos Adicionais</div>
            <div class="field">
                <div class="label">Possui Design:</div>
                <div class="value">$has_design_text</div>
            </div>
            <div class="field">
                <div class="label">Precisa de Hospedagem:</div>
                <div class="value">$needs_hosting_text</div>
            </div>
            $additional_html
        </div>
        
        <div class="footer">
            <p>Recebido em: $timestamp</p>
            <p>Terminal_404 - Tecnologia & Desenvolvimento</p>
        </div>
    </div>
</body>
</html>
HTML;
}

// ==================== FUNÇÕES DE LOG ==================== //

/**
 * Registra mensagem no log
 */
function log_message($message) {
    $timestamp = date('Y-m-d H:i:s');
    $ip = get_client_ip();
    $log_entry = "[$timestamp] [$ip] $message\n";
    
    // Rotação de log se muito grande
    if (file_exists(LOG_FILE) && filesize(LOG_FILE) > LOG_MAX_SIZE) {
        $backup_file = LOG_FILE . '.' . date('Y-m-d-His') . '.bak';
        rename(LOG_FILE, $backup_file);
    }
    
    file_put_contents(LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
}
