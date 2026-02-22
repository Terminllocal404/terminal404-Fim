<?php
/**
 * Terminal_404 - Backend API
 * Sistema RESTful em PHP para processamento de formulários
 * 
 * @version 3.0.0
 * @author Terminal_404
 * @date 22/02/2026
 */

// Carregar configurações e funções
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

// ==================== HEADERS DE SEGURANÇA ==================== //

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Powered-By: Terminal_404');

// ==================== CORS (Cross-Origin Resource Sharing) ==================== //

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // 24 horas
}

// Responder OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ==================== ROTEAMENTO ==================== //

$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remover query string
$uri = parse_url($request_uri, PHP_URL_PATH);

// Normalizar URI (remover /backend/ se existir)
$uri = str_replace('/backend', '', $uri);
$uri = rtrim($uri, '/');

// Log da requisição
log_message("$request_method $uri", 'INFO');

// Roteamento
switch ($uri) {
    case '':
    case '/':
    case '/api':
        handle_root();
        break;
        
    case '/api/health':
        handle_health_check();
        break;
        
    case '/api/contact':
        if ($request_method === 'POST') {
            handle_contact_form();
        } else {
            send_json_error('Método não permitido. Use POST.', 405);
        }
        break;
        
    case '/api/project-request':
        if ($request_method === 'POST') {
            handle_project_request();
        } else {
            send_json_error('Método não permitido. Use POST.', 405);
        }
        break;
        
    default:
        send_json_error('Endpoint não encontrado: ' . $uri, 404);
        break;
}

// ==================== HANDLERS DAS ROTAS ==================== //

/**
 * Rota raiz da API - Informações sobre a API
 */
function handle_root() {
    send_json_response([
        'message' => 'Terminal_404 Backend API',
        'version' => '3.0.0',
        'status' => 'online',
        'technology' => 'PHP ' . phpversion(),
        'endpoints' => [
            'health' => [
                'path' => '/api/health',
                'method' => 'GET',
                'description' => 'Verifica status da API'
            ],
            'contact' => [
                'path' => '/api/contact',
                'method' => 'POST',
                'description' => 'Formulário de contato',
                'rate_limit' => '5 requisições por minuto'
            ],
            'project_request' => [
                'path' => '/api/project-request',
                'method' => 'POST',
                'description' => 'Solicitação de projeto',
                'rate_limit' => '3 requisições por minuto'
            ]
        ],
        'security' => [
            'rate_limiting' => 'enabled',
            'input_sanitization' => 'enabled',
            'cors' => 'enabled'
        ]
    ]);
}

/**
 * Health Check - Verifica se a API está funcionando
 */
function handle_health_check() {
    $uptime = '';
    if (function_exists('sys_getloadavg')) {
        $load = sys_getloadavg();
        $uptime = sprintf('Load: %.2f, %.2f, %.2f', $load[0], $load[1], $load[2]);
    }
    
    send_json_response([
        'status' => 'online',
        'message' => 'Terminal_404 API Running',
        'timestamp' => date('c'),
        'server' => [
            'php_version' => phpversion(),
            'os' => PHP_OS,
            'timezone' => TIMEZONE,
            'uptime' => $uptime
        ]
    ]);
}

/**
 * Processa formulário de contato simples
 * 
 * POST /api/contact
 * Body: { "name": "...", "email": "...", "message": "..." }
 */
function handle_contact_form() {
    // Rate limiting: 5 requisições por minuto
    if (!check_rate_limit('contact', RATE_LIMIT_CONTACT['max_requests'], RATE_LIMIT_CONTACT['time_window'])) {
        send_json_error('Muitas requisições. Aguarde 1 minuto e tente novamente.', 429);
        return;
    }
    
    // Ler dados JSON
    $data = get_json_input();
    
    if (!$data) {
        send_json_error('Dados inválidos ou JSON malformado', 400);
        return;
    }
    
    // Validar campos obrigatórios
    $required_fields = ['name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            send_json_error("Campo obrigatório ausente: $field", 400);
            return;
        }
    }
    
    // Sanitizar e validar dados
    $name = sanitize_input($data['name']);
    $email = validate_email($data['email']);
    $message = sanitize_input($data['message']);
    
    // Validar nome
    if (!validate_name($name, 2, 100)) {
        send_json_error('Nome inválido. Deve ter entre 2 e 100 caracteres e conter apenas letras.', 400);
        return;
    }
    
    // Validar email
    if (!$email) {
        send_json_error('Email inválido.', 400);
        return;
    }
    
    // Validar mensagem
    $message_length = mb_strlen($message, 'UTF-8');
    if ($message_length < 10 || $message_length > 2000) {
        send_json_error('Mensagem deve ter entre 10 e 2000 caracteres.', 400);
        return;
    }
    
    // Log da tentativa
    log_message("Nova mensagem de contato de: $email (Nome: $name)", 'INFO');
    
    // Formatar e enviar email
    $subject = "[CONTATO] Mensagem de $name";
    $body = format_contact_email($name, $email, $message);
    
    if (send_email($subject, $body)) {
        log_message("Email de contato enviado com sucesso para: $email", 'INFO');
        send_json_response([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso! Responderemos em breve.'
        ]);
    } else {
        log_message("ERRO ao enviar email de contato para: $email", 'ERROR');
        send_json_error('Erro ao enviar mensagem. Tente novamente mais tarde.', 500);
    }
}

/**
 * Processa solicitação de projeto completa
 * 
 * POST /api/project-request
 * Body: { ...dados do projeto... }
 */
function handle_project_request() {
    // Rate limiting: 3 requisições por minuto (mais restritivo)
    if (!check_rate_limit('project', RATE_LIMIT_PROJECT['max_requests'], RATE_LIMIT_PROJECT['time_window'])) {
        send_json_error('Muitas requisições. Aguarde 1 minuto e tente novamente.', 429);
        return;
    }
    
    // Ler dados JSON
    $data = get_json_input();
    
    if (!$data) {
        send_json_error('Dados inválidos ou JSON malformado', 400);
        return;
    }
    
    // Validar campos obrigatórios
    $required_fields = [
        'name', 
        'email', 
        'phone', 
        'project_type', 
        'project_title', 
        'project_description'
    ];
    
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            send_json_error("Campo obrigatório ausente: $field", 400);
            return;
        }
    }
    
    // Sanitizar e validar dados obrigatórios
    $name = sanitize_input($data['name']);
    $email = validate_email($data['email']);
    $phone = sanitize_input($data['phone']);
    $project_type = sanitize_input($data['project_type']);
    $project_title = sanitize_input($data['project_title']);
    $project_description = sanitize_input($data['project_description']);
    
    // Validar nome
    if (!validate_name($name, 2, 100)) {
        send_json_error('Nome inválido. Deve ter entre 2 e 100 caracteres e conter apenas letras.', 400);
        return;
    }
    
    // Validar email
    if (!$email) {
        send_json_error('Email inválido.', 400);
        return;
    }
    
    // Validar telefone
    if (!validate_phone($phone)) {
        send_json_error('Telefone inválido. Deve conter 10 ou 11 dígitos.', 400);
        return;
    }
    
    // Validar título do projeto
    $title_length = mb_strlen($project_title, 'UTF-8');
    if ($title_length < 5 || $title_length > 200) {
        send_json_error('Título do projeto deve ter entre 5 e 200 caracteres.', 400);
        return;
    }
    
    // Validar descrição do projeto
    $description_length = mb_strlen($project_description, 'UTF-8');
    if ($description_length < 20 || $description_length > 5000) {
        send_json_error('Descrição do projeto deve ter entre 20 e 5000 caracteres.', 400);
        return;
    }
    
    // Campos opcionais
    $company = isset($data['company']) ? sanitize_input($data['company']) : null;
    $tech_stack = isset($data['tech_stack']) && is_array($data['tech_stack']) 
        ? array_map('sanitize_input', $data['tech_stack']) 
        : [];
    $deadline = isset($data['deadline']) ? sanitize_input($data['deadline']) : null;
    $budget = isset($data['budget']) ? sanitize_input($data['budget']) : null;
    $has_design = isset($data['has_design']) ? (bool)$data['has_design'] : false;
    $needs_hosting = isset($data['needs_hosting']) ? (bool)$data['needs_hosting'] : false;
    $additional_info = isset($data['additional_info']) ? sanitize_input($data['additional_info']) : null;
    
    // Montar array com todos os dados
    $project_data = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'company' => $company,
        'project_type' => $project_type,
        'project_title' => $project_title,
        'project_description' => $project_description,
        'tech_stack' => $tech_stack,
        'deadline' => $deadline,
        'budget' => $budget,
        'has_design' => $has_design,
        'needs_hosting' => $needs_hosting,
        'additional_info' => $additional_info
    ];
    
    // Log da tentativa
    log_message("Nova solicitação de projeto de: $email - $project_title", 'INFO');
    
    // Formatar e enviar email
    $subject = "[PROJETO] $project_type - $project_title";
    $body = format_project_email($project_data);
    
    if (send_email($subject, $body)) {
        log_message("Email de projeto enviado com sucesso para: $email", 'INFO');
        send_json_response([
            'success' => true,
            'message' => 'Solicitação enviada com sucesso! Entraremos em contato em breve.'
        ]);
    } else {
        log_message("ERRO ao enviar email de projeto para: $email", 'ERROR');
        send_json_error('Erro ao enviar solicitação. Tente novamente mais tarde.', 500);
    }
}
