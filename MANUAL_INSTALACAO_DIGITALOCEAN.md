# 📘 Manual Completo de Instalação - Terminal_404
## Deployment no DigitalOcean do Zero

**Versão:** 1.0  
**Última atualização:** 22 de Fevereiro de 2026  
**Sistema:** Ubuntu 22.04 LTS  

---

## 📋 Índice

1. [Pré-requisitos](#1-pré-requisitos)
2. [Criar Droplet DigitalOcean](#2-criar-droplet-digitalocean)
3. [Configuração Inicial do Servidor](#3-configuração-inicial-do-servidor)
4. [Instalar Dependências do Sistema](#4-instalar-dependências-do-sistema)
5. [Configurar o Backend Python](#5-configurar-o-backend-python)
6. [Configurar o Frontend React](#6-configurar-o-frontend-react)
7. [Configurar Nginx](#7-configurar-nginx)
8. [Configurar SSL/HTTPS](#8-configurar-ssl-https)
9. [Configurar Serviços Automáticos](#9-configurar-serviços-automáticos)
10. [Configurar Firewall](#10-configurar-firewall)
11. [Testes Finais](#11-testes-finais)
12. [Manutenção e Troubleshooting](#12-manutenção-e-troubleshooting)

---

## 1. Pré-requisitos

### O que você precisa ter:

- ✅ Conta na DigitalOcean ([criar conta](https://www.digitalocean.com))
- ✅ Domínio registrado (ex: `terminal404.com.br`)
- ✅ Acesso ao painel de DNS do domínio
- ✅ Código do projeto Terminal_404
- ✅ Email `terminallocal404@gmail.com` configurado com senha de app
- ✅ Cliente SSH (terminal no Linux/Mac ou PuTTY no Windows)

### Custos Estimados:
- **Droplet Básico:** $6/mês (1 vCPU, 1GB RAM, 25GB SSD)
- **Droplet Recomendado:** $12/mês (1 vCPU, 2GB RAM, 50GB SSD)

---

## 2. Criar Droplet DigitalOcean

### Passo 2.1: Acessar o Painel DigitalOcean

1. Faça login em [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Clique em **"Create"** → **"Droplets"**

### Passo 2.2: Escolher Configurações

**Distribuição:**
- Escolha: **Ubuntu 22.04 LTS (x64)**

**Plano:**
- Escolha: **Basic** ($12/mês - 2GB RAM recomendado)
- Ou: **Basic** ($6/mês - 1GB RAM mínimo)

**Datacenter:**
- Escolha: **New York** ou **São Paulo** (mais próximo do Brasil)

**Autenticação:**
- ✅ Marque: **SSH Key** (mais seguro)
- Ou: **Password** (anote a senha enviada por email)

**Hostname:**
- Defina: `terminal404-server`

### Passo 2.3: Criar Droplet

1. Clique em **"Create Droplet"**
2. Aguarde 1-2 minutos até o servidor ser criado
3. **Anote o IP público** (ex: `165.227.123.45`)

---

## 3. Configuração Inicial do Servidor

### Passo 3.1: Conectar via SSH

**No Linux/Mac:**
```bash
ssh root@SEU_IP_AQUI
# Exemplo: ssh root@165.227.123.45
```

**No Windows (usando PuTTY):**
- Host: `SEU_IP_AQUI`
- Port: `22`
- Username: `root`

### Passo 3.2: Atualizar o Sistema

```bash
# Atualizar lista de pacotes
apt update

# Atualizar todos os pacotes
apt upgrade -y

# Reiniciar se necessário
reboot
```

**⏱️ Aguarde 1 minuto e reconecte via SSH**

### Passo 3.3: Criar Usuário Não-Root (Segurança)

```bash
# Criar novo usuário
adduser terminal404

# Adicionar ao grupo sudo
usermod -aG sudo terminal404

# Configurar firewall básico
ufw allow OpenSSH
ufw enable
```

### Passo 3.4: Logar com Novo Usuário

```bash
# Sair do root
exit

# Conectar com novo usuário
ssh terminal404@SEU_IP_AQUI
```

---

## 4. Instalar Dependências do Sistema

### Passo 4.1: Instalar Node.js 20.x

```bash
# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js e npm
sudo apt install -y nodejs

# Verificar instalação
node --version  # Deve mostrar v20.x.x
npm --version   # Deve mostrar 10.x.x
```

### Passo 4.2: Instalar Python 3.11+

```bash
# Instalar Python e pip
sudo apt install -y python3 python3-pip python3-venv

# Verificar instalação
python3 --version  # Deve mostrar Python 3.10 ou superior
pip3 --version
```

### Passo 4.3: Instalar Nginx

```bash
# Instalar Nginx
sudo apt install -y nginx

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar status
sudo systemctl status nginx
```

### Passo 4.4: Instalar Git

```bash
# Instalar Git
sudo apt install -y git

# Verificar instalação
git --version
```

### Passo 4.5: Instalar Certbot (SSL)

```bash
# Instalar Certbot para SSL
sudo apt install -y certbot python3-certbot-nginx
```

---

## 5. Configurar o Backend Python

### Passo 5.1: Criar Diretórios do Projeto

```bash
# Criar diretório principal
sudo mkdir -p /var/www/terminal404
sudo chown -R $USER:$USER /var/www/terminal404

# Navegar para o diretório
cd /var/www/terminal404
```

### Passo 5.2: Clonar/Enviar o Projeto

**Opção A: Via Git (Recomendado)**
```bash
# Se você tem o projeto no GitHub/GitLab
git clone https://github.com/SEU_USUARIO/terminal404.git .
```

**Opção B: Via SCP (Upload Manual)**
```bash
# No seu computador local (não no servidor):
# Linux/Mac:
scp -r ./backend terminal404@SEU_IP:/var/www/terminal404/
scp -r ./src terminal404@SEU_IP:/var/www/terminal404/
scp package.json terminal404@SEU_IP:/var/www/terminal404/
scp vite.config.ts terminal404@SEU_IP:/var/www/terminal404/
scp tsconfig.json terminal404@SEU_IP:/var/www/terminal404/
scp index.html terminal404@SEU_IP:/var/www/terminal404/

# Windows (PowerShell):
scp -r .\backend terminal404@SEU_IP:/var/www/terminal404/
scp -r .\src terminal404@SEU_IP:/var/www/terminal404/
# ... (mesmos comandos acima)
```

### Passo 5.3: Configurar Backend Python

```bash
# Navegar para o backend
cd /var/www/terminal404/backend

# Criar ambiente virtual Python
python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate

# Instalar dependências
pip install fastapi uvicorn python-multipart pydantic[email] python-dotenv slowapi
```

### Passo 5.4: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env para o backend
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
ALLOWED_ORIGINS=https://terminal404.com.br,https://www.terminal404.com.br

# Server
HOST=0.0.0.0
PORT=8000
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 5.5: Testar o Backend

```bash
# Ativar ambiente virtual (se não estiver ativado)
source /var/www/terminal404/backend/venv/bin/activate

# Rodar backend
python main.py
```

**Teste em outro terminal:**
```bash
curl http://localhost:8000/health
# Deve retornar: {"status":"online","message":"Terminal_404 API Running"}
```

**Parar o servidor:** `Ctrl + C`

---

## 6. Configurar o Frontend React

### Passo 6.1: Instalar Dependências

```bash
# Navegar para o diretório principal
cd /var/www/terminal404

# Instalar dependências do Node.js
npm install
```

### Passo 6.2: Atualizar API URL (Produção)

```bash
# Editar arquivo de configuração
nano /var/www/terminal404/src/config.ts
```

**Criar o arquivo com o seguinte conteúdo:**
```typescript
export const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://terminal404.com.br/api'
    : 'http://localhost:8000',
};
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 6.3: Atualizar URLs nos Formulários

**Editar ContactPage.tsx:**
```bash
nano /var/www/terminal404/src/app/pages/ContactPage.tsx
```

**Linha 35 - Alterar de:**
```typescript
const response = await fetch('http://localhost:8000/api/contact', {
```

**Para:**
```typescript
const response = await fetch('/api/contact', {
```

**Editar RequestPage.tsx:**
```bash
nano /var/www/terminal404/src/app/pages/RequestPage.tsx
```

**Linha 56 - Alterar de:**
```typescript
const response = await fetch('http://localhost:8000/api/project-request', {
```

**Para:**
```typescript
const response = await fetch('/api/project-request', {
```

### Passo 6.4: Build do Frontend

```bash
# Navegar para o diretório principal
cd /var/www/terminal404

# Fazer build de produção
npm run build
```

**✅ Se tudo correr bem, você verá uma pasta `/var/www/terminal404/dist` criada**

---

## 7. Configurar Nginx

### Passo 7.1: Criar Configuração do Nginx

```bash
# Criar arquivo de configuração
sudo nano /etc/nginx/sites-available/terminal404
```

**Cole a seguinte configuração:**
```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name terminal404.com.br www.terminal404.com.br;
    
    # Logs
    access_log /var/log/nginx/terminal404_access.log;
    error_log /var/log/nginx/terminal404_error.log;
    
    # Frontend React (build estático)
    root /var/www/terminal404/dist;
    index index.html;
    
    # Servir arquivos estáticos do frontend
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=31536000, immutable";
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
    
    # Segurança - Ocultar versão do Nginx
    server_tokens off;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;
}
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 7.2: Ativar Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/

# Remover configuração padrão
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
sudo nginx -t

# Se estiver OK, recarregar Nginx
sudo systemctl reload nginx
```

### Passo 7.3: Configurar DNS (No Painel do Domínio)

**Acesse o painel DNS do seu domínio e adicione:**

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | @ | SEU_IP_DO_DROPLET | 3600 |
| A | www | SEU_IP_DO_DROPLET | 3600 |

**Exemplo:**
```
A    @     165.227.123.45    3600
A    www   165.227.123.45    3600
```

**⏱️ Aguarde 5-30 minutos para propagação DNS**

---

## 8. Configurar SSL/HTTPS

### Passo 8.1: Obter Certificado SSL

```bash
# Obter certificado SSL gratuito (Let's Encrypt)
sudo certbot --nginx -d terminal404.com.br -d www.terminal404.com.br
```

**Responda as perguntas:**
1. Email: `terminallocal404@gmail.com`
2. Termos: `A` (Agree)
3. Compartilhar email: `N` (No)
4. Redirect HTTP → HTTPS: `2` (Redirect)

### Passo 8.2: Testar Renovação Automática

```bash
# Testar renovação (não renova de verdade)
sudo certbot renew --dry-run
```

**✅ Se aparecer "Congratulations", está configurado corretamente!**

### Passo 8.3: Configurar Renovação Automática

```bash
# O Certbot já configura auto-renovação via cron/systemd
# Verificar timer:
sudo systemctl status certbot.timer
```

---

## 9. Configurar Serviços Automáticos

### Passo 9.1: Criar Serviço Systemd para o Backend

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
ExecStart=/var/www/terminal404/backend/venv/bin/python main.py
Restart=always
RestartSec=10

# Logs
StandardOutput=append:/var/log/terminal404-backend.log
StandardError=append:/var/log/terminal404-backend-error.log

[Install]
WantedBy=multi-user.target
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 9.2: Ativar e Iniciar Serviço

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

**✅ Deve mostrar "active (running)"**

### Passo 9.3: Comandos Úteis do Serviço

```bash
# Ver status
sudo systemctl status terminal404-backend

# Parar serviço
sudo systemctl stop terminal404-backend

# Reiniciar serviço
sudo systemctl restart terminal404-backend

# Ver logs em tempo real
sudo journalctl -u terminal404-backend -f

# Ver logs do arquivo
sudo tail -f /var/log/terminal404-backend.log
```

---

## 10. Configurar Firewall

### Passo 10.1: Configurar UFW

```bash
# Permitir SSH
sudo ufw allow OpenSSH

# Permitir HTTP
sudo ufw allow 'Nginx HTTP'

# Permitir HTTPS
sudo ufw allow 'Nginx HTTPS'

# Ativar firewall
sudo ufw enable

# Verificar status
sudo ufw status
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

## 11. Testes Finais

### Passo 11.1: Testar Backend

```bash
# Teste 1: Health Check
curl https://terminal404.com.br/api/health

# Deve retornar:
# {"status":"online","message":"Terminal_404 API Running"}

# Teste 2: Ver logs do backend
sudo tail -f /var/log/terminal404-backend.log
```

### Passo 11.2: Testar Frontend

**No navegador, acesse:**
- ✅ `https://terminal404.com.br` → Deve carregar o site
- ✅ `https://www.terminal404.com.br` → Deve redirecionar para https://terminal404.com.br
- ✅ `http://terminal404.com.br` → Deve redirecionar para HTTPS

### Passo 11.3: Testar Formulários

1. **Teste Formulário de Contato:**
   - Acesse: `https://terminal404.com.br/contato`
   - Preencha e envie
   - Verifique se recebeu email em `terminallocal404@gmail.com`

2. **Teste Formulário de Solicitação:**
   - Acesse: `https://terminal404.com.br/solicitacao`
   - Preencha e envie
   - Verifique se recebeu email em `terminallocal404@gmail.com`

### Passo 11.4: Testar SSL

**Verificar segurança SSL:**
- Acesse: [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/)
- Digite: `terminal404.com.br`
- Aguarde análise
- **Resultado esperado:** Nota A ou A+

---

## 12. Manutenção e Troubleshooting

### 12.1: Comandos de Diagnóstico

```bash
# Ver logs do Nginx
sudo tail -f /var/log/nginx/terminal404_error.log

# Ver logs do Backend
sudo journalctl -u terminal404-backend -f

# Ver status de todos os serviços
sudo systemctl status nginx
sudo systemctl status terminal404-backend

# Ver uso de memória/CPU
htop

# Ver processos Python
ps aux | grep python

# Ver portas em uso
sudo netstat -tlnp | grep -E '(80|443|8000)'
```

### 12.2: Problemas Comuns

#### ❌ Problema: Site não carrega

**Solução:**
```bash
# Verificar se Nginx está rodando
sudo systemctl status nginx

# Se não estiver, iniciar
sudo systemctl start nginx

# Verificar erros
sudo nginx -t
```

#### ❌ Problema: Erro 502 Bad Gateway

**Causa:** Backend Python não está rodando

**Solução:**
```bash
# Verificar backend
sudo systemctl status terminal404-backend

# Ver logs
sudo journalctl -u terminal404-backend -n 50

# Reiniciar backend
sudo systemctl restart terminal404-backend
```

#### ❌ Problema: Formulários não enviam emails

**Verificar:**
1. Senha de app do Gmail está correta no `/var/www/terminal404/backend/.env`
2. Backend está recebendo requisições:
```bash
sudo tail -f /var/log/terminal404-backend.log
```

#### ❌ Problema: Certificado SSL expirou

**Solução:**
```bash
# Renovar certificado manualmente
sudo certbot renew

# Recarregar Nginx
sudo systemctl reload nginx
```

### 12.3: Atualizar o Site

**Quando você fizer alterações no código:**

```bash
# Conectar via SSH
ssh terminal404@SEU_IP

# Navegar para o projeto
cd /var/www/terminal404

# Atualizar código (se usar Git)
git pull

# Frontend: Rebuild
npm install
npm run build

# Backend: Reiniciar serviço
sudo systemctl restart terminal404-backend

# Recarregar Nginx (se necessário)
sudo systemctl reload nginx
```

### 12.4: Backup do Projeto

```bash
# Criar backup completo
sudo tar -czf terminal404-backup-$(date +%Y%m%d).tar.gz /var/www/terminal404

# Listar backups
ls -lh terminal404-backup-*.tar.gz

# Baixar backup para seu computador (no seu PC local):
scp terminal404@SEU_IP:/home/terminal404/terminal404-backup-*.tar.gz ./
```

### 12.5: Monitoramento

**Instalar ferramenta de monitoramento (opcional):**
```bash
# Instalar htop para monitorar recursos
sudo apt install htop

# Executar
htop
```

---

## 🎉 Conclusão

**Parabéns! Seu site Terminal_404 está no ar!**

### ✅ Checklist Final:

- [x] Droplet DigitalOcean criado e configurado
- [x] Node.js, Python, Nginx instalados
- [x] Backend Python rodando com systemd
- [x] Frontend React compilado e servido
- [x] Nginx configurado como proxy reverso
- [x] SSL/HTTPS ativo com Let's Encrypt
- [x] Firewall UFW configurado
- [x] DNS apontando para o servidor
- [x] Formulários testados e funcionando
- [x] Emails sendo enviados corretamente

### 🔗 Links Importantes:

- **Site:** https://terminal404.com.br
- **API Health:** https://terminal404.com.br/api/health
- **Email:** terminallocal404@gmail.com
- **Servidor:** terminal404@SEU_IP

### 📞 Suporte:

Se tiver problemas, verifique:
1. Logs do Nginx: `/var/log/nginx/terminal404_error.log`
2. Logs do Backend: `sudo journalctl -u terminal404-backend -f`
3. Status dos serviços: `sudo systemctl status nginx terminal404-backend`

---

**Desenvolvido por Terminal_404**  
**Versão:** 1.0 | **Data:** 22/02/2026
