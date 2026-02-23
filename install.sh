#!/bin/bash

# Script de Instalação Automática - Terminal_404
# Ubuntu 22.04/24.04 LTS
# Execute como root: bash install.sh

set -e  # Parar em caso de erro

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Banner
echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ║
║  ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗║
║     ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║║
║     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║║
║     ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║║
║     ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝║
║                     _404                                  ║
║                                                           ║
║            INSTALAÇÃO AUTOMÁTICA - UBUNTU                ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Verificar se é root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Execute como root: sudo bash install.sh${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Executando como root${NC}"
echo ""

# Perguntar domínio
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}CONFIGURAÇÃO INICIAL${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
read -p "Digite seu domínio (ou deixe em branco para usar apenas IP): " DOMAIN
echo ""
read -p "Deseja configurar SSL/HTTPS agora? (s/N): " SETUP_SSL
echo ""

# Configurações
PROJECT_DIR="/var/www/terminal404"
NGINX_CONF="/etc/nginx/sites-available/terminal404"
SERVER_NAME="${DOMAIN:-_}"

# 1. LIMPAR SISTEMA
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[1/10] Limpando sistema...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Parar serviços
systemctl stop apache2 2>/dev/null || true
systemctl stop nginx 2>/dev/null || true

# Remover Apache se existir
apt remove --purge -y apache2 apache2-* 2>/dev/null || true

# Limpar pastas
rm -rf /var/www/html
rm -rf /etc/nginx/sites-enabled/default

echo -e "${GREEN}✅ Sistema limpo${NC}\n"

# 2. ATUALIZAR SISTEMA
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[2/10] Atualizando sistema...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

apt update -qq
apt upgrade -y -qq

echo -e "${GREEN}✅ Sistema atualizado${NC}\n"

# 3. INSTALAR NODE.JS
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[3/10] Instalando Node.js 20...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null
apt install -y nodejs -qq

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js instalado: $NODE_VERSION${NC}\n"

# 4. INSTALAR PHP
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[4/10] Instalando PHP 8.1+...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

apt install -y php php-fpm php-cli php-mbstring php-json php-curl php-xml -qq

PHP_VERSION=$(php -v | head -n 1 | cut -d ' ' -f 2)
echo -e "${GREEN}✅ PHP instalado: $PHP_VERSION${NC}\n"

# 5. INSTALAR NGINX
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[5/10] Instalando Nginx...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

apt install -y nginx -qq

NGINX_VERSION=$(nginx -v 2>&1 | cut -d '/' -f 2)
echo -e "${GREEN}✅ Nginx instalado: $NGINX_VERSION${NC}\n"

# 6. INSTALAR EXTRAS
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[6/10] Instalando ferramentas extras...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

apt install -y git curl wget unzip certbot python3-certbot-nginx lsof -qq

echo -e "${GREEN}✅ Ferramentas instaladas${NC}\n"

# 7. CLONAR PROJETO
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[7/10] Baixando projeto...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Criar diretório
mkdir -p /var/www
cd /var/www

# Remover se já existir
rm -rf terminal404

# Clonar
git clone https://github.com/Terminllocal404/terminal404-Fim.git terminal404 > /dev/null 2>&1

echo -e "${GREEN}✅ Projeto baixado${NC}\n"

# 8. CONFIGURAR BACKEND
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[8/10] Configurando backend PHP...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

cd $PROJECT_DIR/backend

# Criar logs
mkdir -p logs

# Permissões
chown -R www-data:www-data $PROJECT_DIR/backend
chmod -R 755 $PROJECT_DIR/backend
chmod -R 777 $PROJECT_DIR/backend/logs

echo -e "${GREEN}✅ Backend configurado${NC}\n"

# 9. BUILD FRONTEND
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[9/10] Fazendo build do frontend...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

cd $PROJECT_DIR

npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1

echo -e "${GREEN}✅ Frontend buildado${NC}\n"

# 10. CONFIGURAR NGINX
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}[10/10] Configurando Nginx...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Detectar versão PHP-FPM
FPM_SOCK=$(ls /run/php/php*-fpm.sock | head -n 1)
FPM_VERSION=$(basename $FPM_SOCK | sed 's/php\(.*\)-fpm.sock/\1/')

echo -e "${BLUE}ℹ️  PHP-FPM detectado: versão $FPM_VERSION${NC}"

# Criar configuração
cat > $NGINX_CONF << ENDOFNGINX
server {
    listen 80;
    listen [::]:80;
    
    server_name $SERVER_NAME;
    
    root $PROJECT_DIR/dist;
    index index.html;
    
    access_log /var/log/nginx/terminal404.access.log;
    error_log /var/log/nginx/terminal404.error.log;
    
    # Frontend
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # API Backend
    location /api {
        alias $PROJECT_DIR/backend;
        try_files \$uri \$uri/ @php;
        
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php${FPM_VERSION}-fpm.sock;
            fastcgi_param SCRIPT_FILENAME \$request_filename;
        }
    }
    
    location @php {
        rewrite ^/api/(.*)$ /backend/index.php?\$1 last;
    }
    
    # Bloquear backend
    location /backend {
        deny all;
    }
    
    # Security
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
}
ENDOFNGINX

# Ativar site
ln -sf $NGINX_CONF /etc/nginx/sites-enabled/terminal404

# Remover default
rm -f /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

echo -e "${GREEN}✅ Nginx configurado${NC}\n"

# INICIAR SERVIÇOS
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Iniciando serviços...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

systemctl start php${FPM_VERSION}-fpm
systemctl enable php${FPM_VERSION}-fpm > /dev/null 2>&1

systemctl start nginx
systemctl enable nginx > /dev/null 2>&1

echo -e "${GREEN}✅ Serviços iniciados${NC}\n"

# CONFIGURAR SSL (se solicitado)
if [[ "$SETUP_SSL" =~ ^[Ss]$ ]] && [ -n "$DOMAIN" ]; then
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}Configurando SSL...${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email terminallocal404@gmail.com --redirect
    
    echo -e "${GREEN}✅ SSL configurado${NC}\n"
fi

# CONFIGURAR FIREWALL
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Configurando firewall...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

apt install -y ufw -qq
ufw --force disable
ufw --force reset > /dev/null 2>&1
ufw allow OpenSSH > /dev/null 2>&1
ufw allow 'Nginx Full' > /dev/null 2>&1
ufw --force enable > /dev/null 2>&1

echo -e "${GREEN}✅ Firewall configurado${NC}\n"

# TESTAR
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Executando testes...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Testar site
if curl -s http://localhost > /dev/null; then
    echo -e "${GREEN}✅ Site responde${NC}"
else
    echo -e "${RED}❌ Site não responde${NC}"
fi

# Testar API
API_RESPONSE=$(curl -s http://localhost/api/health)
if echo "$API_RESPONSE" | grep -q "status"; then
    echo -e "${GREEN}✅ API responde${NC}"
else
    echo -e "${RED}❌ API não responde${NC}"
fi

# Pegar IP
PUBLIC_IP=$(curl -s ifconfig.me)

# RESULTADO FINAL
echo ""
echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              🎉  INSTALAÇÃO CONCLUÍDA!  🎉                ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ INFORMAÇÕES DO SERVIDOR${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -n "$DOMAIN" ]; then
    if [[ "$SETUP_SSL" =~ ^[Ss]$ ]]; then
        echo -e "${GREEN}🌐 Site:${NC} https://$DOMAIN"
        echo -e "${GREEN}🔌 API:${NC} https://$DOMAIN/api/health"
    else
        echo -e "${GREEN}🌐 Site:${NC} http://$DOMAIN"
        echo -e "${GREEN}🔌 API:${NC} http://$DOMAIN/api/health"
        echo -e "${YELLOW}⚠️  Configure SSL depois com: certbot --nginx -d $DOMAIN${NC}"
    fi
else
    echo -e "${GREEN}🌐 Site:${NC} http://$PUBLIC_IP"
    echo -e "${GREEN}🔌 API:${NC} http://$PUBLIC_IP/api/health"
fi

echo ""
echo -e "${GREEN}📂 Arquivos:${NC} /var/www/terminal404"
echo -e "${GREEN}📝 Logs Nginx:${NC} /var/log/nginx/terminal404.error.log"
echo -e "${GREEN}📝 Logs API:${NC} /var/www/terminal404/backend/logs/api.log"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ COMANDOS ÚTEIS${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}🔍 Diagnóstico:${NC}"
echo -e "   bash /var/www/terminal404/backend/diagnostico.sh"
echo ""
echo -e "${YELLOW}🔄 Reiniciar serviços:${NC}"
echo -e "   systemctl restart php${FPM_VERSION}-fpm nginx"
echo ""
echo -e "${YELLOW}📊 Ver logs:${NC}"
echo -e "   tail -f /var/log/nginx/terminal404.error.log"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}Desenvolvido por Terminal_404 | $(date '+%d/%m/%Y %H:%M:%S')${NC}"
echo ""
