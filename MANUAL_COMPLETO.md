# 📖 MANUAL COMPLETO - TERMINAL_404

> **Tudo que você precisa em um único lugar!**

**Versão:** 3.0.0  
**Data:** 23 de Fevereiro de 2026  
**Sistema:** Ubuntu 22.04/24.04 LTS x64

---

## 📑 ÍNDICE

**[PARTE 1 - INÍCIO RÁPIDO](#parte-1---início-rápido)**
- [Instalação Automática (3 Comandos)](#1-instalação-automática-recomendado)
- [O que o Script Faz](#o-que-o-script-installsh-faz)

**[PARTE 2 - INSTALAÇÃO MANUAL (PASSO A PASSO)](#parte-2---instalação-manual-passo-a-passo)**
- [Passo 1: Limpar Sistema](#passo-1-limpar-tudo)
- [Passo 2: Instalar Softwares](#passo-2-instalar-tudo-de-uma-vez)
- [Passo 3: Baixar Projeto](#passo-3-baixar-projeto)
- [Passo 4: Configurar Backend](#passo-4-configurar-backend-php)
- [Passo 5: Build Frontend](#passo-5-fazer-build-do-frontend)
- [Passo 6: Descobrir Versão PHP](#passo-6-descobrir-versão-do-php-fpm)
- [Passo 7: Configurar Nginx](#passo-7-configurar-nginx)
- [Passo 8: Iniciar Serviços](#passo-8-iniciar-tudo)
- [Passo 9: Testar](#passo-9-testar)
- [Passo 10: Firewall](#passo-10-firewall)
- [Passo 11: SSL/HTTPS](#passo-11-sslhttps-se-tiver-domínio)

**[PARTE 3 - DIAGNÓSTICO E RESOLUÇÃO DE PROBLEMAS](#parte-3---diagnóstico-e-resolução-de-problemas)**
- [Script de Diagnóstico Automático](#script-de-diagnóstico-automático)
- [Problemas Comuns e Soluções](#problemas-comuns-e-soluções)

**[PARTE 4 - MANUTENÇÃO E COMANDOS ÚTEIS](#parte-4---manutenção-e-comandos-úteis)**
- [Ver Logs](#ver-logs-em-tempo-real)
- [Reiniciar Serviços](#reiniciar-serviços)
- [Atualizar Site](#atualizar-site)
- [Verificar Status](#verificar-status)

**[PARTE 5 - INFORMAÇÕES TÉCNICAS](#parte-5---informações-técnicas)**
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura do Deploy](#arquitetura-do-deploy)
- [API Backend](#api-backend)
- [Configurações](#configurações-importantes)

---
---

# PARTE 1 - INÍCIO RÁPIDO

## 1. Instalação Automática (RECOMENDADO)

### ⚡ Apenas 3 Comandos

```bash
# 1. Conectar ao servidor
ssh root@SEU_IP_SERVIDOR

# 2. Baixar e executar script de instalação
curl -fsSL https://raw.githubusercontent.com/Terminllocal404/terminal404-Fim/main/install.sh -o install.sh
bash install.sh

# 3. Acessar no navegador
http://SEU_IP
```

**✅ PRONTO! Site no ar em 10 minutos!**

---

### O que o Script `install.sh` Faz

O script automático executa TODAS estas tarefas:

1. ✅ **Limpa o sistema**
   - Para Apache/Nginx se estiverem rodando
   - Remove Apache completamente (evita conflitos)
   - Remove configurações antigas

2. ✅ **Atualiza o sistema**
   - `apt update && apt upgrade`

3. ✅ **Instala Node.js 20**
   - Adiciona repositório oficial
   - Instala versão mais recente

4. ✅ **Instala PHP 8.1+**
   - PHP + extensões necessárias
   - php-fpm, php-cli, php-mbstring, php-json, php-curl, php-xml

5. ✅ **Instala Nginx**
   - Servidor web leve e rápido

6. ✅ **Instala ferramentas extras**
   - Git, curl, wget, unzip
   - Certbot (SSL)
   - Utilitários

7. ✅ **Clona o projeto**
   - Baixa do GitHub para `/var/www/terminal404`

8. ✅ **Configura backend**
   - Cria pasta de logs
   - Define permissões corretas (www-data)
   - Logs graváveis

9. ✅ **Faz build do frontend**
   - `npm install`
   - `npm run build`
   - Gera arquivos em `/dist`

10. ✅ **Configura Nginx automaticamente**
    - Detecta versão do PHP-FPM
    - Cria configuração otimizada
    - Remove configuração padrão
    - Ativa site Terminal_404

11. ✅ **Inicia serviços**
    - PHP-FPM
    - Nginx
    - Habilita auto-start no boot

12. ✅ **Configura SSL** (opcional)
    - Se você informar um domínio
    - Usa Let's Encrypt/Certbot

13. ✅ **Configura firewall**
    - UFW ativado
    - Libera SSH, HTTP, HTTPS

14. ✅ **Testa tudo**
    - Site responde?
    - API responde?
    - Mostra resumo final

---

### Perguntas Durante a Instalação

O script vai perguntar:

**1. Digite seu domínio (ou deixe em branco para usar apenas IP):**
- Se você tem domínio → digite (exemplo: `terminal404.com.br`)
- Se não tem → deixe em branco (pressione Enter)

**2. Deseja configurar SSL/HTTPS agora? (s/N):**
- Se você digitou um domínio e ele já está apontando para o IP → digite `s`
- Se não → digite `n` (pode configurar depois)

---

### Resultado Final

Ao final, o script mostra:

```
╔═══════════════════════════════════════════════════════════╗
║              🎉  INSTALAÇÃO CONCLUÍDA!  🎉                ║
╚═══════════════════════════════════════════════════════════╝

✅ INFORMAÇÕES DO SERVIDOR

🌐 Site: http://SEU_IP (ou https://seudominio.com.br)
🔌 API: http://SEU_IP/api/health

📂 Arquivos: /var/www/terminal404
📝 Logs Nginx: /var/log/nginx/terminal404.error.log
📝 Logs API: /var/www/terminal404/backend/logs/api.log
```

---
---

# PARTE 2 - INSTALAÇÃO MANUAL (PASSO A PASSO)

Se você preferir fazer manualmente (ou se o script automático falhar), siga estes passos:

---

## PASSO 1: Limpar Tudo

```bash
# Conectar como root
ssh root@SEU_IP

# Parar serviços (se existirem)
systemctl stop apache2 nginx php*-fpm 2>/dev/null

# DELETAR Apache (causa conflitos)
apt remove --purge -y apache2 apache2-* 2>/dev/null
apt autoremove -y

# Limpar pastas antigas
rm -rf /var/www/*
rm -rf /etc/nginx
rm -rf /etc/apache2
rm -rf /etc/php

# Atualizar sistema
apt update && apt upgrade -y
```

**✅ Sistema limpo!**

---

## PASSO 2: Instalar Tudo de Uma Vez

```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar PHP 8.1+ com extensões
apt install -y php php-fpm php-cli php-mbstring php-json php-curl php-xml

# Instalar Nginx
apt install -y nginx

# Instalar extras
apt install -y git curl wget unzip certbot python3-certbot-nginx lsof

# Verificar versões instaladas
echo "=== VERSÕES INSTALADAS ==="
node --version    # Deve mostrar: v20.x.x
php --version     # Deve mostrar: 8.1.x ou superior
nginx -v          # Deve mostrar: 1.x.x
echo "=========================="
```

**✅ Tudo instalado!**

---

## PASSO 3: Baixar Projeto

```bash
# Ir para pasta web
cd /var/www

# Clonar projeto do GitHub
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

## PASSO 4: Configurar Backend PHP

```bash
# Ir para backend
cd /var/www/terminal404/backend

# Editar configuração (se precisar mudar senha SMTP)
nano config.php
```

**Linha 12 do `config.php`:**
```php
define('SMTP_PASSWORD', 'oxii jedf rkav ubgz');  // ← Senha já configurada
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

## PASSO 5: Fazer Build do Frontend

```bash
# Ir para raiz do projeto
cd /var/www/terminal404

# Instalar dependências
npm install

# Fazer build de produção
npm run build

# Verificar se criou a pasta dist
ls -la dist/

# Deve mostrar: index.html, assets/, etc.
```

**✅ Frontend pronto!**

---

## PASSO 6: Descobrir Versão do PHP-FPM

```bash
# Ver qual versão do PHP-FPM está instalada
ls /run/php/ | grep fpm

# Vai mostrar algo como:
# php8.1-fpm.sock  ← ANOTE ESTA VERSÃO!
# OU
# php8.2-fpm.sock
# OU
# php8.3-fpm.sock
```

**⚠️ IMPORTANTE: Anote a versão (8.1, 8.2 ou 8.3)**

Você vai usar esta versão no próximo passo!

---

## PASSO 7: Configurar Nginx

```bash
# Deletar configuração padrão
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-available/default

# Criar configuração do Terminal_404
nano /etc/nginx/sites-available/terminal404
```

**Cole EXATAMENTE esta configuração:**

```nginx
server {
    listen 80;
    listen [::]:80;
    
    # Aceitar qualquer domínio/IP
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

**⚠️ ATENÇÃO:** Na linha que tem `fastcgi_pass unix:/run/php/php8.1-fpm.sock;`

**Mude `php8.1` para a versão que você anotou no Passo 6!**

Exemplos:
- Se sua versão é 8.2 → `php8.2-fpm.sock`
- Se sua versão é 8.3 → `php8.3-fpm.sock`

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

**❌ Se der erro:**
- Revise a versão do PHP na configuração
- Verifique se não tem erros de digitação

---

## PASSO 8: Iniciar Tudo

```bash
# Descobrir versão do PHP-FPM automaticamente
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

## PASSO 9: Testar

```bash
# 1. Testar localhost
curl http://localhost

# Deve retornar HTML do site (muitas linhas)

# 2. Testar API
curl http://localhost/api/health

# Deve retornar JSON: {"status":"online",...}

# 3. Ver IP público do servidor
curl ifconfig.me

# Anote este IP
```

**Agora acesse no navegador do seu computador:**

```
http://SEU_IP
```

**✅ O SITE DEVE APARECER!**

Se aparecer a página do Terminal_404 → **SUCESSO!** 🎉

---

## PASSO 10: Firewall

```bash
# Instalar UFW
apt install -y ufw

# Permitir SSH (IMPORTANTE! Não pule isso!)
ufw allow OpenSSH

# Permitir HTTP/HTTPS
ufw allow 'Nginx Full'

# Ativar firewall
ufw --force enable

# Ver status
ufw status verbose
```

**✅ Firewall configurado!**

---

## PASSO 11: SSL/HTTPS (Se Tiver Domínio)

**⚠️ SÓ FAÇA ISSO SE:**
- Você tem um domínio registrado
- O domínio está apontando para o IP do servidor
- O site já está funcionando no HTTP

### Passo 11.1: Editar Nginx

```bash
nano /etc/nginx/sites-available/terminal404
```

**Mude a linha:**
```nginx
server_name _;
```

**Para:**
```nginx
server_name seudominio.com.br www.seudominio.com.br;
```

**Salvar e testar:**
```bash
nginx -t
systemctl reload nginx
```

### Passo 11.2: Obter Certificado SSL

```bash
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

**Perguntas:**
1. **Email:** `terminallocal404@gmail.com`
2. **Aceitar termos:** `Y`
3. **Redirect HTTP para HTTPS:** `2` (Yes)

**✅ Pronto! Acesse:** `https://seudominio.com.br`

---
---

# PARTE 3 - DIAGNÓSTICO E RESOLUÇÃO DE PROBLEMAS

## Script de Diagnóstico Automático

Se algo não está funcionando, execute:

```bash
cd /var/www/terminal404
bash backend/diagnostico.sh
```

### O que o Diagnóstico Verifica

1. ✅ Sistema operacional e kernel
2. ✅ Node.js instalado e versão
3. ✅ PHP instalado e versão
4. ✅ Extensões PHP (mbstring, json, curl, xml)
5. ✅ PHP-FPM rodando e versão
6. ✅ Nginx instalado e rodando
7. ✅ Configuração do Nginx válida
8. ✅ Apache rodando (conflito)
9. ✅ Portas 80 e 443
10. ✅ Arquivos do projeto (dist/, backend/)
11. ✅ Permissões corretas
12. ✅ Site responde (localhost)
13. ✅ API responde (/api/health)
14. ✅ Versão do PHP no Nginx bate com instalada
15. ✅ Últimos erros do Nginx

### Exemplo de Saída

```
╔════════════════════════════════════════════════════════╗
║     🔍 DIAGNÓSTICO TERMINAL_404                       ║
╚════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SISTEMA OPERACIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️  Ubuntu 24.04 LTS
ℹ️  Kernel: 6.8.0-49-generic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. NODE.JS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Node.js instalado: v20.11.0

... (mais verificações) ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. RESUMO E RECOMENDAÇÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╔═══════════════════════════════════════════════════════════╗
║  🎉 TUDO PARECE ESTAR FUNCIONANDO CORRETAMENTE!          ║
╚═══════════════════════════════════════════════════════════╝

ℹ️  Acesse: http://SEU_IP
```

---

## Problemas Comuns e Soluções

### ❌ Problema 1: "502 Bad Gateway"

**Causa:** PHP-FPM parou ou não está rodando

**Solução:**
```bash
# Descobrir versão
ls /run/php/ | grep fpm

# Reiniciar (mude para sua versão)
systemctl restart php8.1-fpm

# Verificar
systemctl status php8.1-fpm
```

---

### ❌ Problema 2: "Apache2 Default Page"

**Causa:** Apache está rodando e bloqueando a porta 80

**Solução:**
```bash
# Parar Apache
systemctl stop apache2
systemctl disable apache2

# Remover Apache completamente
apt remove --purge -y apache2*
apt autoremove -y

# Reiniciar Nginx
systemctl restart nginx

# Testar
curl http://localhost
```

---

### ❌ Problema 3: "403 Forbidden"

**Causa:** Permissões erradas

**Solução:**
```bash
# Corrigir permissões
chown -R www-data:www-data /var/www/terminal404
chmod -R 755 /var/www/terminal404
chmod -R 777 /var/www/terminal404/backend/logs

# Reiniciar
systemctl restart nginx
```

---

### ❌ Problema 4: API retorna 404

**Causa:** Configuração do Nginx errada ou backend não existe

**Solução:**
```bash
# Verificar se backend existe
ls -la /var/www/terminal404/backend/

# Deve mostrar: index.php, config.php, functions.php

# Ver logs do Nginx
tail -50 /var/log/nginx/terminal404.error.log

# Testar PHP diretamente
php /var/www/terminal404/backend/index.php

# Reiniciar Nginx
systemctl restart nginx
```

---

### ❌ Problema 5: Página padrão do Nginx

**Causa:** Configuração não foi ativada

**Solução:**
```bash
# Remover default
rm -f /etc/nginx/sites-enabled/default

# Ativar Terminal_404
ln -sf /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Reiniciar
systemctl reload nginx
```

---

### ❌ Problema 6: "Unit php8.1-fpm.service could not be found"

**Causa:** Versão do PHP diferente da configurada

**Solução:**
```bash
# Descobrir versão instalada
ls /run/php/ | grep fpm
# Exemplo de saída: php8.2-fpm.sock

# Editar configuração do Nginx
nano /etc/nginx/sites-available/terminal404

# Mudar linha:
# DE:   fastcgi_pass unix:/run/php/php8.1-fpm.sock;
# PARA: fastcgi_pass unix:/run/php/php8.2-fpm.sock;

# Salvar e testar
nginx -t
systemctl reload nginx

# Iniciar PHP-FPM correto
systemctl start php8.2-fpm
systemctl enable php8.2-fpm
```

---

### ❌ Problema 7: Formulário não envia email

**Causa:** Senha SMTP incorreta ou extensão OpenSSL faltando

**Solução:**
```bash
# 1. Verificar senha no backend
nano /var/www/terminal404/backend/config.php

# Linha 12 deve ter:
# define('SMTP_PASSWORD', 'oxii jedf rkav ubgz');

# 2. Instalar OpenSSL
apt install -y php-openssl

# 3. Reiniciar PHP-FPM
systemctl restart php8.1-fpm

# 4. Ver logs da API
tail -f /var/www/terminal404/backend/logs/api.log

# 5. Testar formulário novamente
```

---

### ❌ Problema 8: "Too Many Requests" (Rate Limit)

**Causa:** Rate limit excedido (proteção anti-spam)

**Solução:**
```bash
# Resetar rate limits
echo "[]" > /var/www/terminal404/backend/logs/rate_limits.json

# Ou aguarde 60 segundos
```

---

### ❌ Problema 9: Site lento ou não carrega assets

**Causa:** Gzip não está funcionando

**Solução:**
```bash
# Verificar se módulo gzip está ativo
nginx -V 2>&1 | grep gzip

# Reiniciar Nginx
systemctl restart nginx

# Testar compressão
curl -H "Accept-Encoding: gzip" -I http://localhost
```

---

### ❌ Problema 10: SSL não funciona

**Causa:** Domínio não está apontando para o IP ou certbot falhou

**Solução:**
```bash
# 1. Verificar se domínio aponta para o IP
ping seudominio.com.br
# Deve mostrar o IP do seu servidor

# 2. Tentar novamente
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br

# 3. Ver logs
tail -f /var/log/letsencrypt/letsencrypt.log

# 4. Se persistir, verificar firewall
ufw allow 'Nginx Full'
```

---
---

# PARTE 4 - MANUTENÇÃO E COMANDOS ÚTEIS

## Ver Logs em Tempo Real

```bash
# Logs do Nginx (erros)
tail -f /var/log/nginx/terminal404.error.log

# Logs do Nginx (acessos)
tail -f /var/log/nginx/terminal404.access.log

# Logs da API
tail -f /var/www/terminal404/backend/logs/api.log

# Logs de erros PHP
tail -f /var/www/terminal404/backend/logs/php_errors.log
```

---

## Reiniciar Serviços

```bash
# Reiniciar PHP-FPM (mude para sua versão)
systemctl restart php8.1-fpm

# Reiniciar Nginx
systemctl restart nginx

# Reiniciar ambos
systemctl restart php8.1-fpm nginx

# Ver status
systemctl status php8.1-fpm nginx
```

---

## Atualizar Site

```bash
# Ir para pasta do projeto
cd /var/www/terminal404

# Baixar atualizações do GitHub
git pull origin main

# Reinstalar dependências (se package.json mudou)
npm install

# Fazer novo build
npm run build

# Reiniciar serviços
systemctl restart php8.1-fpm nginx
```

---

## Verificar Status

```bash
# Ver processos rodando
ps aux | grep -E "nginx|php"

# Ver portas abertas
netstat -tlnp | grep -E ":80|:443"

# Ver qual servidor está na porta 80
lsof -i :80

# Ver uso de disco
df -h

# Ver uso de memória
free -h

# Ver carga do sistema
uptime
```

---

## Limpar Logs Antigos

```bash
cd /var/www/terminal404/backend/logs

# Fazer backup
cp api.log api.log.$(date +%Y%m%d).bak
cp php_errors.log php_errors.log.$(date +%Y%m%d).bak

# Limpar
> api.log
> php_errors.log

# Ou deletar backups antigos (mais de 30 dias)
find . -name "*.bak" -mtime +30 -delete
```

---

## Testar API

```bash
# Health check
curl http://localhost/api/health

# Formulário de contato
curl -X POST http://localhost/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "message": "Esta é uma mensagem de teste com mais de 10 caracteres."
  }'

# Solicitação de projeto
curl -X POST http://localhost/api/project-request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "phone": "11987654321",
    "project_type": "Website",
    "project_title": "Projeto Teste",
    "project_description": "Descrição detalhada do projeto de teste."
  }'
```

---

## Backup Completo

```bash
# Criar backup
cd /var/www
tar -czf terminal404-backup-$(date +%Y%m%d).tar.gz terminal404/

# Baixar backup (do seu computador)
scp root@SEU_IP:/var/www/terminal404-backup-*.tar.gz ~/Downloads/

# Restaurar backup
cd /var/www
tar -xzf terminal404-backup-20260223.tar.gz
chown -R www-data:www-data terminal404
systemctl restart php8.1-fpm nginx
```

---
---

# PARTE 5 - INFORMAÇÕES TÉCNICAS

## Estrutura do Projeto

```
/var/www/terminal404/
│
├── dist/                      # Frontend buildado (Nginx serve daqui)
│   ├── index.html
│   └── assets/
│
├── backend/                   # API PHP
│   ├── index.php              # Router principal
│   ├── config.php             # Configurações (SMTP, CORS, etc.)
│   ├── functions.php          # Funções (validação, email, etc.)
│   ├── .htaccess              # Config Apache (não usado no Nginx)
│   └── logs/                  # Logs da API
│       ├── api.log            # Atividades
│       ├── php_errors.log     # Erros PHP
│       └── rate_limits.json   # Controle de spam
│
├── src/                       # Código fonte React (não usado em produção)
│   ├── app/
│   ├── imports/
│   └── styles/
│
├── public/
│   └── favicon.svg
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Arquitetura do Deploy

```
Internet
   ↓
Nginx (porta 80/443)
   ├─→ Requisição para /           → Serve /var/www/terminal404/dist/index.html
   ├─→ Requisição para /sobre      → Serve /var/www/terminal404/dist/index.html (React Router)
   ├─→ Requisição para /assets/*   → Serve /var/www/terminal404/dist/assets/*
   └─→ Requisição para /api/*      → Passa para PHP-FPM via socket
                                      ↓
                                   PHP-FPM (processa PHP)
                                      ↓
                                   /var/www/terminal404/backend/index.php
                                      ↓
                                   Resposta JSON
```

---

## API Backend

### Endpoints Disponíveis

**1. Raiz da API**
```
GET /api
GET /api/
```
Retorna informações sobre a API e endpoints disponíveis.

---

**2. Health Check**
```
GET /api/health
```
Verifica se a API está online.

**Resposta:**
```json
{
  "status": "online",
  "message": "Terminal_404 API Running",
  "timestamp": "2026-02-23T10:00:00-03:00",
  "server": {
    "php_version": "8.1.0",
    "os": "Linux",
    "timezone": "America/Sao_Paulo",
    "uptime": "Load: 0.10, 0.15, 0.20"
  }
}
```

---

**3. Formulário de Contato**
```
POST /api/contact
Content-Type: application/json
```

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "message": "Mensagem de contato..."
}
```

**Rate Limit:** 5 requisições/minuto por IP

---

**4. Solicitação de Projeto**
```
POST /api/project-request
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@empresa.com",
  "phone": "11987654321",
  "company": "Empresa XYZ",
  "project_type": "Website Institucional",
  "project_title": "Site Corporativo",
  "project_description": "Descrição detalhada...",
  "tech_stack": ["React", "Node.js"],
  "deadline": "30 dias",
  "budget": "R$ 5.000 - R$ 10.000",
  "has_design": true,
  "needs_hosting": false,
  "additional_info": "Observações..."
}
```

**Rate Limit:** 3 requisições/minuto por IP

---

## Configurações Importantes

### 1. Backend - `config.php`

```php
// SMTP Gmail
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'terminallocal404@gmail.com');
define('SMTP_PASSWORD', 'oxii jedf rkav ubgz');  // ← Senha configurada

// CORS (domínios permitidos)
define('ALLOWED_ORIGINS', [
    'https://terminal404.com.br',
    'https://www.terminal404.com.br',
    'http://localhost:5173'
]);

// Rate Limiting
define('RATE_LIMIT_CONTACT', 5);         // 5 requisições/minuto
define('RATE_LIMIT_PROJECT', 3);         // 3 requisições/minuto
define('RATE_LIMIT_WINDOW', 60);         // Janela de 60 segundos
```

---

### 2. Nginx - `/etc/nginx/sites-available/terminal404`

**Pontos importantes:**

1. **Root:** Aponta para `/var/www/terminal404/dist`
2. **PHP-FPM Socket:** `/run/php/php8.x-fpm.sock` (mude para sua versão)
3. **API:** Redireciona `/api/*` para `/backend/index.php`
4. **SPA:** Todas as rotas não encontradas vão para `index.html` (React Router)

---

### 3. Permissões

```bash
# Owner: www-data (usuário do Nginx/PHP)
# Backend: 755 (rwxr-xr-x)
# Logs: 777 (rwxrwxrwx) - precisa ser gravável
```

---

### 4. Firewall (UFW)

```bash
# Portas abertas:
# - 22 (SSH)
# - 80 (HTTP)
# - 443 (HTTPS)
```

---

### 5. SSL/HTTPS

**Arquivo de configuração Nginx (após Certbot):**

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name terminal404.com.br www.terminal404.com.br;
    
    ssl_certificate /etc/letsencrypt/live/terminal404.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/terminal404.com.br/privkey.pem;
    
    # ... resto da configuração ...
}

server {
    listen 80;
    listen [::]:80;
    server_name terminal404.com.br www.terminal404.com.br;
    return 301 https://$host$request_uri;
}
```

**Renovação automática:**
```bash
# Certbot cria um cron job automaticamente
# Verificar:
systemctl list-timers | grep certbot
```

---

## Requisitos do Sistema

### Mínimo

- **CPU:** 1 core
- **RAM:** 1 GB
- **Disco:** 10 GB
- **OS:** Ubuntu 22.04+ LTS

### Recomendado

- **CPU:** 2+ cores
- **RAM:** 2+ GB
- **Disco:** 20+ GB
- **OS:** Ubuntu 24.04 LTS

---

## Segurança Implementada

1. ✅ **Rate Limiting** - Anti-spam por IP
2. ✅ **Sanitização** - Remove HTML/scripts maliciosos
3. ✅ **Validação** - Valida todos os inputs
4. ✅ **Headers de Segurança** - X-Frame-Options, CSP, etc.
5. ✅ **Logs de Auditoria** - Registra todas as atividades
6. ✅ **CORS Configurado** - Apenas domínios permitidos
7. ✅ **SSL/HTTPS** - Criptografia (se configurado)
8. ✅ **Firewall** - UFW ativo

---

## Performance

1. ✅ **Gzip** - Compressão de assets
2. ✅ **Nginx** - Servidor web rápido
3. ✅ **PHP-FPM** - FastCGI Process Manager
4. ✅ **React Build** - Otimizado para produção
5. ✅ **Vite** - Build tool moderno

---

## Tecnologias Utilizadas

### Frontend
- React 18.3
- TypeScript
- Vite 6.0
- Tailwind CSS 4.0
- React Router 7.1
- Motion (animações)
- Lucide React (ícones)

### Backend
- PHP 8.1+
- SMTP (Gmail)
- JSON (comunicação)

### Infraestrutura
- Nginx
- Ubuntu 22.04/24.04 LTS
- Let's Encrypt (SSL)
- UFW (firewall)

---

## Contato e Suporte

**Email:** terminallocal404@gmail.com  
**Discord:** Terminal_404 Community  
**GitHub:** https://github.com/Terminllocal404/terminal404-Fim

---
---

# ✅ CHECKLIST FINAL

Antes de considerar o deploy concluído, verifique:

- [ ] `curl http://localhost` retorna HTML do site
- [ ] `curl http://localhost/api/health` retorna JSON
- [ ] `systemctl status nginx` mostra `active (running)`
- [ ] `systemctl status php*-fpm` mostra `active (running)`
- [ ] Navegador mostra o site Terminal_404 (não página padrão)
- [ ] Formulário de contato funciona e envia email
- [ ] Logs são graváveis em `/var/www/terminal404/backend/logs/`
- [ ] Firewall está ativo (`ufw status`)
- [ ] SSL configurado (se tiver domínio)
- [ ] Backup inicial criado

---

# 🎉 CONCLUSÃO

Este manual contém **TUDO** que você precisa para fazer deploy do Terminal_404:

- ⚡ Instalação automática (3 comandos)
- 📖 Instalação manual (10 passos)
- 🔍 Diagnóstico automático de problemas
- 🛠️ Comandos úteis de manutenção
- 📚 Informações técnicas completas
- ❌ Soluções para problemas comuns

**Escolha seu caminho:**

1. **Rápido:** Execute `install.sh`
2. **Detalhado:** Siga os 10 passos manuais
3. **Com problema:** Execute `diagnostico.sh`

---

**Desenvolvido com ❤️ por Terminal_404**  
**Versão 3.0.0** | 23 de Fevereiro de 2026

**BOA SORTE COM SEU DEPLOY! 🚀✨**
