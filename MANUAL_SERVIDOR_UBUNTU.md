# 🚀 Manual Completo - Deploy Terminal_404
## Ubuntu 25.10 x64 | Frontend React + Backend PHP

**Versão:** 3.0 - Backend PHP  
**Data:** 22 de Fevereiro de 2026  
**Sistema:** Ubuntu 25.10 x64

---

## 📋 O Que Será Instalado

✅ **Frontend React** (Vite) → Servido pelo Nginx  
✅ **Backend PHP** → API RESTful com segurança empresarial  
✅ **Nginx** → Servidor web + proxy reverso  
✅ **PHP-FPM** → Processamento PHP otimizado  
✅ **SSL/HTTPS** → Certificado Let's Encrypt  
✅ **Firewall UFW** → Segurança básica

**⏱️ Tempo estimado:** 20-30 minutos

---

## 🎯 Informações Necessárias

Antes de começar, tenha em mãos:

- **IP do Servidor:** Ex: `165.227.123.45`
- **Domínio:** Ex: `terminal404.com.br`
- **Email:** `terminallocal404@gmail.com`
- **Senha de App Gmail:** `oxii jedf rkav ubgz`

---

## 📦 PARTE 1: Preparação do Servidor

### 1.1 - Conectar ao Servidor

```bash
# Conectar via SSH como root
ssh root@SEU_IP_SERVIDOR
```

### 1.2 - Atualizar Sistema

```bash
# Atualizar tudo
apt update && apt upgrade -y

# Instalar ferramentas básicas
apt install -y curl wget git build-essential software-properties-common unzip

# Reiniciar
reboot
```

⏱️ **Aguarde 1-2 minutos e reconecte:**

```bash
ssh root@SEU_IP_SERVIDOR
```

### 1.3 - Criar Usuário para a Aplicação

```bash
# Criar usuário
adduser terminal404
# Digite uma senha forte

# Adicionar ao sudo
usermod -aG sudo terminal404

# Testar
su - terminal404
sudo ls /root
# Digite a senha do usuário terminal404
```

✅ **Se listou os arquivos, está OK!**

```bash
# Voltar para root
exit
exit

# Conectar com o novo usuário
ssh terminal404@SEU_IP_SERVIDOR
```

**✅ A partir de agora, use SEMPRE o usuário `terminal404`**

---

## ⚙️ PARTE 2: Instalação das Dependências

### 2.1 - Instalar Node.js 20.x (Frontend)

```bash
# Adicionar repositório oficial
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar
node --version  # Deve ser v20.x.x
npm --version   # Deve ser 10.x.x
```

### 2.2 - Instalar PHP 8.1+ (Backend)

```bash
# Instalar PHP e extensões necessárias
sudo apt install -y php php-fpm php-cli php-mbstring php-json php-curl php-xml php-zip

# Verificar versão
php --version  # Deve ser 8.1 ou superior
```

### 2.3 - Instalar Nginx

```bash
# Instalar
sudo apt install -y nginx

# Iniciar
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar
sudo systemctl status nginx
# Pressione 'q' para sair
```

✅ **Teste:** Acesse `http://SEU_IP` no navegador → Deve aparecer "Welcome to nginx!"

### 2.4 - Instalar Certbot (SSL)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## 📂 PARTE 3: Enviar Projeto para o Servidor

### 3.1 - Criar Estrutura de Diretórios

```bash
# Criar diretório
sudo mkdir -p /var/www/terminal404

# Dar permissão
sudo chown -R terminal404:terminal404 /var/www/terminal404

# Navegar
cd /var/www/terminal404
```

### 3.2 - Clonar Projeto do GitHub

```bash
# Clonar repositório Terminal_404
git clone https://github.com/Terminllocal404/terminal404-Fim.git .

# Verificar estrutura
ls -la

# Deve aparecer:
# backend/
# src/
# package.json
# vite.config.ts
# index.html
# etc.
```

---

## 🔧 PARTE 4: Configurar Backend PHP

### 4.1 - Configurar Permissões

```bash
cd /var/www/terminal404/backend

# Criar pasta de logs
mkdir -p logs

# Dar permissões
sudo chown -R www-data:www-data /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend/logs
sudo chmod 644 /var/www/terminal404/backend/*.php
```

### 4.2 - Configurar Senha do Email

```bash
nano /var/www/terminal404/backend/config.php
```

**Encontre a linha 12 e substitua `1234567` pela sua senha de app do Gmail:**

```php
define('SMTP_PASSWORD', 'oxii jedf rkav ubgz');
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 4.3 - Testar Backend (Opcional)

```bash
# Testar servidor PHP local
cd /var/www/terminal404/backend
php -S localhost:8000

# Em outro terminal SSH, testar:
curl http://localhost:8000/api/health

# Deve retornar JSON com status "online"
# Parar servidor: Ctrl + C
```

---

## 🎨 PARTE 5: Configurar Frontend React

### 5.1 - Instalar Dependências

```bash
cd /var/www/terminal404
npm install
```

### 5.2 - Fazer Build de Produção

```bash
npm run build
```

**✅ Saída esperada:**
```
✓ built in 15s
```

**Verificar:**
```bash
ls -la dist/
# Deve mostrar: index.html, assets/, etc.
```

---

## 🌐 PARTE 6: Configurar Nginx (Frontend + Backend)

### 6.1 - Descobrir Versão do PHP-FPM

```bash
# Ver qual versão do PHP-FPM está instalada
ls /var/run/php/

# Deve aparecer algo como: php8.1-fpm.sock ou php8.2-fpm.sock
# Anote esta versão para usar na configuração
```

### 6.2 - Criar Configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/terminal404
```

**Cole esta configuração:**

```nginx
server {
    listen 80;
    listen [::]:80;
    
    # ⚠️ ALTERE PARA SEU DOMÍNIO
    server_name terminal404.com.br www.terminal404.com.br;
    
    # Logs
    access_log /var/log/nginx/terminal404_access.log;
    error_log /var/log/nginx/terminal404_error.log;
    
    # Frontend React (arquivos estáticos)
    root /var/www/terminal404/dist;
    index index.html;
    
    # Servir frontend (SPA - Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Backend PHP
    location /api/ {
        alias /var/www/terminal404/backend/;
        try_files $uri $uri/ /backend/index.php?$args;
        
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            # ⚠️ ALTERE php8.1 para a versão que você viu no passo 6.1
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $request_filename;
            fastcgi_param PATH_INFO $fastcgi_path_info;
        }
    }
    
    # Bloquear acesso direto ao backend via URL
    location /backend/ {
        deny all;
    }
    
    # Segurança
    server_tokens off;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json image/svg+xml;
}
```

**⚠️ IMPORTANTE:** 
- Altere `terminal404.com.br` para **SEU DOMÍNIO**
- Altere `php8.1-fpm.sock` para a **VERSÃO que você viu** no passo 6.1

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 6.3 - Ativar Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/

# Remover config padrão
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Deve aparecer:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 6.4 - Reiniciar Serviços

```bash
# Reiniciar PHP-FPM
sudo systemctl restart php8.1-fpm  # Use a versão correta

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar status
sudo systemctl status php8.1-fpm
sudo systemctl status nginx
```

✅ **Teste:** Acesse `http://SEU_IP` → Deve aparecer o site Terminal_404

---

## 🔐 PARTE 7: SSL/HTTPS (Let's Encrypt)

### 7.1 - Configurar DNS

**No painel do seu provedor de domínio (Registro.br, GoDaddy, etc.):**

Adicione estes registros DNS:

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | @ | SEU_IP_SERVIDOR | 3600 |
| A | www | SEU_IP_SERVIDOR | 3600 |

**⏱️ Aguarde 5-30 minutos para propagação**

**Testar propagação:**
```bash
nslookup terminal404.com.br
# Deve retornar o IP do servidor
```

### 7.2 - Obter Certificado SSL

**⚠️ SÓ EXECUTE APÓS O DNS ESTAR PROPAGADO!**

```bash
sudo certbot --nginx -d terminal404.com.br -d www.terminal404.com.br
```

**Perguntas:**
1. **Email:** `terminallocal404@gmail.com`
2. **Termos:** `A` (Agree)
3. **Compartilhar email:** `N` (No)
4. **Redirect HTTP → HTTPS:** `2` (Yes, redirect)

**✅ Saída esperada:**
```
Successfully received certificate.
Congratulations! You have successfully enabled HTTPS
```

### 7.3 - Testar Renovação Automática

```bash
sudo certbot renew --dry-run

# Deve aparecer:
# Congratulations, all simulated renewals succeeded
```

---

## 🔥 PARTE 8: Firewall (UFW)

```bash
# Permitir SSH
sudo ufw allow OpenSSH

# Permitir HTTP
sudo ufw allow 'Nginx HTTP'

# Permitir HTTPS
sudo ufw allow 'Nginx HTTPS'

# Ativar
sudo ufw enable
# Confirme: y

# Verificar
sudo ufw status verbose
```

**Saída esperada:**
```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx HTTP                 ALLOW       Anywhere
Nginx HTTPS                ALLOW       Anywhere
```

---

## ✅ PARTE 9: Validação Final

### 9.1 - Checklist Completo

**✅ 1. Site no ar via HTTPS:**
```
https://terminal404.com.br
https://www.terminal404.com.br
```

**✅ 2. API funcionando:**
```bash
curl https://terminal404.com.br/api/health
```

**✅ 3. PHP-FPM rodando:**
```bash
sudo systemctl status php8.1-fpm  # Use sua versão
# Deve estar: active (running)
```

**✅ 4. Nginx rodando:**
```bash
sudo systemctl status nginx
# Deve estar: active (running)
```

**✅ 5. Testar Formulário de Contato:**
- Acesse: `https://terminal404.com.br/contato`
- Preencha e envie
- Verifique email: `terminallocal404@gmail.com`

**✅ 6. Testar Formulário de Solicitação:**
- Acesse: `https://terminal404.com.br/solicitacao`
- Preencha e envie
- Verifique email: `terminallocal404@gmail.com`

---

## 🛠️ COMANDOS DE MANUTENÇÃO

### Ver Status de Tudo

```bash
# PHP-FPM
sudo systemctl status php8.1-fpm

# Nginx
sudo systemctl status nginx

# Ver processos PHP
ps aux | grep php
```

### Logs do Backend PHP

```bash
# Log da API
sudo tail -f /var/www/terminal404/backend/logs/api.log

# Erros do PHP
sudo tail -f /var/www/terminal404/backend/logs/php_errors.log

# Rate limiting
cat /var/www/terminal404/backend/logs/rate_limits.json | python3 -m json.tool
```

### Logs do Nginx

```bash
# Acessos
sudo tail -f /var/log/nginx/terminal404_access.log

# Erros
sudo tail -f /var/log/nginx/terminal404_error.log
```

### Reiniciar Serviços

```bash
# PHP-FPM
sudo systemctl restart php8.1-fpm

# Nginx
sudo systemctl restart nginx

# Ambos de uma vez
sudo systemctl restart php8.1-fpm nginx

# Ver status
sudo systemctl status php8.1-fpm nginx
```

### Atualizar o Site

```bash
# 1. Conectar
ssh terminal404@SEU_IP

# 2. Ir para o projeto
cd /var/www/terminal404

# 3. Atualizar código (Git)
git pull

# 4. Instalar novas dependências (se houver)
npm install

# 5. Rebuild do frontend
npm run build

# 6. Reiniciar serviços
sudo systemctl restart php8.1-fpm nginx

# 7. Verificar
sudo systemctl status php8.1-fpm nginx
```

### Backup Completo

```bash
# Criar backup
cd ~
sudo tar --exclude='node_modules' --exclude='dist' \
  -czf terminal404-backup-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/terminal404

# Listar backups
ls -lh ~/terminal404-backup-*.tar.gz

# Baixar para seu PC (do seu computador local):
scp terminal404@SEU_IP:~/terminal404-backup-*.tar.gz ./
```

### Limpar Logs

```bash
# Backup dos logs
cd /var/www/terminal404/backend/logs
cp api.log api.log.bak
cp php_errors.log php_errors.log.bak

# Limpar logs
> api.log
> php_errors.log

# Resetar rate limits
echo "[]" > rate_limits.json
```

### Monitorar Recursos

```bash
# CPU/RAM em tempo real
htop
# Pressione 'q' para sair

# Espaço em disco
df -h

# Memória
free -h

# Processos PHP
ps aux | grep php

# Processos Nginx
ps aux | grep nginx
```

### Resolver Problemas

**❌ Site não carrega**
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

**❌ Erro 502 Bad Gateway**
```bash
# PHP-FPM provavelmente está parado
sudo systemctl status php8.1-fpm
sudo systemctl restart php8.1-fpm
```

**❌ API retorna 404**
```bash
# Verificar configuração do Nginx
sudo nginx -t

# Verificar permissões do backend
ls -la /var/www/terminal404/backend/

# Deve mostrar www-data como dono
```

**❌ Formulários não enviam**
```bash
# Verificar logs
sudo tail -f /var/www/terminal404/backend/logs/api.log

# Verificar senha de email
grep SMTP_PASSWORD /var/www/terminal404/backend/config.php

# Testar API manualmente
curl -X POST https://terminal404.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","message":"Teste de mensagem com mais de 10 caracteres"}'
```

**❌ SSL não funciona**
```bash
# Renovar certificado
sudo certbot renew
sudo systemctl reload nginx

# Ver certificados instalados
sudo certbot certificates
```

**❌ Permissões negadas**
```bash
# Corrigir permissões do backend
sudo chown -R www-data:www-data /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend/logs
sudo chmod 644 /var/www/terminal404/backend/*.php
```

---

## 🚀 SCRIPT DE DEPLOY AUTOMATIZADO (OPCIONAL)

Crie um script para automatizar o deploy:

```bash
nano /var/www/terminal404/deploy.sh
```

**Cole este conteúdo:**

```bash
#!/bin/bash

echo "🚀 Iniciando deploy do Terminal_404..."

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Ir para o diretório
cd /var/www/terminal404

# 1. Atualizar código
echo "📥 Atualizando código..."
git pull || { echo -e "${RED}❌ Erro ao atualizar código${NC}"; exit 1; }

# 2. Frontend
echo "🎨 Instalando dependências do frontend..."
npm install || { echo -e "${RED}❌ Erro ao instalar dependências${NC}"; exit 1; }

echo "🔨 Fazendo build do frontend..."
npm run build || { echo -e "${RED}❌ Erro ao fazer build${NC}"; exit 1; }

# 3. Backend PHP - Corrigir permissões
echo "🔧 Corrigindo permissões do backend..."
sudo chown -R www-data:www-data /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend/logs

# 4. Reiniciar serviços
echo "🔄 Reiniciando serviços..."
sudo systemctl restart php8.1-fpm
sudo systemctl reload nginx

# 5. Verificar status
echo "✅ Verificando serviços..."
sudo systemctl is-active --quiet php8.1-fpm && echo -e "${GREEN}✅ PHP-FPM OK${NC}" || echo -e "${RED}❌ PHP-FPM FALHOU${NC}"
sudo systemctl is-active --quiet nginx && echo -e "${GREEN}✅ Nginx OK${NC}" || echo -e "${RED}❌ Nginx FALHOU${NC}"

echo -e "${GREEN}🎉 Deploy concluído!${NC}"
```

**Dar permissão:**
```bash
chmod +x /var/www/terminal404/deploy.sh
```

**Usar:**
```bash
cd /var/www/terminal404
./deploy.sh
```

---

## 🎉 PRONTO! SEU SITE ESTÁ NO AR!

### 🌐 URLs:
- **Site:** https://terminal404.com.br
- **API Health:** https://terminal404.com.br/api/health
- **Contato:** https://terminal404.com.br/contato
- **Solicitação:** https://terminal404.com.br/solicitacao

### ✅ Serviços Rodando:
- ✅ Frontend React (Nginx)
- ✅ Backend PHP (PHP-FPM)
- ✅ SSL/HTTPS (Let's Encrypt)
- ✅ Firewall (UFW)

### 🔄 Automático:
- ✅ PHP-FPM inicia no boot
- ✅ Nginx inicia no boot
- ✅ SSL renova automaticamente

### 🔐 Segurança:
- ✅ Rate limiting ativo
- ✅ Sanitização de dados
- ✅ Validação de inputs
- ✅ Headers de segurança
- ✅ Logs de auditoria

---

**Desenvolvido por Terminal_404**  
**Manual v3.0** | Ubuntu 25.10 x64 | Backend PHP | 22/02/2026