<?php
/**
 * Terminal_404 - Configurações do Backend
 * Sistema de API em PHP para processamento de formulários
 * 
 * @version 3.0.0
 * @author Terminal_404
 * @date 22/02/2026
 */

// ==================== CONFIGURAÇÕES DE EMAIL (SMTP GMAIL) ==================== //

define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_EMAIL', 'terminallocal404@gmail.com');
define('SMTP_PASSWORD', 'oxii jedf rkav ubgz');  // Senha de App do Gmail
define('SMTP_RECIPIENT', 'terminallocal404@gmail.com');
define('SMTP_FROM_NAME', 'Terminal_404');

// ==================== CONFIGURAÇÕES DE SEGURANÇA ==================== //

// Domínios permitidos para CORS
define('ALLOWED_ORIGINS', [
    'https://terminal404.com.br',
    'https://www.terminal404.com.br',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
]);

// Rate Limiting
define('RATE_LIMIT_FILE', __DIR__ . '/logs/rate_limits.json');
define('RATE_LIMIT_BLOCK_TIME', 60); // segundos

// Configurações de Rate Limit por endpoint
define('RATE_LIMIT_CONTACT', [
    'max_requests' => 5,
    'time_window' => 60  // 5 requisições por 60 segundos
]);

define('RATE_LIMIT_PROJECT', [
    'max_requests' => 3,
    'time_window' => 60  // 3 requisições por 60 segundos
]);

// ==================== CONFIGURAÇÕES DE LOG ==================== //

define('LOG_FILE', __DIR__ . '/logs/api.log');
define('ERROR_LOG_FILE', __DIR__ . '/logs/php_errors.log');
define('LOG_MAX_SIZE', 10 * 1024 * 1024); // 10MB

// ==================== CONFIGURAÇÕES GERAIS ==================== //

// Timezone
define('TIMEZONE', 'America/Sao_Paulo');

// Modo debug (DESABILITAR EM PRODUÇÃO)
define('DEBUG_MODE', false);

// ==================== INICIALIZAÇÃO ==================== //

// Criar diretório de logs se não existir
$logs_dir = __DIR__ . '/logs';
if (!is_dir($logs_dir)) {
    @mkdir($logs_dir, 0755, true);
}

// Criar arquivos de log se não existirem
$log_files = [LOG_FILE, ERROR_LOG_FILE, RATE_LIMIT_FILE];
foreach ($log_files as $file) {
    if (!file_exists($file)) {
        if ($file === RATE_LIMIT_FILE) {
            @file_put_contents($file, json_encode([]));
        } else {
            @touch($file);
        }
        @chmod($file, 0644);
    }
}

// Configurar timezone
date_default_timezone_set(TIMEZONE);

// Configurar error reporting
if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
}

// Configurar log de erros
ini_set('log_errors', 1);
ini_set('error_log', ERROR_LOG_FILE);
