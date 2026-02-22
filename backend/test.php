<?php
/**
 * Terminal_404 - Script de Teste da API
 * Use este arquivo para testar o backend PHP localmente
 * 
 * @version 3.0.0
 */

echo "=== Terminal_404 - Teste do Backend PHP ===\n\n";

// Teste 1: Versão do PHP
echo "✅ PHP Version: " . phpversion() . "\n";

// Teste 2: Extensões necessárias
$required_extensions = ['mbstring', 'json', 'openssl'];
echo "\n📦 Extensões PHP:\n";
foreach ($required_extensions as $ext) {
    $loaded = extension_loaded($ext);
    echo ($loaded ? "✅" : "❌") . " $ext: " . ($loaded ? "OK" : "NÃO INSTALADA") . "\n";
}

// Teste 3: Permissões de escrita
echo "\n📁 Permissões:\n";
$logs_dir = __DIR__ . '/logs';
if (!is_dir($logs_dir)) {
    mkdir($logs_dir, 0755, true);
    echo "✅ Pasta logs/ criada\n";
} else {
    echo "✅ Pasta logs/ existe\n";
}

$is_writable = is_writable($logs_dir);
echo ($is_writable ? "✅" : "❌") . " logs/ " . ($is_writable ? "tem permissão de escrita" : "SEM permissão de escrita") . "\n";

// Teste 4: Teste de arquivo
$test_file = $logs_dir . '/test.txt';
$write_test = @file_put_contents($test_file, 'Terminal_404 Test');
if ($write_test !== false) {
    echo "✅ Consegue criar arquivos em logs/\n";
    @unlink($test_file);
} else {
    echo "❌ NÃO consegue criar arquivos em logs/\n";
}

// Teste 5: Função mail()
echo "\n📧 Configuração de Email:\n";
if (function_exists('mail')) {
    echo "✅ Função mail() disponível\n";
} else {
    echo "❌ Função mail() NÃO disponível\n";
}

if (function_exists('fsockopen')) {
    echo "✅ Função fsockopen() disponível (necessária para SMTP)\n";
} else {
    echo "❌ Função fsockopen() NÃO disponível\n";
}

// Teste 6: Carregar config
echo "\n⚙️ Configurações:\n";
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
    echo "✅ config.php carregado\n";
    echo "   SMTP Host: " . SMTP_HOST . "\n";
    echo "   SMTP Port: " . SMTP_PORT . "\n";
    echo "   SMTP Email: " . SMTP_EMAIL . "\n";
    echo "   SMTP Password: " . (SMTP_PASSWORD ? str_repeat('*', strlen(SMTP_PASSWORD)) : 'NÃO CONFIGURADA') . "\n";
} else {
    echo "❌ config.php NÃO encontrado\n";
}

// Teste 7: Carregar functions
echo "\n🔧 Funções:\n";
if (file_exists(__DIR__ . '/functions.php')) {
    require_once __DIR__ . '/functions.php';
    echo "✅ functions.php carregado\n";
    
    // Testar algumas funções
    if (function_exists('sanitize_input')) {
        $test = sanitize_input('<script>alert("xss")</script>');
        echo "✅ sanitize_input() funciona: " . $test . "\n";
    }
    
    if (function_exists('validate_email')) {
        $email_test = validate_email('teste@example.com');
        echo "✅ validate_email() funciona: " . ($email_test ? "OK" : "FALHOU") . "\n";
    }
} else {
    echo "❌ functions.php NÃO encontrado\n";
}

// Teste 8: Teste de conexão SMTP (sem enviar)
echo "\n🌐 Teste de Conectividade SMTP:\n";
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;

$smtp_socket = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 5);
if ($smtp_socket) {
    echo "✅ Consegue conectar ao $smtp_host:$smtp_port\n";
    fclose($smtp_socket);
} else {
    echo "❌ NÃO consegue conectar ao $smtp_host:$smtp_port\n";
    echo "   Erro: $errstr ($errno)\n";
    echo "   Possível firewall bloqueando porta 587\n";
}

// Teste 9: Teste SSL (porta 465)
$smtp_ssl = @fsockopen('ssl://' . $smtp_host, 465, $errno, $errstr, 5);
if ($smtp_ssl) {
    echo "✅ Consegue conectar via SSL ao $smtp_host:465\n";
    fclose($smtp_ssl);
} else {
    echo "⚠️  NÃO consegue conectar via SSL (opcional)\n";
}

// Resumo final
echo "\n" . str_repeat("=", 50) . "\n";
echo "📊 RESUMO DO TESTE\n";
echo str_repeat("=", 50) . "\n\n";

$all_ok = true;

if (version_compare(phpversion(), '7.4.0', '<')) {
    echo "❌ PHP versão muito antiga (necessário 7.4+)\n";
    $all_ok = false;
}

if (!extension_loaded('mbstring') || !extension_loaded('json') || !extension_loaded('openssl')) {
    echo "❌ Extensões PHP faltando\n";
    $all_ok = false;
}

if (!is_writable($logs_dir)) {
    echo "❌ Sem permissão de escrita em logs/\n";
    $all_ok = false;
}

if (!file_exists(__DIR__ . '/config.php')) {
    echo "❌ config.php não encontrado\n";
    $all_ok = false;
}

if ($all_ok) {
    echo "🎉 TUDO OK! Backend pronto para uso!\n\n";
    echo "Próximos passos:\n";
    echo "1. Verifique a senha SMTP em config.php\n";
    echo "2. Configure o Nginx (ver MANUAL_SERVIDOR_UBUNTU.md)\n";
    echo "3. Teste a API: curl http://localhost:8000/api/health\n";
} else {
    echo "⚠️  Alguns problemas detectados. Corrija antes de usar.\n";
}

echo "\n";
