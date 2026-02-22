<?php
/**
 * Terminal_404 - Configurações
 * 
 * ⚠️ IMPORTANTE: NÃO COMMITAR ESTE ARQUIVO COM SENHAS REAIS
 * Em produção, use variáveis de ambiente ou arquivo .env separado
 */

// ==================== CONFIGURAÇÕES DE EMAIL ==================== //

define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_EMAIL', 'terminallocal404@gmail.com');
define('SMTP_PASSWORD', '1234567');  // ⚠️ SUBSTITUIR PELA SENHA DE APP DO GMAIL
define('SMTP_RECIPIENT', 'terminallocal404@gmail.com');
define('SMTP_FROM_NAME', 'Terminal_404');

// ==================== CONFIGURAÇÕES DE SEGURANÇA ==================== //

// Rate Limiting (armazenado em arquivo temporário)
define('RATE_LIMIT_FILE', __DIR__ . '/logs/rate_limits.json');

// Tempo de bloqueio após exceder rate limit (segundos)
define('RATE_LIMIT_BLOCK_TIME', 60);

// ==================== CONFIGURAÇÕES DE LOG ==================== //

define('LOG_FILE', __DIR__ . '/logs/api.log');
define('LOG_MAX_SIZE', 10 * 1024 * 1024); // 10MB

// ==================== CRIAR DIRETÓRIOS NECESSÁRIOS ==================== //

$logs_dir = __DIR__ . '/logs';
if (!is_dir($logs_dir)) {
    mkdir($logs_dir, 0755, true);
}

// Criar arquivos vazios se não existirem
if (!file_exists(LOG_FILE)) {
    touch(LOG_FILE);
    chmod(LOG_FILE, 0644);
}

if (!file_exists(RATE_LIMIT_FILE)) {
    file_put_contents(RATE_LIMIT_FILE, json_encode([]));
    chmod(RATE_LIMIT_FILE, 0644);
}
