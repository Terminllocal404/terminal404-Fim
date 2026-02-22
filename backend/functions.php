<?php
/**
 * Terminal_404 - Funções Auxiliares
 * Funções de segurança, validação, email e utilidades
 * 
 * @version 3.0.0
 * @author Terminal_404
 * @date 22/02/2026
 */

// ==================== FUNÇÕES DE RESPOSTA JSON ==================== //

/**
 * Envia resposta JSON de sucesso
 * 
 * @param mixed $data Dados para retornar
 * @param int $status_code Código HTTP (padrão: 200)
 */
function send_json_response($data, $status_code = 200) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Envia resposta JSON de erro
 * 
 * @param string $message Mensagem de erro
 * @param int $status_code Código HTTP (padrão: 400)
 */
function send_json_error($message, $status_code = 400) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    
    $response = [
        'success' => false,
        'error' => $message
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // Log do erro
    log_message("ERRO [$status_code]: $message", 'ERROR');
    exit;
}

/**
 * Lê e decodifica JSON do input da requisição
 * 
 * @return array|null Dados decodificados ou null se inválido
 */
function get_json_input() {
    $json = file_get_contents('php://input');
    
    if (empty($json)) {
        return null;
    }
    
    $data = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        log_message("Erro ao decodificar JSON: " . json_last_error_msg(), 'ERROR');
        return null;
    }
    
    return $data;
}

// ==================== FUNÇÕES DE SEGURANÇA ==================== //

/**
 * Sanitiza input para prevenir XSS e injeção
 * 
 * @param mixed $input String ou array para sanitizar
 * @return mixed Input sanitizado
 */
function sanitize_input($input) {
    if (is_array($input)) {
        return array_map('sanitize_input', $input);
    }
    
    if (!is_string($input)) {
        return $input;
    }
    
    // Remove espaços extras
    $input = trim($input);
    
    // Remove tags HTML e PHP
    $input = strip_tags($input);
    
    // Converte entidades HTML
    $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    return $input;
}

/**
 * Valida email
 * 
 * @param string $email Email para validar
 * @return string|false Email válido ou false
 */
function validate_email($email) {
    $email = trim($email);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    
    if ($email && strlen($email) <= 255) {
        return $email;
    }
    
    return false;
}

/**
 * Valida nome (apenas letras e espaços)
 * 
 * @param string $name Nome para validar
 * @param int $min_length Tamanho mínimo
 * @param int $max_length Tamanho máximo
 * @return bool
 */
function validate_name($name, $min_length = 2, $max_length = 100) {
    $name = trim($name);
    $length = mb_strlen($name, 'UTF-8');
    
    if ($length < $min_length || $length > $max_length) {
        return false;
    }
    
    // Permite letras (incluindo acentuadas), espaços e hífen
    if (!preg_match('/^[a-zA-ZÀ-ÿ\s\-]+$/u', $name)) {
        return false;
    }
    
    return true;
}

/**
 * Valida telefone brasileiro
 * 
 * @param string $phone Telefone para validar
 * @return bool
 */
function validate_phone($phone) {
    // Remove tudo exceto números
    $clean_phone = preg_replace('/\D/', '', $phone);
    
    // Telefone brasileiro: 10 ou 11 dígitos
    $length = strlen($clean_phone);
    
    return ($length >= 10 && $length <= 11);
}

/**
 * Obtém IP real do cliente (considerando proxies)
 * 
 * @return string IP do cliente
 */
function get_client_ip() {
    $ip_keys = [
        'HTTP_CF_CONNECTING_IP',  // CloudFlare
        'HTTP_X_FORWARDED_FOR',   // Proxy
        'HTTP_X_REAL_IP',         // Nginx
        'REMOTE_ADDR'             // Direto
    ];
    
    foreach ($ip_keys as $key) {
        if (isset($_SERVER[$key]) && !empty($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            
            // Se tiver múltiplos IPs (proxy chain), pegar o primeiro
            if (strpos($ip, ',') !== false) {
                $ips = explode(',', $ip);
                $ip = trim($ips[0]);
            }
            
            $ip = trim($ip);
            
            // Validar IP
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
            
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    
    return '0.0.0.0';
}

/**
 * Rate Limiting - Controla número de requisições
 * 
 * @param string $endpoint Nome do endpoint (ex: 'contact', 'project')
 * @param int $max_requests Número máximo de requisições
 * @param int $time_window Janela de tempo em segundos
 * @return bool True se permitido, False se bloqueado
 */
function check_rate_limit($endpoint, $max_requests, $time_window) {
    $ip = get_client_ip();
    $rate_key = $endpoint . '_' . md5($ip);
    
    // Carregar dados de rate limiting
    $rate_data = [];
    if (file_exists(RATE_LIMIT_FILE)) {
        $content = @file_get_contents(RATE_LIMIT_FILE);
        if ($content) {
            $rate_data = json_decode($content, true) ?? [];
        }
    }
    
    $now = time();
    
    // Limpar dados antigos (mais de 1 hora)
    $rate_data = array_filter($rate_data, function($item) use ($now) {
        return isset($item['first_request']) && ($now - $item['first_request']) < 3600;
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
                log_message("RATE LIMIT EXCEDIDO: $ip no endpoint $endpoint (tentativa " . ($item['count'] + 1) . ")", 'WARNING');
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
    @file_put_contents(RATE_LIMIT_FILE, json_encode($rate_data, JSON_PRETTY_PRINT));
    
    return true;
}

// ==================== FUNÇÕES DE EMAIL ==================== //

/**
 * Envia email via SMTP do Gmail
 * 
 * @param string $subject Assunto do email
 * @param string $body Corpo do email em HTML
 * @return bool True se enviado com sucesso
 */
function send_email($subject, $body) {
    try {
        // Conectar ao servidor SMTP
        $smtp = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 30);
        
        if (!$smtp) {
            log_message("ERRO SMTP: Não conectou - $errstr ($errno)", 'ERROR');
            return send_email_tls($subject, $body); // Tentar com TLS
        }
        
        $response = fgets($smtp);
        if (strpos($response, '220') === false) {
            fclose($smtp);
            return send_email_tls($subject, $body);
        }
        
        // EHLO
        fputs($smtp, "EHLO " . SMTP_HOST . "\r\n");
        $response = '';
        while ($str = fgets($smtp, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        
        // AUTH LOGIN
        fputs($smtp, "AUTH LOGIN\r\n");
        fgets($smtp);
        
        fputs($smtp, base64_encode(SMTP_EMAIL) . "\r\n");
        fgets($smtp);
        
        fputs($smtp, base64_encode(SMTP_PASSWORD) . "\r\n");
        $auth_response = fgets($smtp);
        
        if (strpos($auth_response, '235') === false) {
            log_message("ERRO SMTP: Falha na autenticação", 'ERROR');
            fclose($smtp);
            return false;
        }
        
        // MAIL FROM
        fputs($smtp, "MAIL FROM: <" . SMTP_EMAIL . ">\r\n");
        fgets($smtp);
        
        // RCPT TO
        fputs($smtp, "RCPT TO: <" . SMTP_RECIPIENT . ">\r\n");
        fgets($smtp);
        
        // DATA
        fputs($smtp, "DATA\r\n");
        fgets($smtp);
        
        // Construir email
        $headers = "From: " . SMTP_FROM_NAME . " <" . SMTP_EMAIL . ">\r\n";
        $headers .= "To: <" . SMTP_RECIPIENT . ">\r\n";
        $headers .= "Subject: " . encode_mime_header($subject) . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Content-Transfer-Encoding: 8bit\r\n";
        $headers .= "\r\n";
        
        fputs($smtp, $headers);
        fputs($smtp, $body . "\r\n");
        fputs($smtp, ".\r\n");
        
        $data_response = fgets($smtp);
        
        // QUIT
        fputs($smtp, "QUIT\r\n");
        fclose($smtp);
        
        if (strpos($data_response, '250') !== false) {
            log_message("Email enviado com sucesso: $subject", 'INFO');
            return true;
        }
        
        log_message("ERRO ao enviar email: resposta inesperada", 'ERROR');
        return false;
        
    } catch (Exception $e) {
        log_message("ERRO no envio de email: " . $e->getMessage(), 'ERROR');
        return false;
    }
}

/**
 * Envia email via SMTP com STARTTLS (porta 587)
 */
function send_email_tls($subject, $body) {
    try {
        $smtp = @fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, 30);
        
        if (!$smtp) {
            log_message("ERRO SMTP TLS: Não conectou - $errstr ($errno)", 'ERROR');
            return false;
        }
        
        fgets($smtp);
        
        // EHLO
        fputs($smtp, "EHLO " . SMTP_HOST . "\r\n");
        while ($str = fgets($smtp, 515)) {
            if (substr($str, 3, 1) === ' ') break;
        }
        
        // STARTTLS
        fputs($smtp, "STARTTLS\r\n");
        fgets($smtp);
        
        stream_socket_enable_crypto($smtp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        
        // EHLO novamente após TLS
        fputs($smtp, "EHLO " . SMTP_HOST . "\r\n");
        while ($str = fgets($smtp, 515)) {
            if (substr($str, 3, 1) === ' ') break;
        }
        
        // AUTH LOGIN
        fputs($smtp, "AUTH LOGIN\r\n");
        fgets($smtp);
        
        fputs($smtp, base64_encode(SMTP_EMAIL) . "\r\n");
        fgets($smtp);
        
        fputs($smtp, base64_encode(SMTP_PASSWORD) . "\r\n");
        $auth_response = fgets($smtp);
        
        if (strpos($auth_response, '235') === false) {
            log_message("ERRO SMTP TLS: Falha na autenticação", 'ERROR');
            fclose($smtp);
            return false;
        }
        
        // MAIL FROM
        fputs($smtp, "MAIL FROM: <" . SMTP_EMAIL . ">\r\n");
        fgets($smtp);
        
        // RCPT TO
        fputs($smtp, "RCPT TO: <" . SMTP_RECIPIENT . ">\r\n");
        fgets($smtp);
        
        // DATA
        fputs($smtp, "DATA\r\n");
        fgets($smtp);
        
        // Construir email
        $headers = "From: " . SMTP_FROM_NAME . " <" . SMTP_EMAIL . ">\r\n";
        $headers .= "To: <" . SMTP_RECIPIENT . ">\r\n";
        $headers .= "Subject: " . encode_mime_header($subject) . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Content-Transfer-Encoding: 8bit\r\n";
        $headers .= "\r\n";
        
        fputs($smtp, $headers);
        fputs($smtp, $body . "\r\n");
        fputs($smtp, ".\r\n");
        
        $data_response = fgets($smtp);
        
        // QUIT
        fputs($smtp, "QUIT\r\n");
        fclose($smtp);
        
        if (strpos($data_response, '250') !== false) {
            log_message("Email enviado com sucesso via TLS: $subject", 'INFO');
            return true;
        }
        
        return false;
        
    } catch (Exception $e) {
        log_message("ERRO SMTP TLS: " . $e->getMessage(), 'ERROR');
        return false;
    }
}

/**
 * Codifica header do email (subject) com UTF-8
 */
function encode_mime_header($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

// ==================== FORMATAÇÃO DE EMAILS HTML ==================== //

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
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Mensagem de Contato</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background-color: #05070D; 
            color: #ffffff; 
            margin: 0; 
            padding: 20px; 
            line-height: 1.6;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #0B0F1A; 
            border: 2px solid #00E5FF; 
            border-radius: 12px; 
            padding: 30px;
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
        }
        .header { 
            text-align: center; 
            border-bottom: 2px solid #00E5FF; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .header h1 { 
            color: #00E5FF; 
            margin: 0; 
            font-size: 24px;
            text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }
        .header p {
            color: #B0B3B8; 
            margin: 10px 0 0 0;
            font-size: 14px;
        }
        .field { 
            margin-bottom: 20px; 
            padding: 15px; 
            background: #05070D; 
            border-left: 4px solid #00E5FF; 
            border-radius: 6px; 
        }
        .label { 
            color: #00E5FF; 
            font-weight: bold; 
            margin-bottom: 8px; 
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .value { 
            color: #E4E6EB; 
            font-size: 15px;
            word-wrap: break-word;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #00E5FF; 
            color: #B0B3B8; 
            font-size: 12px; 
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💬 Nova Mensagem de Contato</h1>
            <p>Terminal_404 - Tecnologia & Desenvolvimento</p>
        </div>
        
        <div class="field">
            <div class="label">👤 Nome</div>
            <div class="value">$name_safe</div>
        </div>
        
        <div class="field">
            <div class="label">📧 Email</div>
            <div class="value">$email_safe</div>
        </div>
        
        <div class="field">
            <div class="label">💭 Mensagem</div>
            <div class="value">$message_safe</div>
        </div>
        
        <div class="footer">
            <p><strong>Recebido em:</strong> $timestamp</p>
            <p>Terminal_404 © 2026 - Todos os direitos reservados</p>
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
    
    // Sanitizar todos os dados
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
    
    // Formatar tech stack em badges
    $tech_badges = '';
    if (!empty($safe['tech_stack']) && is_array($safe['tech_stack'])) {
        foreach ($safe['tech_stack'] as $tech) {
            $tech_badges .= '<span class="tech-badge">' . $tech . '</span> ';
        }
    }
    if (empty($tech_badges)) {
        $tech_badges = '<span style="color: #B0B3B8;">Não especificado</span>';
    }
    
    // Campos opcionais
    $company_html = !empty($safe['company']) ? 
        '<div class="field"><div class="label">🏢 Empresa</div><div class="value">' . $safe['company'] . '</div></div>' : '';
    
    $deadline_html = !empty($safe['deadline']) ? 
        '<div class="field"><div class="label">⏰ Prazo</div><div class="value">' . $safe['deadline'] . '</div></div>' : '';
    
    $budget_html = !empty($safe['budget']) ? 
        '<div class="field"><div class="label">💰 Orçamento</div><div class="value">' . $safe['budget'] . '</div></div>' : '';
    
    $additional_html = !empty($safe['additional_info']) ? 
        '<div class="field"><div class="label">📝 Informações Adicionais</div><div class="value">' . nl2br($safe['additional_info']) . '</div></div>' : '';
    
    $has_design_text = !empty($safe['has_design']) ? '✅ Sim' : '❌ Não';
    $needs_hosting_text = !empty($safe['needs_hosting']) ? '✅ Sim' : '❌ Não';
    
    return <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Solicitação de Projeto</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background-color: #05070D; 
            color: #ffffff; 
            margin: 0; 
            padding: 20px; 
            line-height: 1.6;
        }
        .container { 
            max-width: 750px; 
            margin: 0 auto; 
            background: #0B0F1A; 
            border: 2px solid #00E5FF; 
            border-radius: 12px; 
            padding: 30px;
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
        }
        .header { 
            text-align: center; 
            border-bottom: 2px solid #00E5FF; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .header h1 { 
            color: #00E5FF; 
            margin: 0; 
            font-size: 26px;
            text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }
        .header p {
            color: #B0B3B8; 
            margin: 10px 0 0 0;
            font-size: 14px;
        }
        .section { 
            margin-bottom: 30px; 
        }
        .section-title { 
            color: #00E5FF; 
            font-size: 18px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            padding-bottom: 10px; 
            border-bottom: 1px solid #00E5FF;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .field { 
            margin-bottom: 15px; 
            padding: 15px; 
            background: #05070D; 
            border-left: 4px solid #00E5FF; 
            border-radius: 6px; 
        }
        .label { 
            color: #00E5FF; 
            font-weight: bold; 
            margin-bottom: 8px; 
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .value { 
            color: #E4E6EB; 
            font-size: 15px;
            word-wrap: break-word;
        }
        .tech-badge { 
            display: inline-block;
            background: linear-gradient(135deg, #00E5FF 0%, #00B8D4 100%);
            color: #0B0F1A; 
            padding: 6px 16px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: bold; 
            margin: 4px;
            box-shadow: 0 2px 5px rgba(0, 229, 255, 0.3);
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #00E5FF; 
            color: #B0B3B8; 
            font-size: 12px; 
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Nova Solicitação de Projeto</h1>
            <p>Terminal_404 - Tecnologia & Desenvolvimento</p>
        </div>
        
        <div class="section">
            <div class="section-title">👤 Dados do Cliente</div>
            <div class="field">
                <div class="label">Nome Completo</div>
                <div class="value">{$safe['name']}</div>
            </div>
            <div class="field">
                <div class="label">Email de Contato</div>
                <div class="value">{$safe['email']}</div>
            </div>
            <div class="field">
                <div class="label">📱 Telefone</div>
                <div class="value">{$safe['phone']}</div>
            </div>
            $company_html
        </div>
        
        <div class="section">
            <div class="section-title">📋 Informações do Projeto</div>
            <div class="field">
                <div class="label">Tipo de Projeto</div>
                <div class="value">{$safe['project_type']}</div>
            </div>
            <div class="field">
                <div class="label">Título do Projeto</div>
                <div class="value">{$safe['project_title']}</div>
            </div>
            <div class="field">
                <div class="label">Descrição Completa</div>
                <div class="value">{$safe['project_description']}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">⚙️ Especificações Técnicas</div>
            <div class="field">
                <div class="label">💻 Tecnologias Solicitadas</div>
                <div style="margin-top: 10px;">$tech_badges</div>
            </div>
            $deadline_html
            $budget_html
        </div>
        
        <div class="section">
            <div class="section-title">📦 Requisitos Adicionais</div>
            <div class="field">
                <div class="label">Possui Design Pronto?</div>
                <div class="value">$has_design_text</div>
            </div>
            <div class="field">
                <div class="label">Precisa de Hospedagem?</div>
                <div class="value">$needs_hosting_text</div>
            </div>
            $additional_html
        </div>
        
        <div class="footer">
            <p><strong>Recebido em:</strong> $timestamp</p>
            <p>Terminal_404 © 2026 - Todos os direitos reservados</p>
        </div>
    </div>
</body>
</html>
HTML;
}

// ==================== FUNÇÕES DE LOG ==================== //

/**
 * Registra mensagem no log
 * 
 * @param string $message Mensagem para logar
 * @param string $level Nível (INFO, WARNING, ERROR)
 */
function log_message($message, $level = 'INFO') {
    $timestamp = date('Y-m-d H:i:s');
    $ip = get_client_ip();
    $log_entry = "[$timestamp] [$level] [$ip] $message\n";
    
    // Rotação de log se muito grande
    if (file_exists(LOG_FILE) && filesize(LOG_FILE) > LOG_MAX_SIZE) {
        $backup_file = LOG_FILE . '.' . date('Y-m-d-His') . '.bak';
        @rename(LOG_FILE, $backup_file);
    }
    
    @file_put_contents(LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
}
