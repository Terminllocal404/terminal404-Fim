# 🖥️ Manual de Instalação e Configuração do Servidor
## Terminal_404 - Ubuntu 25.10 x64

**Sistema Operacional:** Ubuntu 25.10 x64  
**Versão do Manual:** 1.0  
**Data:** 22 de Fevereiro de 2026  

---

## 📋 Índice

1. [Informações Importantes](#1-informações-importantes)
2. [Acesso Inicial ao Servidor](#2-acesso-inicial-ao-servidor)
3. [Configuração de Segurança Básica](#3-configuração-de-segurança-básica)
4. [Instalação das Dependências](#4-instalação-das-dependências)
5. [Enviar Projeto para o Servidor](#5-enviar-projeto-para-o-servidor)
6. [Configurar Backend Python (FastAPI)](#6-configurar-backend-python-fastapi)
7. [Configurar Frontend React (Build)](#7-configurar-frontend-react-build)
8. [Configurar Nginx (Servidor Web)](#8-configurar-nginx-servidor-web)
9. [Configurar DNS e SSL/HTTPS](#9-configurar-dns-e-ssl-https)
10. [Serviço Automático para o Backend](#10-serviço-automático-para-o-backend)
11. [Configurar Firewall](#11-configurar-firewall)
12. [Validação Final](#12-validação-final)
13. [Comandos de Manutenção](#13-comandos-de-manutenção)

---

## 1. Informações Importantes

### ✅ Pré-requisitos:

- Servidor Ubuntu 25.10 x64 (DigitalOcean, AWS, Azure, etc.)
- Acesso root via SSH
- IP público do servidor
- Domínio registrado (ex: `terminal404.com.br`)
- Email Gmail configurado: `terminallocal404@gmail.com`
- Senha de app do Gmail: `ldyq ybjn wbzp afnr`

### 📦 O que será instalado:

- **Node.js 20.x** (Frontend React)
- **Python 3.11+** (Backend FastAPI)
- **Nginx** (Servidor web e proxy reverso)
- **Certbot** (Certificado SSL gratuito)
- **UFW** (Firewall)

### ⏱️ Tempo estimado: 30-45 minutos

---

## 2. Acesso Inicial ao Servidor

### Passo 2.1: Conectar via SSH

**No Linux/Mac:**
```bash
ssh root@SEU_IP_SERVIDOR
# Exemplo: ssh root@165.227.123.45
```

**No Windows (PowerShell):**
```powershell
ssh root@SEU_IP_SERVIDOR
```

**No Windows (PuTTY):**
- Host Name: `SEU_IP_SERVIDOR`
- Port: `22`
- Connection Type: `SSH`
- Username: `root`

### Passo 2.2: Atualizar o Sistema

```bash
# Atualizar repositórios
apt update

# Atualizar todos os pacotes
apt upgrade -y

# Instalar pacotes essenciais
apt install -y curl wget git build-essential software-properties-common

# Reiniciar o servidor
reboot
```

⏱️ **Aguarde 1-2 minutos e reconecte via SSH**

---

## 3. Configuração de Segurança Básica

### Passo 3.1: Criar Usuário Não-Root

```bash
# Criar usuário para a aplicação
adduser terminal404
# Digite uma senha forte e pressione Enter nas demais perguntas

# Adicionar ao grupo sudo
usermod -aG sudo terminal404

# Testar sudo
su - terminal404
sudo ls /root
# Digite a senha do usuário terminal404
# Se listar arquivos, está OK
```

### Passo 3.2: Configurar SSH Básico

```bash
# Voltar para root
exit

# Permitir SSH para o novo usuário
echo "AllowUsers root terminal404" >> /etc/ssh/sshd_config

# Reiniciar SSH
systemctl restart ssh
```

### Passo 3.3: Logar com o Novo Usuário

```bash
# Sair do root
exit

# Conectar com o novo usuário
ssh terminal404@SEU_IP_SERVIDOR
```

**✅ A partir de agora, use sempre o usuário `terminal404`**

---

## 4. Instalação das Dependências

### Passo 4.1: Instalar Node.js 20.x

```bash
# Adicionar repositório oficial do Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js e npm
sudo apt install -y nodejs

# Verificar versão
node --version
# Saída esperada: v20.x.x

npm --version
# Saída esperada: 10.x.x
```

### Passo 4.2: Instalar Python 3.11+

```bash
# Instalar Python 3 e ferramentas
sudo apt install -y python3 python3-pip python3-venv python3-dev

# Verificar versão
python3 --version
# Saída esperada: Python 3.11 ou superior

pip3 --version
```

### Passo 4.3: Instalar Nginx

```bash
# Instalar Nginx
sudo apt install -y nginx

# Iniciar e habilitar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar status
sudo systemctl status nginx
# Pressione 'q' para sair
```

**✅ Teste:** Acesse `http://SEU_IP_SERVIDOR` no navegador  
Deve aparecer: "Welcome to nginx!"

### Passo 4.4: Instalar Certbot (SSL)

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx
```

---

## 5. Enviar Projeto para o Servidor

### Passo 5.1: Criar Estrutura de Diretórios

```bash
# Criar diretório do projeto
sudo mkdir -p /var/www/terminal404

# Dar permissão ao usuário
sudo chown -R terminal404:terminal404 /var/www/terminal404

# Navegar para o diretório
cd /var/www/terminal404
```

### Passo 5.2: Enviar Arquivos do Projeto

**Opção A: Upload via SCP (Do seu computador local)**

```bash
# No seu computador (Linux/Mac/Windows PowerShell):

# Enviar backend
scp -r ./backend terminal404@SEU_IP:/var/www/terminal404/

# Enviar frontend
scp -r ./src terminal404@SEU_IP:/var/www/terminal404/

# Enviar arquivos de configuração
scp package.json terminal404@SEU_IP:/var/www/terminal404/
scp package-lock.json terminal404@SEU_IP:/var/www/terminal404/
scp vite.config.ts terminal404@SEU_IP:/var/www/terminal404/
scp tsconfig.json terminal404@SEU_IP:/var/www/terminal404/
scp tsconfig.app.json terminal404@SEU_IP:/var/www/terminal404/
scp tsconfig.node.json terminal404@SEU_IP:/var/www/terminal404/
scp index.html terminal404@SEU_IP:/var/www/terminal404/

# Enviar imports (se houver)
scp -r ./src/imports terminal404@SEU_IP:/var/www/terminal404/src/
scp -r ./src/styles terminal404@SEU_IP:/var/www/terminal404/src/
```

**Opção B: Usando Git (Recomendado)**

```bash
# No servidor:
cd /var/www/terminal404

# Se você tem repositório GitHub/GitLab
git clone https://github.com/SEU_USUARIO/terminal404.git .

# Ou inicializar Git e configurar
git init
git remote add origin https://github.com/SEU_USUARIO/terminal404.git
git pull origin main
```

### Passo 5.3: Verificar Estrutura

```bash
# Verificar arquivos enviados
cd /var/www/terminal404
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

## 6. Configurar Backend Python (FastAPI)

### Passo 6.1: Criar Ambiente Virtual Python

```bash
# Navegar para o backend
cd /var/www/terminal404/backend

# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate

# Seu prompt deve mudar para: (venv) terminal404@...
```

### Passo 6.2: Instalar Dependências Python

```bash
# Instalar todas as dependências
pip install fastapi uvicorn python-multipart pydantic[email] python-dotenv slowapi

# Verificar instalação
pip list
```

### Passo 6.3: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env
nano /var/www/terminal404/backend/.env
```

**Cole o seguinte conteúdo:**

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=terminallocal404@gmail.com
SMTP_PASSWORD=ldyq ybjn wbzp afnr
SMTP_RECIPIENT=terminallocal404@gmail.com

# Security
ALLOWED_ORIGINS=https://terminal404.com.br,https://www.terminal404.com.br,http://localhost:5173

# Server
HOST=0.0.0.0
PORT=8000
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 6.4: Testar o Backend

```bash
# Ativar ambiente virtual (se não estiver)
source /var/www/terminal404/backend/venv/bin/activate

# Rodar servidor
python main.py
```

**Saída esperada:**
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Testar em outro terminal SSH:**
```bash
# Abrir nova conexão SSH
ssh terminal404@SEU_IP_SERVIDOR

# Testar API
curl http://localhost:8000/api/health

# Deve retornar:
# {"status":"online","message":"Terminal_404 API Running"}
```

**Parar o servidor:** Volte ao terminal anterior e pressione `Ctrl + C`

---

## 7. Configurar Frontend React (Build)

### Passo 7.1: Instalar Dependências Node.js

```bash
# Navegar para o diretório principal
cd /var/www/terminal404

# Instalar dependências
npm install
```

### Passo 7.2: Atualizar URLs da API

**Editar ContactPage.tsx:**
```bash
nano /var/www/terminal404/src/app/pages/ContactPage.tsx
```

**Encontre a linha 35 e altere:**
```typescript
// DE:
const response = await fetch('http://localhost:8000/api/contact', {

// PARA:
const response = await fetch('/api/contact', {
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

**Editar RequestPage.tsx:**
```bash
nano /var/www/terminal404/src/app/pages/RequestPage.tsx
```

**Encontre a linha 56 e altere:**
```typescript
// DE:
const response = await fetch('http://localhost:8000/api/project-request', {

// PARA:
const response = await fetch('/api/project-request', {
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 7.3: Fazer Build de Produção

```bash
# Navegar para o diretório principal
cd /var/www/terminal404

# Fazer build
npm run build
```

**✅ Se tudo correr bem:**
```
✓ built in 15s
```

**Verificar pasta dist criada:**
```bash
ls -la dist/
# Deve mostrar: index.html, assets/, etc.
```

---

## 8. Configurar Nginx (Servidor Web)

### Passo 8.1: Criar Configuração do Site

```bash
# Criar arquivo de configuração
sudo nano /etc/nginx/sites-available/terminal404
```

**Cole a seguinte configuração:**

```nginx
server {
    listen 80;
    listen [::]:80;
    
    # Altere para seu domínio
    server_name terminal404.com.br www.terminal404.com.br;
    
    # Logs
    access_log /var/log/nginx/terminal404_access.log;
    error_log /var/log/nginx/terminal404_error.log;
    
    # Frontend React (arquivos estáticos)
    root /var/www/terminal404/dist;
    index index.html;
    
    # Servir frontend
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Backend Python (proxy reverso)
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
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

**⚠️ IMPORTANTE:** Altere `terminal404.com.br` para o **seu domínio real**

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 8.2: Ativar Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/

# Remover configuração padrão
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Deve aparecer:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Passo 8.3: Reiniciar Nginx

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar status
sudo systemctl status nginx
```

**✅ Teste:** Acesse `http://SEU_IP_SERVIDOR` no navegador  
Deve aparecer o site Terminal_404

---

## 9. Configurar DNS e SSL/HTTPS

### Passo 9.1: Configurar DNS

**No painel do seu provedor de domínio (Registro.br, GoDaddy, etc.):**

Adicione os seguintes registros DNS:

| Tipo | Nome/Host | Valor/IP | TTL |
|------|-----------|----------|-----|
| A | @ | SEU_IP_SERVIDOR | 3600 |
| A | www | SEU_IP_SERVIDOR | 3600 |

**Exemplo:**
```
Tipo: A
Nome: @
Valor: 165.227.123.45
TTL: 3600

Tipo: A
Nome: www
Valor: 165.227.123.45
TTL: 3600
```

**⏱️ Aguarde 5-30 minutos para propagação DNS**

**Testar propagação:**
```bash
# No servidor ou no seu computador
nslookup terminal404.com.br
nslookup www.terminal404.com.br

# Deve retornar o IP do seu servidor
```

### Passo 9.2: Obter Certificado SSL (Let's Encrypt)

**⚠️ Só execute após o DNS estar propagado!**

```bash
# Obter certificado SSL gratuito
sudo certbot --nginx -d terminal404.com.br -d www.terminal404.com.br
```

**Perguntas que aparecerão:**

1. **Email:** Digite `terminallocal404@gmail.com`
2. **Termos de serviço:** Digite `A` (Agree)
3. **Compartilhar email:** Digite `N` (No)
4. **Redirect HTTP → HTTPS:** Digite `2` (Redirect)

**✅ Se tudo correr bem:**
```
Successfully received certificate.
Congratulations! You have successfully enabled HTTPS on https://terminal404.com.br
```

### Passo 9.3: Testar Renovação Automática

```bash
# Testar renovação (não renova de verdade, apenas testa)
sudo certbot renew --dry-run

# Deve aparecer:
# Congratulations, all simulated renewals succeeded
```

**✅ O Certbot já configura renovação automática!**

---

## 10. Serviço Automático para o Backend

### Passo 10.1: Criar Serviço Systemd

```bash
# Criar arquivo de serviço
sudo nano /etc/systemd/system/terminal404-backend.service
```

**Cole a seguinte configuração:**

```ini
[Unit]
Description=Terminal_404 Backend API (FastAPI)
After=network.target

[Service]
Type=simple
User=terminal404
WorkingDirectory=/var/www/terminal404/backend
Environment="PATH=/var/www/terminal404/backend/venv/bin"

# Matar processos antigos na porta 8000 antes de iniciar
ExecStartPre=/bin/sh -c 'fuser -k 8000/tcp || true'
ExecStartPre=/bin/sleep 2

# Iniciar o backend
ExecStart=/var/www/terminal404/backend/venv/bin/python main.py

# Reiniciar automaticamente se falhar
Restart=always
RestartSec=10

# Logs
StandardOutput=append:/var/log/terminal404-backend.log
StandardError=append:/var/log/terminal404-backend-error.log

[Install]
WantedBy=multi-user.target
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 10.2: Ativar e Iniciar Serviço

```bash
# Criar arquivos de log
sudo touch /var/log/terminal404-backend.log
sudo touch /var/log/terminal404-backend-error.log
sudo chown terminal404:terminal404 /var/log/terminal404-backend*.log

# Recarregar systemd
sudo systemctl daemon-reload

# Ativar serviço (inicia automaticamente no boot)
sudo systemctl enable terminal404-backend

# Iniciar serviço agora
sudo systemctl start terminal404-backend

# Verificar status
sudo systemctl status terminal404-backend
```

**✅ Deve mostrar:** `Active: active (running)`

**Testar API:**
```bash
curl https://terminal404.com.br/api/health

# Deve retornar:
# {"status":"online","message":"Terminal_404 API Running"}
```

---

## 11. Configurar Firewall

### Passo 11.1: Configurar UFW

```bash
# Permitir SSH (IMPORTANTE! Não se tranque fora)
sudo ufw allow OpenSSH

# Permitir HTTP
sudo ufw allow 'Nginx HTTP'

# Permitir HTTPS
sudo ufw allow 'Nginx HTTPS'

# Ativar firewall
sudo ufw enable

# Confirme: y
```

### Passo 11.2: Verificar Firewall

```bash
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

## 12. Validação Final

### ✅ Checklist de Verificação:

**1. Site acessível via HTTPS:**
```bash
# Teste no navegador:
https://terminal404.com.br
https://www.terminal404.com.br
```

**2. Redirecionamento HTTP → HTTPS:**
```bash
# http:// deve redirecionar para https://
http://terminal404.com.br
```

**3. API funcionando:**
```bash
curl https://terminal404.com.br/api/health
```

**4. Backend rodando automaticamente:**
```bash
sudo systemctl status terminal404-backend
# Deve estar: active (running)
```

**5. Nginx rodando:**
```bash
sudo systemctl status nginx
# Deve estar: active (running)
```

**6. Testar Formulário de Contato:**
- Acesse: `https://terminal404.com.br/contato`
- Preencha e envie
- Verifique email em `terminallocal404@gmail.com`

**7. Testar Formulário de Solicitação:**
- Acesse: `https://terminal404.com.br/solicitacao`
- Preencha e envie
- Verifique email em `terminallocal404@gmail.com`

---

## 13. Comandos de Manutenção

### Ver Logs do Backend

```bash
# Logs em tempo real
sudo journalctl -u terminal404-backend -f

# Últimas 100 linhas
sudo journalctl -u terminal404-backend -n 100

# Ver arquivo de log
sudo tail -f /var/log/terminal404-backend.log
```

### Ver Logs do Nginx

```bash
# Erros
sudo tail -f /var/log/nginx/terminal404_error.log

# Acessos
sudo tail -f /var/log/nginx/terminal404_access.log
```

### Reiniciar Serviços

```bash
# Backend
sudo systemctl restart terminal404-backend

# Nginx
sudo systemctl restart nginx

# Ver status
sudo systemctl status terminal404-backend
sudo systemctl status nginx
```

### Atualizar o Site

```bash
# 1. Conectar ao servidor
ssh terminal404@SEU_IP

# 2. Ir para o projeto
cd /var/www/terminal404

# 3. Atualizar código (Git)
git pull

# 4. Frontend: Reinstalar dependências (se necessário)
npm install

# 5. Frontend: Rebuild
npm run build

# 6. Backend: Reiniciar
sudo systemctl restart terminal404-backend

# 7. Nginx: Recarregar
sudo systemctl reload nginx
```

### Backup do Projeto

```bash
# Criar backup
cd ~
sudo tar -czf terminal404-backup-$(date +%Y%m%d).tar.gz /var/www/terminal404

# Listar backups
ls -lh terminal404-backup-*.tar.gz

# Baixar para seu computador (do seu PC local):
scp terminal404@SEU_IP:~/terminal404-backup-*.tar.gz ./
```

### Monitorar Recursos do Servidor

```bash
# Ver uso de CPU/RAM
htop
# Pressione 'q' para sair

# Ver espaço em disco
df -h

# Ver memória
free -h

# Ver processos Python
ps aux | grep python

# Ver processos Nginx
ps aux | grep nginx
```

---

## 🎉 Parabéns! Servidor Configurado com Sucesso!

### 🌐 Seu site está no ar em:
- **URL Principal:** https://terminal404.com.br
- **API Health:** https://terminal404.com.br/api/health
- **Contato:** https://terminal404.com.br/contato
- **Solicitação:** https://terminal404.com.br/solicitacao

### 🔐 Segurança:
- ✅ SSL/HTTPS ativo (Let's Encrypt)
- ✅ Firewall configurado (UFW)
- ✅ Usuário não-root
- ✅ Serviços isolados

### 🚀 Serviços Automáticos:
- ✅ Backend inicia automaticamente no boot
- ✅ Nginx inicia automaticamente
- ✅ Certificado SSL renova automaticamente

### 📧 Emails Funcionando:
- ✅ Formulário de contato → `terminallocal404@gmail.com`
- ✅ Formulário de solicitação → `terminallocal404@gmail.com`

---

## 🆘 Problemas Comuns

### ❌ Site não carrega
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### ❌ Erro 502 Bad Gateway
```bash
sudo systemctl status terminal404-backend
sudo journalctl -u terminal404-backend -n 50
sudo systemctl restart terminal404-backend
```

### ❌ Formulários não enviam
```bash
# Verificar logs do backend
sudo tail -f /var/log/terminal404-backend.log

# Verificar arquivo .env
cat /var/www/terminal404/backend/.env

# Testar manualmente
curl -X POST https://terminal404.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","message":"Teste de envio"}'
```

### ❌ SSL não funciona
```bash
# Renovar certificado
sudo certbot renew
sudo systemctl reload nginx

# Ver status do certificado
sudo certbot certificates
```

---

**Desenvolvido por Terminal_404**  
**Manual v1.0** | Ubuntu 25.10 x64 | 22/02/2026