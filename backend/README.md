# 🚀 Terminal_404 - Backend API PHP

Backend robusto e seguro desenvolvido em **PHP puro** para processamento de formulários e envio de emails.

---

## 📋 Características

✅ **PHP Puro** - Sem frameworks, leve e rápido  
✅ **Segurança Empresarial** - Rate limiting, sanitização, validação  
✅ **RESTful API** - Endpoints organizados com rotas `/api`  
✅ **Envio de Email** - SMTP via Gmail configurado  
✅ **Logs de Auditoria** - Registro completo de atividades  
✅ **CORS Configurado** - Aceita requisições do frontend  

---

## 🔧 Requisitos

- **PHP 7.4+** (recomendado: PHP 8.0+)
- **Apache** com mod_rewrite habilitado
- **Permissões de escrita** na pasta `logs/`

---

## 📂 Estrutura de Arquivos

```
backend/
├── index.php          # Roteamento principal e handlers
├── config.php         # Configurações (SMTP, rate limit, logs)
├── functions.php      # Funções auxiliares (email, segurança, validação)
├── .htaccess          # Configuração Apache (rotas e segurança)
├── logs/              # Pasta de logs (criada automaticamente)
│   ├── api.log        # Log de atividades
│   ├── php_errors.log # Erros do PHP
│   └── rate_limits.json # Controle de rate limiting
└── README.md          # Este arquivo
```

---

## 🌐 Endpoints da API

### **1. Health Check**
```bash
GET /api/health
```
**Resposta:**
```json
{
  "status": "online",
  "message": "Terminal_404 API Running",
  "timestamp": "2026-02-22T10:30:00-03:00",
  "server": "PHP 8.0"
}
```

### **2. Formulário de Contato**
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "message": "Olá, gostaria de mais informações..."
}
```

**Validações:**
- `name`: 2-100 caracteres, apenas letras
- `email`: Email válido
- `message`: 10-2000 caracteres

**Rate Limit:** 5 requisições por minuto por IP

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

### **3. Solicitação de Projeto**
```bash
POST /api/project-request
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "(11) 98765-4321",
  "company": "Empresa XYZ",
  "project_type": "Website Institucional",
  "project_title": "Site para Empresa",
  "project_description": "Preciso de um site institucional...",
  "tech_stack": ["React", "Node.js"],
  "deadline": "30 dias",
  "budget": "R$ 5.000 - R$ 10.000",
  "has_design": true,
  "needs_hosting": false,
  "additional_info": "Informações extras..."
}
```

**Campos Obrigatórios:**
- `name`, `email`, `phone`, `project_type`, `project_title`, `project_description`

**Campos Opcionais:**
- `company`, `tech_stack`, `deadline`, `budget`, `has_design`, `needs_hosting`, `additional_info`

**Rate Limit:** 3 requisições por minuto por IP

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Solicitação enviada com sucesso! Entraremos em contato em breve."
}
```

---

## ⚙️ Configuração

### **1. Configurar Senha do Email**

Edite o arquivo `config.php`:

```php
define('SMTP_PASSWORD', 'SUA_SENHA_DE_APP_DO_GMAIL');
```

**Como obter senha de app do Gmail:**
1. Acesse: https://myaccount.google.com/security
2. Ative a verificação em 2 etapas
3. Vá em "Senhas de app"
4. Crie uma nova senha para "Outro (nome personalizado)"
5. Copie a senha gerada (formato: `xxxx xxxx xxxx xxxx`)

### **2. Configurar Domínios Permitidos (CORS)**

Edite em `index.php`:

```php
$allowed_origins = [
    'https://terminal404.com.br',
    'https://www.terminal404.com.br',
    'http://localhost:5173'
];
```

### **3. Permissões de Escrita**

```bash
chmod 755 backend/
chmod 755 backend/logs/
chmod 644 backend/logs/*.log
chmod 644 backend/logs/*.json
```

---

## 🔐 Recursos de Segurança

### **1. Rate Limiting**
- **Contato:** 5 requisições/minuto por IP
- **Projeto:** 3 requisições/minuto por IP
- Bloqueio temporário de 60 segundos após exceder

### **2. Validação de Dados**
- Validação de tipos (string, email, boolean)
- Validação de tamanho (min/max caracteres)
- Validação de formato (regex para nome, telefone)

### **3. Sanitização**
- Remoção de tags HTML (`strip_tags`)
- Escape de entidades HTML (`htmlspecialchars`)
- Proteção contra XSS

### **4. Headers de Segurança**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### **5. Proteção de Arquivos**
- `.htaccess` bloqueia acesso a logs e arquivos sensíveis
- Diretório `logs/` protegido

---

## 📝 Logs

### **Log de API** (`logs/api.log`)
```
[2026-02-22 10:30:15] [192.168.1.100] Nova mensagem de contato de: joao@example.com
[2026-02-22 10:31:20] [192.168.1.100] Email enviado com sucesso: [CONTATO] Mensagem de João Silva
```

### **Log de Erros PHP** (`logs/php_errors.log`)
Erros e warnings do PHP são registrados automaticamente.

### **Rate Limits** (`logs/rate_limits.json`)
```json
{
  "contact_abc123": {
    "first_request": 1708606215,
    "last_request": 1708606220,
    "count": 3,
    "ip": "192.168.1.100"
  }
}
```

---

## 🧪 Testes

### **Teste Local (PHP Built-in Server)**

```bash
cd backend
php -S localhost:8000

# Testar health check
curl http://localhost:8000/api/health

# Testar contato
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","message":"Mensagem de teste com mais de 10 caracteres"}'
```

### **Teste em Produção**

```bash
# Health check
curl https://terminal404.com.br/api/health

# Formulário de contato
curl -X POST https://terminal404.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@example.com","message":"Mensagem de teste completa"}'
```

---

## 🚀 Deploy em Produção

### **1. Via FTP/SFTP**
- Envie todos os arquivos para `/var/www/terminal404/backend/`
- Configure permissões (ver seção Configuração)

### **2. Via Git**
```bash
cd /var/www/terminal404
git pull origin main
```

### **3. Configurar Nginx como Proxy**

No arquivo de configuração do Nginx:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8000/api/;
    # ... demais configurações de proxy
}
```

**OU** se usar Apache diretamente:

```nginx
location /api/ {
    alias /var/www/terminal404/backend/;
    try_files $uri $uri/ /backend/index.php?$args;
    
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $request_filename;
    }
}
```

---

## 🐛 Troubleshooting

### **Erro 500 - Internal Server Error**
```bash
# Verificar logs
tail -f logs/php_errors.log
tail -f logs/api.log

# Verificar permissões
ls -la logs/
```

### **Emails não estão sendo enviados**
1. Verificar senha em `config.php`
2. Verificar logs: `tail -f logs/api.log`
3. Testar função mail() do PHP:
```bash
php -r "var_dump(mail('teste@example.com', 'Teste', 'Corpo'));"
```

### **CORS bloqueado**
Adicione seu domínio em `index.php`:
```php
$allowed_origins = [
    'https://SEU_DOMINIO.com.br'
];
```

### **Rate limit muito restritivo**
Ajuste em `index.php`:
```php
// De 5 para 10 requisições por minuto
check_rate_limit('contact', 10, 60)
```

---

## 📊 Monitoramento

### **Ver logs em tempo real**
```bash
tail -f logs/api.log
```

### **Limpar logs antigos**
```bash
# Fazer backup
mv logs/api.log logs/api.log.bak

# Criar novo arquivo vazio
touch logs/api.log
chmod 644 logs/api.log
```

### **Resetar rate limits**
```bash
echo "[]" > logs/rate_limits.json
```

---

## 📄 Licença

Desenvolvido por **Terminal_404**  
Todos os direitos reservados © 2026

---

## 🆘 Suporte

- **Email:** terminallocal404@gmail.com
- **Site:** https://terminal404.com.br
- **Discord:** [Link da comunidade]

---

**Versão:** 2.0.0 (PHP)  
**Última Atualização:** 22/02/2026
