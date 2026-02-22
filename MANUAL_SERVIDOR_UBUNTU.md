# 🚀 Manual Completo - Deploy Terminal_404
## Ubuntu 25.10 x64 | Frontend + Backend Juntos

**Versão:** 2.0 - Deploy Automatizado  
**Data:** 22 de Fevereiro de 2026  
**Sistema:** Ubuntu 25.10 x64

---

## 📋 O Que Será Instalado

✅ **Frontend React** (Vite) → Servido pelo Nginx  
✅ **Backend FastAPI** (Python) → Proxy reverso via Nginx  
✅ **Nginx** → Servidor web + proxy  
✅ **SSL/HTTPS** → Certificado Let's Encrypt  
✅ **Systemd** → Gerenciamento automático  
✅ **Firewall UFW** → Segurança básica

**⏱️ Tempo estimado:** 20-30 minutos

---

## 🎯 Informações Necessárias

Antes de começar, tenha em mãos:

- **IP do Servidor:** Ex: `165.227.123.45`
- **Domínio:** Ex: `terminal404.com.br`
- **Email:** `terminallocal404@gmail.com`
- **Senha de App Gmail:** `ldyq ybjn wbzp afnr`

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
apt install -y curl wget git build-essential software-properties-common

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

## ⚙️ PARTE 2: Instalação Automática das Dependências

### 2.1 - Instalar Node.js 20.x

```bash
# Adicionar repositório oficial
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar
node --version  # Deve ser v20.x.x
npm --version   # Deve ser 10.x.x
```

### 2.2 - Instalar Python 3.11+

```bash
# Instalar Python
sudo apt install -y python3 python3-pip python3-venv python3-dev

# Verificar
python3 --version  # Deve ser 3.11+
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

### 2.5 - Instalar Ferramentas Auxiliares

```bash
# Instalar htop e psmisc (para fuser)
sudo apt install -y htop psmisc
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

### 3.2 - Enviar Arquivos do Projeto

**OPÇÃO A: Via SCP (Do seu computador local)**

```bash
# No seu computador (Linux/Mac/Windows PowerShell):

# Criar arquivo compactado do projeto (exclui node_modules)
cd /caminho/do/projeto
tar --exclude='node_modules' --exclude='dist' --exclude='backend/venv' \
    -czf terminal404.tar.gz .

# Enviar para o servidor
scp terminal404.tar.gz terminal404@SEU_IP:/var/www/terminal404/

# No servidor, descompactar:
ssh terminal404@SEU_IP
cd /var/www/terminal404
tar -xzf terminal404.tar.gz
rm terminal404.tar.gz
```

**OPÇÃO B: Via Git (Recomendado)**

```bash
# No servidor:
cd /var/www/terminal404

# Clonar repositório
git clone https://github.com/SEU_USUARIO/terminal404.git .

# OU se já tem Git configurado:
git pull origin main
```

### 3.3 - Verificar Estrutura

```bash
ls -la /var/www/terminal404

# Deve aparecer:
# backend/
# src/
# package.json
# vite.config.ts
# index.html
# etc.
```

---

## 🔧 PARTE 4: Configurar Backend Python

### 4.1 - Criar Ambiente Virtual

```bash
cd /var/www/terminal404/backend

# Criar venv
python3 -m venv venv

# Ativar
source venv/bin/activate
```

### 4.2 - Instalar Dependências Python

```bash
# Instalar tudo
pip install fastapi uvicorn python-multipart pydantic[email] python-dotenv slowapi

# Verificar
pip list
```

### 4.3 - Criar Arquivo .env

```bash
nano /var/www/terminal404/backend/.env
```

**Cole este conteúdo:**

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

**⚠️ IMPORTANTE:** Substitua `terminal404.com.br` pelo **seu domínio real**

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 4.4 - Testar Backend (Opcional)

```bash
# Ativar venv
source /var/www/terminal404/backend/venv/bin/activate

# Rodar
python main.py
```

**Saída esperada:**
```
🚀 Iniciando Terminal_404 API na porta 8000
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Parar:** `Ctrl + C`

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

## 🌐 PARTE 6: Configurar Nginx (Frontend + Backend Juntos)

### 6.1 - Criar Configuração

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
    
    # API Backend Python (proxy reverso para porta 8000)
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

**⚠️ ALTERE:** `terminal404.com.br` para **SEU DOMÍNIO**

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 6.2 - Ativar Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/

# Remover config padrão
sudo rm -f /etc/nginx/sites-enabled/default

# Testar
sudo nginx -t

# Deve aparecer:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 6.3 - Reiniciar Nginx

```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```

✅ **Teste:** Acesse `http://SEU_IP` → Deve aparecer o site Terminal_404

---

## 🤖 PARTE 7: Serviço Automático (Backend)

### 7.1 - Criar Serviço Systemd

```bash
sudo nano /etc/systemd/system/terminal404-backend.service
```

**Cole esta configuração:**

```ini
[Unit]
Description=Terminal_404 Backend API (FastAPI)
After=network.target

[Service]
Type=simple
User=terminal404
WorkingDirectory=/var/www/terminal404/backend
Environment="PATH=/var/www/terminal404/backend/venv/bin"

# Matar processos antigos na porta 8000 ANTES de iniciar
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

### 7.2 - Ativar e Iniciar Serviço

```bash
# Criar arquivos de log
sudo touch /var/log/terminal404-backend.log
sudo touch /var/log/terminal404-backend-error.log
sudo chown terminal404:terminal404 /var/log/terminal404-backend*.log

# Recarregar systemd
sudo systemctl daemon-reload

# Ativar (inicia no boot)
sudo systemctl enable terminal404-backend

# Iniciar agora
sudo systemctl start terminal404-backend

# Verificar status
sudo systemctl status terminal404-backend
```

**✅ Deve mostrar:** `Active: active (running)`

### 7.3 - Testar API

```bash
# Testar health check
curl http://localhost:8000/api/health

# Deve retornar:
# {"status":"online","message":"Terminal_404 API Running","timestamp":"..."}
```

---

## 🔐 PARTE 8: SSL/HTTPS (Let's Encrypt)

### 8.1 - Configurar DNS

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

### 8.2 - Obter Certificado SSL

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

### 8.3 - Testar Renovação Automática

```bash
sudo certbot renew --dry-run

# Deve aparecer:
# Congratulations, all simulated renewals succeeded
```

---

## 🔥 PARTE 9: Firewall (UFW)

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

## ✅ PARTE 10: Validação Final

### 10.1 - Checklist Completo

**✅ 1. Site no ar via HTTPS:**
```
https://terminal404.com.br
https://www.terminal404.com.br
```

**✅ 2. API funcionando:**
```bash
curl https://terminal404.com.br/api/health
```

**✅ 3. Backend rodando:**
```bash
sudo systemctl status terminal404-backend
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
# Backend
sudo systemctl status terminal404-backend

# Nginx
sudo systemctl status nginx

# Ver portas em uso
sudo ss -tulpn | grep -E ':(80|443|8000)'
```

### Logs do Backend

```bash
# Tempo real
sudo tail -f /var/log/terminal404-backend.log

# Erros
sudo tail -f /var/log/terminal404-backend-error.log

# Journalctl
sudo journalctl -u terminal404-backend -f
sudo journalctl -u terminal404-backend -n 100
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
# Backend
sudo systemctl restart terminal404-backend

# Nginx
sudo systemctl restart nginx

# Ambos de uma vez
sudo systemctl restart terminal404-backend nginx

# Ver status
sudo systemctl status terminal404-backend nginx
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

# 6. Atualizar dependências Python (se houver)
cd backend
source venv/bin/activate
pip install -r requirements.txt  # Se você criou requirements.txt
deactivate

# 7. Reiniciar tudo
sudo systemctl restart terminal404-backend
sudo systemctl reload nginx

# 8. Verificar
sudo systemctl status terminal404-backend nginx
```

### Backup Completo

```bash
# Criar backup
cd ~
sudo tar --exclude='node_modules' --exclude='backend/venv' --exclude='dist' \
  -czf terminal404-backup-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/terminal404

# Listar backups
ls -lh ~/terminal404-backup-*.tar.gz

# Baixar para seu PC (do seu computador local):
scp terminal404@SEU_IP:~/terminal404-backup-*.tar.gz ./
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

# Processos do backend
ps aux | grep python

# Processos do Nginx
ps aux | grep nginx

# Ver conexões ativas
sudo ss -tupn | grep -E ':(80|443|8000)'
```

### Resolver Problemas

**❌ Erro: Porta 8000 em uso**
```bash
# Ver o que está usando a porta
sudo ss -tulpn | grep :8000

# Matar processo específico
sudo fuser -k 8000/tcp

# Reiniciar backend
sudo systemctl restart terminal404-backend
```

**❌ Site não carrega**
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

**❌ Erro 502 Bad Gateway**
```bash
# Backend provavelmente está parado
sudo systemctl status terminal404-backend
sudo journalctl -u terminal404-backend -n 50
sudo systemctl restart terminal404-backend
```

**❌ Formulários não enviam**
```bash
# Verificar logs
sudo tail -f /var/log/terminal404-backend.log

# Verificar .env
cat /var/www/terminal404/backend/.env

# Testar API manualmente
curl -X POST https://terminal404.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","message":"Teste"}'
```

**❌ SSL não funciona**
```bash
# Renovar certificado
sudo certbot renew
sudo systemctl reload nginx

# Ver certificados instalados
sudo certbot certificates
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

# 3. Backend (se houver requirements.txt)
if [ -f backend/requirements.txt ]; then
    echo "🐍 Atualizando dependências do backend..."
    cd backend
    source venv/bin/activate
    pip install -r requirements.txt
    deactivate
    cd ..
fi

# 4. Reiniciar serviços
echo "🔄 Reiniciando backend..."
sudo systemctl restart terminal404-backend

echo "🔄 Recarregando Nginx..."
sudo systemctl reload nginx

# 5. Verificar status
echo "✅ Verificando serviços..."
sudo systemctl is-active --quiet terminal404-backend && echo -e "${GREEN}✅ Backend OK${NC}" || echo -e "${RED}❌ Backend FALHOU${NC}"
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
- ✅ Backend FastAPI (Systemd)
- ✅ SSL/HTTPS (Let's Encrypt)
- ✅ Firewall (UFW)

### 🔄 Automático:
- ✅ Backend inicia no boot
- ✅ Nginx inicia no boot
- ✅ SSL renova automaticamente
- ✅ Processos antigos são mortos antes de reiniciar

---

**Desenvolvido por Terminal_404**  
**Manual v2.0** | Ubuntu 25.10 x64 | 22/02/2026
