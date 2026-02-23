#!/bin/bash

# Script de Diagnóstico Terminal_404
# Detecta automaticamente problemas no servidor

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🔍 DIAGNÓSTICO TERMINAL_404                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções
print_ok() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. VERIFICAR SISTEMA
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. SISTEMA OPERACIONAL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_info "$(lsb_release -d | cut -f2)"
print_info "Kernel: $(uname -r)"
echo ""

# 2. VERIFICAR NODE.JS
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. NODE.JS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_ok "Node.js instalado: $NODE_VERSION"
else
    print_error "Node.js NÃO está instalado!"
fi
echo ""

# 3. VERIFICAR PHP
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. PHP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v php &> /dev/null; then
    PHP_VERSION=$(php -v | head -n 1)
    print_ok "PHP instalado: $PHP_VERSION"
    
    # Verificar extensões
    EXTENSIONS=("mbstring" "json" "curl" "xml")
    for ext in "${EXTENSIONS[@]}"; do
        if php -m | grep -q "^$ext$"; then
            print_ok "Extensão $ext: OK"
        else
            print_error "Extensão $ext: FALTANDO"
        fi
    done
else
    print_error "PHP NÃO está instalado!"
fi
echo ""

# 4. VERIFICAR PHP-FPM
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. PHP-FPM"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Detectar versão automaticamente
if [ -d "/run/php" ]; then
    FPM_SOCK=$(ls /run/php/php*-fpm.sock 2>/dev/null | head -n 1)
    if [ -n "$FPM_SOCK" ]; then
        FPM_VERSION=$(basename $FPM_SOCK | sed 's/php\(.*\)-fpm.sock/\1/')
        print_ok "PHP-FPM encontrado: versão $FPM_VERSION"
        print_info "Socket: $FPM_SOCK"
        
        # Verificar se está rodando
        if systemctl is-active --quiet php${FPM_VERSION}-fpm; then
            print_ok "PHP-FPM está RODANDO"
        else
            print_error "PHP-FPM está PARADO!"
            print_warning "Execute: systemctl start php${FPM_VERSION}-fpm"
        fi
    else
        print_error "Socket do PHP-FPM não encontrado!"
    fi
else
    print_error "Pasta /run/php não existe!"
fi
echo ""

# 5. VERIFICAR NGINX
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. NGINX"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    print_ok "Nginx instalado: $NGINX_VERSION"
    
    # Verificar se está rodando
    if systemctl is-active --quiet nginx; then
        print_ok "Nginx está RODANDO"
    else
        print_error "Nginx está PARADO!"
        print_warning "Execute: systemctl start nginx"
    fi
    
    # Testar configuração
    if nginx -t &> /dev/null; then
        print_ok "Configuração do Nginx: OK"
    else
        print_error "Configuração do Nginx: ERRO!"
        echo "Detalhes:"
        nginx -t
    fi
else
    print_error "Nginx NÃO está instalado!"
fi
echo ""

# 6. VERIFICAR APACHE (conflito)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. APACHE (Verificar Conflito)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v apache2 &> /dev/null; then
    if systemctl is-active --quiet apache2; then
        print_error "Apache2 está RODANDO e pode estar conflitando!"
        print_warning "Execute: systemctl stop apache2 && systemctl disable apache2"
    else
        print_warning "Apache2 instalado mas PARADO (OK)"
    fi
else
    print_ok "Apache2 não está instalado (bom!)"
fi
echo ""

# 7. VERIFICAR PORTAS
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7. PORTAS (80 e 443)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Porta 80
PORT80=$(lsof -i :80 -sTCP:LISTEN -t 2>/dev/null)
if [ -n "$PORT80" ]; then
    PROCESS80=$(ps -p $PORT80 -o comm= 2>/dev/null)
    print_ok "Porta 80: $PROCESS80"
else
    print_error "Porta 80: NADA RODANDO!"
fi

# Porta 443
PORT443=$(lsof -i :443 -sTCP:LISTEN -t 2>/dev/null)
if [ -n "$PORT443" ]; then
    PROCESS443=$(ps -p $PORT443 -o comm= 2>/dev/null)
    print_ok "Porta 443: $PROCESS443"
else
    print_warning "Porta 443: Nada rodando (SSL não configurado)"
fi
echo ""

# 8. VERIFICAR PROJETO
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8. ARQUIVOS DO PROJETO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Frontend
if [ -d "/var/www/terminal404/dist" ]; then
    print_ok "Frontend buildado: /var/www/terminal404/dist"
    FILE_COUNT=$(find /var/www/terminal404/dist -type f | wc -l)
    print_info "$FILE_COUNT arquivos no dist"
else
    print_error "Frontend NÃO buildado! Execute: npm run build"
fi

# Backend
if [ -f "/var/www/terminal404/backend/index.php" ]; then
    print_ok "Backend existe: /var/www/terminal404/backend"
    
    # Verificar permissões
    BACKEND_OWNER=$(stat -c '%U' /var/www/terminal404/backend)
    if [ "$BACKEND_OWNER" = "www-data" ]; then
        print_ok "Permissões do backend: OK (www-data)"
    else
        print_warning "Permissões do backend: $BACKEND_OWNER (deveria ser www-data)"
        print_info "Execute: chown -R www-data:www-data /var/www/terminal404/backend"
    fi
    
    # Verificar logs
    if [ -d "/var/www/terminal404/backend/logs" ]; then
        print_ok "Pasta de logs existe"
        if [ -w "/var/www/terminal404/backend/logs" ]; then
            print_ok "Logs são graváveis"
        else
            print_error "Logs NÃO são graváveis!"
            print_info "Execute: chmod 777 /var/www/terminal404/backend/logs"
        fi
    else
        print_error "Pasta de logs não existe!"
        print_info "Execute: mkdir -p /var/www/terminal404/backend/logs"
    fi
else
    print_error "Backend NÃO existe!"
fi
echo ""

# 9. TESTAR CONEXÕES
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "9. TESTES DE CONEXÃO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Testar localhost
if curl -s http://localhost > /dev/null; then
    print_ok "http://localhost responde"
else
    print_error "http://localhost NÃO responde!"
fi

# Testar API
API_RESPONSE=$(curl -s http://localhost/api/health)
if echo "$API_RESPONSE" | grep -q "status"; then
    print_ok "API /api/health responde"
    print_info "Resposta: $API_RESPONSE"
else
    print_error "API /api/health NÃO responde!"
    if [ -n "$API_RESPONSE" ]; then
        print_info "Resposta recebida: $API_RESPONSE"
    fi
fi
echo ""

# 10. CONFIGURAÇÃO NGINX
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "10. CONFIGURAÇÃO DO NGINX"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "/etc/nginx/sites-enabled/terminal404" ]; then
    print_ok "Configuração ativada: /etc/nginx/sites-enabled/terminal404"
    
    # Verificar versão PHP na config
    PHP_IN_CONFIG=$(grep -oP 'php\K[0-9.]+(?=-fpm)' /etc/nginx/sites-enabled/terminal404 | head -n 1)
    if [ -n "$PHP_IN_CONFIG" ]; then
        print_info "PHP configurado no Nginx: $PHP_IN_CONFIG"
        
        # Verificar se bate com o instalado
        if [ -f "/run/php/php${PHP_IN_CONFIG}-fpm.sock" ]; then
            print_ok "Versão do PHP no Nginx BATE com instalada"
        else
            print_error "Versão do PHP no Nginx NÃO BATE!"
            print_warning "Config usa: php${PHP_IN_CONFIG}-fpm.sock"
            print_warning "Instalado: $(ls /run/php/php*-fpm.sock 2>/dev/null)"
        fi
    fi
else
    print_error "Configuração NÃO ativada!"
fi

# Verificar default
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    print_warning "Configuração padrão ainda ativa (pode causar conflito)"
    print_info "Execute: rm /etc/nginx/sites-enabled/default"
else
    print_ok "Configuração padrão removida (bom!)"
fi
echo ""

# 11. LOGS RECENTES
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "11. ÚLTIMOS ERROS DO NGINX"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "/var/log/nginx/terminal404.error.log" ]; then
    ERRORS=$(tail -5 /var/log/nginx/terminal404.error.log 2>/dev/null)
    if [ -n "$ERRORS" ]; then
        echo "$ERRORS"
    else
        print_ok "Nenhum erro recente"
    fi
else
    print_warning "Log de erros não existe ainda"
fi
echo ""

# 12. RESUMO FINAL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "12. RESUMO E RECOMENDAÇÕES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Contar problemas
PROBLEMS=0

# Verificar serviços essenciais
if ! systemctl is-active --quiet nginx; then
    ((PROBLEMS++))
    print_error "Nginx parado"
fi

if [ -n "$FPM_VERSION" ]; then
    if ! systemctl is-active --quiet php${FPM_VERSION}-fpm; then
        ((PROBLEMS++))
        print_error "PHP-FPM parado"
    fi
fi

if systemctl is-active --quiet apache2 2>/dev/null; then
    ((PROBLEMS++))
    print_error "Apache rodando (conflito)"
fi

if [ ! -d "/var/www/terminal404/dist" ]; then
    ((PROBLEMS++))
    print_error "Frontend não buildado"
fi

if [ $PROBLEMS -eq 0 ]; then
    echo ""
    print_ok "╔═══════════════════════════════════════════════════════════╗"
    print_ok "║  🎉 TUDO PARECE ESTAR FUNCIONANDO CORRETAMENTE!          ║"
    print_ok "╚═══════════════════════════════════════════════════════════╝"
    echo ""
    print_info "Acesse: http://$(curl -s ifconfig.me)"
else
    echo ""
    print_error "╔═══════════════════════════════════════════════════════════╗"
    print_error "║  ⚠️  FORAM ENCONTRADOS $PROBLEMS PROBLEMAS                         ║"
    print_error "╚═══════════════════════════════════════════════════════════╝"
    echo ""
    print_warning "Revise os erros acima e corrija-os"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Diagnóstico concluído em $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
