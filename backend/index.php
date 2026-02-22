<?php
/**
 * Terminal_404 - Backend API
 * Sistema de processamento de formulários e envio de emails
 * Desenvolvido em PHP com segurança empresarial
 * 
 * @version 2.0.0
 * @author Terminal_404
 */

// ==================== CONFIGURAÇÕES GERAIS ==================== //

// Configuração de erros (desabilitar em produção)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/php_errors.log');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Headers de segurança
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// CORS - Permitir requisições do frontend
$allowed_origins = [
    'https://terminal404.com.br',
    'https://www.terminal404.com.br',
    'http://localhost:5173',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');
    header('Access-Control-Allow-Credentials: true');
}

// Responder OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Carregar configurações
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

// ==================== ROTEAMENTO ==================== //

$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remover query string
$uri = parse_url($request_uri, PHP_URL_PATH);

// Remover /backend/ do caminho se existir
$uri = str_replace('/backend', '', $uri);

// Roteamento
switch ($uri) {
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
            send_json_error('Método não permitido', 405);
        }
        break;
        
    case '/api/project-request':
        if ($request_method === 'POST') {
            handle_project_request();
        } else {
            send_json_error('Método não permitido', 405);
        }
        break;
        
    default:
        send_json_error('Endpoint não encontrado', 404);
        break;
}

// ==================== HANDLERS DAS ROTAS ==================== //

/**
 * Rota raiz da API
 */
function handle_root() {
    send_json_response([
        'message' => 'Terminal_404 API',
        'version' => '2.0.0',
        'status' => 'online',
        'technology' => 'PHP',
        'endpoints' => [
            'health' => '/api/health',
            'contact' => '/api/contact',
            'project_request' => '/api/project-request'
        ]
    ]);
}

/**
 * Health check - Verifica se a API está funcionando
 */
function handle_health_check() {
    send_json_response([
        'status' => 'online',
        'message' => 'Terminal_404 API Running',
        'timestamp' => date('c'),
        'server' => 'PHP ' . phpversion()
    ]);
}

/**
 * Processa formulário de contato simples
 */
function handle_contact_form() {
    // Rate limiting
    if (!check_rate_limit('contact', 5, 60)) {
        send_json_error('Muitas requisições. Aguarde 1 minuto.', 429);
        return;
    }
    
    // Ler dados JSON
    $data = get_json_input();
    
    if (!$data) {
        send_json_error('Dados inválidos', 400);
        return;
    }
    
    // Validar campos obrigatórios
    $required_fields = ['name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            send_json_error("Campo obrigatório: $field", 400);
            return;
        }
    }
    
    // Validações
    $name = sanitize_input($data['name']);
    $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
    $message = sanitize_input($data['message']);
    
    // Validar nome
    if (strlen($name) < 2 || strlen($name) > 100) {
        send_json_error('Nome deve ter entre 2 e 100 caracteres', 400);
        return;
    }
    
    if (!preg_match('/^[a-zA-ZÀ-ÿ\s]+$/u', $name)) {
        send_json_error('Nome deve conter apenas letras', 400);
        return;
    }
    
    // Validar email
    if (!$email) {
        send_json_error('Email inválido', 400);
        return;
    }
    
    // Validar mensagem
    if (strlen($message) < 10 || strlen($message) > 2000) {
        send_json_error('Mensagem deve ter entre 10 e 2000 caracteres', 400);
        return;
    }
    
    // Log
    log_message("Nova mensagem de contato de: $email");
    
    // Formatar e enviar email
    $subject = "[CONTATO] Mensagem de $name";
    $body = format_contact_email($name, $email, $message);
    
    if (send_email($subject, $body)) {
        send_json_response([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso!'
        ]);
    } else {
        send_json_error('Erro ao enviar email', 500);
    }
}

/**
 * Processa solicitação de projeto completa
 */
function handle_project_request() {
    // Rate limiting (mais restritivo)
    if (!check_rate_limit('project', 3, 60)) {
        send_json_error('Muitas requisições. Aguarde 1 minuto.', 429);
        return;
    }
    
    // Ler dados JSON
    $data = get_json_input();
    
    if (!$data) {
        send_json_error('Dados inválidos', 400);
        return;
    }
    
    // Validar campos obrigatórios
    $required_fields = [
        'name', 'email', 'phone', 'project_type', 
        'project_title', 'project_description'
    ];
    
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            send_json_error("Campo obrigatório: $field", 400);
            return;
        }
    }
    
    // Sanitizar dados
    $project_data = [
        'name' => sanitize_input($data['name']),
        'email' => filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL),
        'phone' => sanitize_input($data['phone']),
        'company' => isset($data['company']) ? sanitize_input($data['company']) : null,
        'project_type' => sanitize_input($data['project_type']),
        'project_title' => sanitize_input($data['project_title']),
        'project_description' => sanitize_input($data['project_description']),
        'tech_stack' => isset($data['tech_stack']) ? $data['tech_stack'] : [],
        'deadline' => isset($data['deadline']) ? sanitize_input($data['deadline']) : null,
        'budget' => isset($data['budget']) ? sanitize_input($data['budget']) : null,
        'has_design' => isset($data['has_design']) ? (bool)$data['has_design'] : false,
        'needs_hosting' => isset($data['needs_hosting']) ? (bool)$data['needs_hosting'] : false,
        'additional_info' => isset($data['additional_info']) ? sanitize_input($data['additional_info']) : null
    ];
    
    // Validações
    if (!$project_data['email']) {
        send_json_error('Email inválido', 400);
        return;
    }
    
    if (strlen($project_data['name']) < 2 || strlen($project_data['name']) > 100) {
        send_json_error('Nome deve ter entre 2 e 100 caracteres', 400);
        return;
    }
    
    // Validar telefone
    $phone_clean = preg_replace('/\D/', '', $project_data['phone']);
    if (strlen($phone_clean) < 10 || strlen($phone_clean) > 11) {
        send_json_error('Telefone inválido', 400);
        return;
    }
    
    if (strlen($project_data['project_title']) < 5 || strlen($project_data['project_title']) > 200) {
        send_json_error('Título deve ter entre 5 e 200 caracteres', 400);
        return;
    }
    
    if (strlen($project_data['project_description']) < 20 || strlen($project_data['project_description']) > 5000) {
        send_json_error('Descrição deve ter entre 20 e 5000 caracteres', 400);
        return;
    }
    
    // Log
    log_message("Nova solicitação de projeto de: {$project_data['email']} - {$project_data['project_title']}");
    
    // Formatar e enviar email
    $subject = "[PROJETO] {$project_data['project_type']} - {$project_data['project_title']}";
    $body = format_project_email($project_data);
    
    if (send_email($subject, $body)) {
        send_json_response([
            'success' => true,
            'message' => 'Solicitação enviada com sucesso! Entraremos em contato em breve.'
        ]);
    } else {
        send_json_error('Erro ao enviar email', 500);
    }
}
