# 🚀 DEPLOY TERMINAL_404 - MÉTODO SIMPLES
## Do Zero ao Site no Ar em 15 Minutos

**Sistema:** Ubuntu 22.04/24.04 LTS x64  
**Data:** 23 de Fevereiro de 2026

---

## ⚠️ ANTES DE COMEÇAR

**Você vai precisar:**
- ✅ Servidor Ubuntu limpo (recém instalado)
- ✅ Acesso root via SSH
- ✅ IP do servidor
- ✅ Domínio apontando para o IP (opcional no início)

---

## 🎯 PASSO 1: LIMPAR TUDO (Se já tentou antes)

```bash
# Conectar como root
ssh root@SEU_IP

# DELETAR TUDO (se já existe)
systemctl stop apache2 nginx php*-fpm 2>/dev/null
apt remove --purge -y apache2 apache2-* nginx nginx-* php* 2>/dev/null
apt autoremove -y
rm -rf /var/www/*
rm -rf /etc/nginx
rm -rf /etc/apache2
rm -rf /etc/php

# Atualizar sistema
apt update && apt upgrade -y
```

**✅ Agora temos um servidor LIMPO!**

---

## 🎯 PASSO 2: INSTALAR TUDO DE UMA VEZ

```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar PHP 8.1+ com tudo
apt install -y php php-fpm php-cli php-mbstring php-json php-curl php-xml

# Instalar Nginx
apt install -y nginx

# Instalar extras
apt install -y git curl wget unzip certbot python3-certbot-nginx

# Verificar versões
echo "=== VERSÕES INSTALADAS ==="
node --version
php --version
nginx -v
echo "=========================="
```

**✅ Saída esperada:**
- Node: v20.x.x
- PHP: 8.1.x ou superior
- Nginx: 1.x.x

---

## 🎯 PASSO 3: BAIXAR PROJETO

```bash
# Ir para pasta web
cd /var/www

# Clonar projeto
git clone https://github.com/Terminllocal404/terminal404-Fim.git terminal404

# Entrar na pasta
cd terminal404

# Verificar estrutura
ls -la

# Deve mostrar:
# backend/
# src/
# package.json
# vite.config.ts
```

**✅ Projeto baixado!**

---

## 🎯 PASSO 4: CONFIGURAR BACKEND PHP

```bash
# Ir para backend
cd /var/www/terminal404/backend

# Editar config
nano config.php
```

**Encontre a linha 12 e MUDE A SENHA:**

```php
define('SMTP_PASSWORD', 'oxii jedf rkav ubgz');  // ← Sua senha aqui
```

**Salvar:** `Ctrl+O` → `Enter` → `Ctrl+X`

**Agora configurar permissões:**

```bash
# Criar pasta logs
mkdir -p logs

# Dar permissão para o PHP escrever
chown -R www-data:www-data /var/www/terminal404/backend
chmod -R 755 /var/www/terminal404/backend
chmod -R 777 /var/www/terminal404/backend/logs
```

**✅ Backend configurado!**

---

## 🎯 PASSO 5: FAZER BUILD DO FRONTEND

```bash
# Ir para raiz do projeto
cd /var/www/terminal404

# Instalar dependências
npm install

# Fazer build
npm run build

# Verificar
ls -la dist/

# Deve mostrar: index.html, assets/, etc.
```

**✅ Frontend pronto!**

---

## 🎯 PASSO 6: DESCOBRIR VERSÃO DO PHP-FPM

```bash
# Ver qual versão está instalada
ls /run/php/ | grep fpm

# Vai mostrar algo como:
# php8.1-fpm.sock  ← Anote esta versão!
# OU
# php8.2-fpm.sock
# OU
# php8.3-fpm.sock
```

**⚠️ ANOTE A VERSÃO (exemplo: 8.1, 8.2 ou 8.3)**

---

## 🎯 PASSO 7: CONFIGURAR NGINX (O MAIS IMPORTANTE!)

```bash
# Deletar config padrão
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-available/default

# Criar nossa config
nano /etc/nginx/sites-available/terminal404
```

**Cole EXATAMENTE esta configuração:**

```nginx
server {
    listen 80;
    listen [::]:80;
    
    # Aceitar qualquer domínio/IP por enquanto
    server_name _;
    
    # Frontend (arquivos React buildados)
    root /var/www/terminal404/dist;
    index index.html;
    
    # Logs
    access_log /var/log/nginx/terminal404.access.log;
    error_log /var/log/nginx/terminal404.error.log;
    
    # 1. Servir frontend (todas as rotas React)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 2. API Backend PHP
    location /api {
        alias /var/www/terminal404/backend;
        
        # Se não encontrar arquivo, vai para index.php
        try_files $uri $uri/ @php;
        
        # Processar PHP
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            
            # ⚠️ MUDE AQUI PARA SUA VERSÃO (8.1, 8.2 ou 8.3)
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
            
            fastcgi_param SCRIPT_FILENAME $request_filename;
        }
    }
    
    # Fallback para PHP
    location @php {
        rewrite ^/api/(.*)$ /backend/index.php?$1 last;
    }
    
    # Bloquear acesso direto ao backend
    location /backend {
        deny all;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
}
```

**⚠️ IMPORTANTE:** Na linha `fastcgi_pass`, mude `php8.1-fpm.sock` para **SUA VERSÃO** que você anotou no Passo 6!

**Salvar:** `Ctrl+O` → `Enter` → `Ctrl+X`

**Ativar configuração:**

```bash
# Criar link simbólico
ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/

# Testar configuração
nginx -t
```

**✅ Deve aparecer:**
```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**❌ Se der erro, revise a versão do PHP na configuração!**

---

## 🎯 PASSO 8: INICIAR TUDO

```bash
# Descobrir versão do PHP-FPM de novo
PHP_VERSION=$(ls /run/php/ | grep fpm | sed 's/php\(.*\)-fpm.sock/\1/')
echo "Versão do PHP: $PHP_VERSION"

# Iniciar PHP-FPM
systemctl start php${PHP_VERSION}-fpm
systemctl enable php${PHP_VERSION}-fpm

# Iniciar Nginx
systemctl start nginx
systemctl enable nginx

# Verificar status
echo "=== STATUS DOS SERVIÇOS ==="
systemctl status php${PHP_VERSION}-fpm --no-pager -l
echo ""
systemctl status nginx --no-pager -l
```

**✅ Ambos devem mostrar:** `active (running)` em VERDE

---

## 🎯 PASSO 9: TESTAR!

```bash
# 1. Testar localhost
curl http://localhost

# Deve retornar HTML do site (muitas linhas)

# 2. Testar API
curl http://localhost/api/health

# Deve retornar: {"status":"online",...}

# 3. Ver IP público
curl ifconfig.me

# Anote este IP
```

**Agora acesse no navegador:**
```
http://SEU_IP
```

**✅ O SITE DEVE APARECER!**

---

## 🎯 PASSO 10: FIREWALL (OPCIONAL MAS RECOMENDADO)

```bash
# Instalar UFW
apt install -y ufw

# Permitir SSH (IMPORTANTE!)
ufw allow OpenSSH

# Permitir HTTP/HTTPS
ufw allow 'Nginx Full'

# Ativar
ufw --force enable

# Ver status
ufw status verbose
```

---

## 🎯 PASSO 11: SSL/HTTPS (Se tiver domínio)

**⚠️ SÓ FAÇA SE:**
- Você tem um domínio
- O domínio está apontando para o IP do servidor
- O site já está funcionando no HTTP

```bash
# Editar config do Nginx
nano /etc/nginx/sites-available/terminal404
```

**Mude a linha `server_name _;` para:**

```nginx
server_name seudominio.com.br www.seudominio.com.br;
```

**Salvar e reiniciar:**

```bash
nginx -t
systemctl reload nginx
```

**Obter certificado SSL:**

```bash
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

**Perguntas:**
1. Email: `terminallocal404@gmail.com`
2. Termos: `Y`
3. Redirect: `2` (Yes)

**✅ Pronto! Acesse:** `https://seudominio.com.br`

---

## 🛠️ COMANDOS ÚTEIS

### Ver Logs em Tempo Real

```bash
# Logs do Nginx
tail -f /var/log/nginx/terminal404.error.log

# Logs da API
tail -f /var/www/terminal404/backend/logs/api.log

# Logs do PHP
tail -f /var/www/terminal404/backend/logs/php_errors.log
```

### Reiniciar Serviços

```bash
# PHP-FPM (mude para sua versão)
systemctl restart php8.1-fpm

# Nginx
systemctl restart nginx

# Ver status
systemctl status php8.1-fpm nginx
```

### Atualizar Site

```bash
cd /var/www/terminal404
git pull
npm install
npm run build
systemctl restart php8.1-fpm nginx
```

### Verificar o Que Está Rodando

```bash
# Ver processos
ps aux | grep -E "nginx|php"

# Ver portas abertas
netstat -tlnp | grep -E ":80|:443"

# Ver qual servidor web está na porta 80
lsof -i :80
```

---

## ❌ RESOLVER PROBLEMAS

### Problema: "502 Bad Gateway"

```bash
# PHP-FPM provavelmente parou
PHP_VERSION=$(ls /run/php/ | grep fpm | sed 's/php\(.*\)-fpm.sock/\1/')
systemctl restart php${PHP_VERSION}-fpm
systemctl status php${PHP_VERSION}-fpm
```

### Problema: "403 Forbidden"

```bash
# Permissões erradas
chown -R www-data:www-data /var/www/terminal404
chmod -R 755 /var/www/terminal404
chmod -R 777 /var/www/terminal404/backend/logs
```

### Problema: API retorna 404

```bash
# Ver logs
tail -50 /var/log/nginx/terminal404.error.log

# Verificar se backend existe
ls -la /var/www/terminal404/backend/

# Testar PHP diretamente
php /var/www/terminal404/backend/test.php
```

### Problema: Aparece página padrão do Nginx

```bash
# Config não foi ativada
rm -f /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Problema: Apache ainda rodando

```bash
# Remover completamente
systemctl stop apache2
systemctl disable apache2
apt remove --purge -y apache2*
apt autoremove -y
systemctl start nginx
```

---

## ✅ CHECKLIST FINAL

Antes de considerar concluído, verifique:

- [ ] `curl http://localhost` retorna HTML do site
- [ ] `curl http://localhost/api/health` retorna JSON
- [ ] `systemctl status nginx` mostra `active (running)`
- [ ] `systemctl status php*-fpm` mostra `active (running)`
- [ ] Navegador mostra o site Terminal_404 (não página padrão)
- [ ] Formulário de contato funciona (testa enviando)

---

## 🎉 PRONTO!

Se todos os checkboxes acima estão marcados, seu site está 100% funcional!

**URLs:**
- Site: `http://SEU_IP` (ou `https://seudominio.com.br`)
- API: `http://SEU_IP/api/health`

---

**Qualquer problema, execute:**

```bash
bash /var/www/terminal404/diagnostico.sh
```

(Vou criar este script a seguir)
