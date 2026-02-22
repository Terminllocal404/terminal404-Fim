# ⚡ Comandos Rápidos - Terminal_404

## 🚀 Início Rápido Local (Desenvolvimento)

```bash
# Terminal 1 - Backend Python
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn python-multipart pydantic[email] python-dotenv slowapi
python main.py

# Terminal 2 - Frontend React
npm install
npm run dev
```

**Acessar:** http://localhost:5173

---

## 🌐 Deployment DigitalOcean

### Conectar via SSH
```bash
ssh terminal404@SEU_IP
```

### Ver Status dos Serviços
```bash
sudo systemctl status terminal404-backend
sudo systemctl status nginx
```

### Reiniciar Serviços
```bash
# Backend
sudo systemctl restart terminal404-backend

# Nginx
sudo systemctl reload nginx
```

### Ver Logs em Tempo Real
```bash
# Backend
sudo journalctl -u terminal404-backend -f

# Nginx
sudo tail -f /var/log/nginx/terminal404_error.log
```

---

## 🔄 Atualizar Código no Servidor

```bash
# 1. Conectar
ssh terminal404@SEU_IP

# 2. Ir para o projeto
cd /var/www/terminal404

# 3. Atualizar código (Git)
git pull

# 4. Reinstalar dependências (se necessário)
npm install

# 5. Rebuild Frontend
npm run build

# 6. Reiniciar Backend
sudo systemctl restart terminal404-backend

# 7. Recarregar Nginx
sudo systemctl reload nginx
```

---

## 📧 Testar Envio de Email

```bash
# No servidor
curl -X POST https://terminal404.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "message": "Mensagem de teste do sistema"
  }'
```

---

## 🛠️ Troubleshooting

### Site não carrega
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Erro 502 Bad Gateway
```bash
sudo systemctl status terminal404-backend
sudo journalctl -u terminal404-backend -n 50
sudo systemctl restart terminal404-backend
```

### Ver uso de recursos
```bash
htop
df -h  # Espaço em disco
free -h  # Memória RAM
```

### Verificar portas
```bash
sudo netstat -tlnp | grep -E '(80|443|8000)'
```

---

## 🔐 SSL/HTTPS

### Renovar Certificado
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Testar Renovação
```bash
sudo certbot renew --dry-run
```

---

## 🗄️ Backup

### Criar Backup
```bash
cd ~
sudo tar -czf terminal404-backup-$(date +%Y%m%d).tar.gz /var/www/terminal404
```

### Baixar Backup (no seu PC)
```bash
scp terminal404@SEU_IP:~/terminal404-backup-*.tar.gz ./
```

### Restaurar Backup
```bash
sudo tar -xzf terminal404-backup-YYYYMMDD.tar.gz -C /
sudo systemctl restart terminal404-backend
sudo systemctl reload nginx
```

---

## 🔥 Firewall

### Ver Regras
```bash
sudo ufw status verbose
```

### Adicionar Regra
```bash
sudo ufw allow 8000/tcp
```

### Remover Regra
```bash
sudo ufw delete allow 8000/tcp
```

---

## 📊 Monitoramento

### Ver Logs do Sistema
```bash
# Últimas 100 linhas do backend
sudo journalctl -u terminal404-backend -n 100

# Logs do Nginx
sudo tail -n 100 /var/log/nginx/terminal404_access.log
sudo tail -n 100 /var/log/nginx/terminal404_error.log
```

### Processos Python
```bash
ps aux | grep python
```

### Processos Nginx
```bash
ps aux | grep nginx
```

---

## 🧹 Limpeza

### Limpar Cache NPM
```bash
npm cache clean --force
```

### Limpar Logs Antigos
```bash
sudo journalctl --vacuum-time=7d
```

### Limpar Pacotes não Usados
```bash
sudo apt autoremove -y
sudo apt autoclean
```

---

## 📦 Instalar Dependências Adicionais

### Backend Python
```bash
cd /var/www/terminal404/backend
source venv/bin/activate
pip install NOME_DO_PACOTE
```

### Frontend React
```bash
cd /var/www/terminal404
npm install NOME_DO_PACOTE
```

---

## 🔧 Configurações Importantes

### Arquivo de Configuração Nginx
```bash
sudo nano /etc/nginx/sites-available/terminal404
sudo nginx -t
sudo systemctl reload nginx
```

### Arquivo de Serviço Backend
```bash
sudo nano /etc/systemd/system/terminal404-backend.service
sudo systemctl daemon-reload
sudo systemctl restart terminal404-backend
```

### Variáveis de Ambiente Backend
```bash
nano /var/www/terminal404/backend/.env
sudo systemctl restart terminal404-backend
```

---

## 🎯 Atalhos Úteis

```bash
# Ver IP público
curl ifconfig.me

# Ver DNS
nslookup terminal404.com.br

# Testar conectividade
ping terminal404.com.br

# Ver certificado SSL
echo | openssl s_client -servername terminal404.com.br -connect terminal404.com.br:443 2>/dev/null | openssl x509 -noout -dates
```

---

**Terminal_404** | Comandos Rápidos v1.0
