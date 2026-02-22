# 🚀 Terminal_404 - Backend API em PHP

> Backend profissional desenvolvido em PHP puro para processamento de formulários e envio de emails via SMTP Gmail.

**Versão:** 3.0.0  
**Tecnologia:** PHP 8.0+  
**Data:** 22 de Fevereiro de 2026  
**Desenvolvido por:** Terminal_404

---

## 📋 Características Principais

✅ **PHP Puro** - Sem frameworks, leve, rápido e confiável  
✅ **RESTful API** - Endpoints bem definidos com padrão REST  
✅ **Segurança Empresarial** - Rate limiting, sanitização e validação  
✅ **SMTP Gmail** - Envio de emails HTML profissionais  
✅ **Logs de Auditoria** - Registro completo de todas as atividades  
✅ **CORS Configurado** - Aceita requisições do frontend React  
✅ **Emails HTML** - Templates responsivos e bonitos  
✅ **Rate Limiting** - Proteção contra spam e abuso  

---

## 🔧 Requisitos do Servidor

- **PHP 7.4+** (recomendado: PHP 8.0 ou superior)
- **Apache** com `mod_rewrite` habilitado
- **Extensões PHP:**
  - `mbstring` - Suporte a UTF-8
  - `json` - Manipulação JSON
  - `openssl` - Conexões SSL/TLS
- **Permissões de escrita** na pasta `logs/`

---

## 📂 Estrutura de Arquivos

```
backend/
├── index.php          # Roteamento principal e handlers das rotas
├── config.php         # Configurações (SMTP, rate limit, logs, segurança)
├── functions.php      # Funções auxiliares (email, validação, segurança)
├── .htaccess          # Configuração Apache (rotas, segurança, compressão)
├── logs/              # Pasta de logs (criada automaticamente)
│   ├── api.log        # Log de atividades da API
│   ├── php_errors.log # Erros do PHP
│   └── rate_limits.json # Controle de rate limiting por IP
└── README.md          # Esta documentação
```

---

## 🌐 Endpoints da API

### **📍 1. Raiz da API**

```http
GET /api
GET /
```

**Resposta:**
```json
{
  "message": "Terminal_404 Backend API",
  "version": "3.0.0",
  "status": "online",
  "technology": "PHP 8.1",
  "endpoints": {
    "health": {
      "path": "/api/health",
      "method": "GET",
      "description": "Verifica status da API"
    },
    "contact": {
      "path": "/api/contact",
      "method": "POST",
      "description": "Formulário de contato",
      "rate_limit": "5 requisições por minuto"
    },
    "project_request": {
      "path": "/api/project-request",
      "method": "POST",
      "description": "Solicitação de projeto",
      "rate_limit": "3 requisições por minuto"
    }
  }
}
```

---

### **📍 2. Health Check**

```http
GET /api/health
```

**Resposta:**
```json
{
  "status": "online",
  "message": "Terminal_404 API Running",
  "timestamp": "2026-02-22T10:30:00-03:00",
  "server": {
    "php_version": "8.1.0",
    "os": "Linux",
    "timezone": "America/Sao_Paulo",
    "uptime": "Load: 0.10, 0.15, 0.20"
  }
}
```

---

### **📍 3. Formulário de Contato**

```http
POST /api/contact
Content-Type: application/json
```

**Corpo da Requisição:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "message": "Olá! Gostaria de mais informações sobre os serviços da Terminal_404."
}
```

**Validações:**
- `name`: 2-100 caracteres, apenas letras e espaços
- `email`: Email válido (formato RFC)
- `message`: 10-2000 caracteres

**Rate Limit:** 5 requisições por minuto por IP

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso! Responderemos em breve."
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "error": "Nome inválido. Deve ter entre 2 e 100 caracteres e conter apenas letras."
}
```

---

### **📍 4. Solicitação de Projeto**

```http
POST /api/project-request
Content-Type: application/json
```

**Corpo da Requisição:**
```json
{
  "name": "Maria Santos",
  "email": "maria@empresa.com",
  "phone": "(11) 98765-4321",
  "company": "Empresa XYZ Ltda",
  "project_type": "Website Institucional",
  "project_title": "Site Corporativo para Empresa XYZ",
  "project_description": "Preciso de um site institucional moderno com seções: Home, Sobre, Serviços, Portfólio e Contato. Design clean e responsivo.",
  "tech_stack": ["React", "Node.js", "PostgreSQL"],
  "deadline": "30 dias",
  "budget": "R$ 5.000 - R$ 10.000",
  "has_design": true,
  "needs_hosting": false,
  "additional_info": "Já tenho o logo e paleta de cores definidos."
}
```

**Campos Obrigatórios:**
- `name` (string): Nome completo
- `email` (string): Email válido
- `phone` (string): Telefone (10-11 dígitos)
- `project_type` (string): Tipo do projeto
- `project_title` (string): Título do projeto (5-200 caracteres)
- `project_description` (string): Descrição (20-5000 caracteres)

**Campos Opcionais:**
- `company` (string): Nome da empresa
- `tech_stack` (array): Tecnologias desejadas
- `deadline` (string): Prazo estimado
- `budget` (string): Orçamento estimado
- `has_design` (boolean): Possui design pronto?
- `needs_hosting` (boolean): Precisa de hospedagem?
- `additional_info` (string): Informações adicionais

**Rate Limit:** 3 requisições por minuto por IP

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Solicitação enviada com sucesso! Entraremos em contato em breve."
}
```

---

## ⚙️ Configuração

### **1. Configurar Email SMTP (Gmail)**

Edite o arquivo `config.php` (linha 12):

```php
define('SMTP_PASSWORD', 'sua senha aqui');
```

**✅ Senha já configurada:** `oxii jedf rkav ubgz`

**Como obter uma senha de app do Gmail:**

1. Acesse: https://myaccount.google.com/security
2. Ative a **verificação em 2 etapas**
3. Vá em **Senhas de app**
4. Selecione **Outro (nome personalizado)**
5. Digite: "Terminal_404 Backend"
6. Copie a senha gerada (16 caracteres sem espaços)
7. Cole em `config.php`

---

### **2. Configurar Domínios Permitidos (CORS)**

Edite o arquivo `config.php` (linha 21):

```php
define('ALLOWED_ORIGINS', [
    'https://terminal404.com.br',
    'https://www.terminal404.com.br',
    'http://localhost:5173'
]);
```

Adicione seus domínios permitidos neste array.

---

### **3. Configurar Permissões no Servidor**

```bash
# Permissões corretas
sudo chown -R www-data:www-data /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend
sudo chmod 755 /var/www/terminal404/backend/logs
sudo chmod 644 /var/www/terminal404/backend/*.php
sudo chmod 644 /var/www/terminal404/backend/.htaccess
```

---

## 🔐 Recursos de Segurança

### **1. Rate Limiting Inteligente**

Controla o número de requisições por IP:

- **Formulário de Contato:** 5 requisições/minuto
- **Solicitação de Projeto:** 3 requisições/minuto

Após exceder o limite, bloqueio automático de 60 segundos.

**Arquivo de controle:** `logs/rate_limits.json`

---

### **2. Sanitização de Dados**

Todos os inputs passam por:

- `trim()` - Remove espaços extras
- `strip_tags()` - Remove tags HTML/PHP
- `htmlspecialchars()` - Escapa entidades HTML
- Proteção contra **XSS** e **SQL Injection**

---

### **3. Validações Rigorosas**

**Nome:**
- 2-100 caracteres
- Apenas letras (incluindo acentuadas), espaços e hífen
- Regex: `/^[a-zA-ZÀ-ÿ\s\-]+$/u`

**Email:**
- Validação via `filter_var()` com `FILTER_VALIDATE_EMAIL`
- Máximo 255 caracteres

**Telefone:**
- Remove caracteres não numéricos
- 10-11 dígitos (padrão brasileiro)

**Mensagem/Descrição:**
- Tamanho mínimo e máximo validado
- Sanitização completa

---

### **4. Headers de Segurança**

Definidos em `index.php` e `.htaccess`:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

---

### **5. Proteção de Arquivos Sensíveis**

O `.htaccess` bloqueia acesso a:

- Arquivos `.log`, `.json`, `.bak`, `.env`, `.md`
- Pasta `logs/` completa
- Arquivos `config.php` e `functions.php`

---

## 📝 Logs e Auditoria

### **1. Log de API** (`logs/api.log`)

Registra todas as atividades:

```
[2026-02-22 10:30:15] [INFO] [192.168.1.100] POST /api/contact
[2026-02-22 10:30:16] [INFO] [192.168.1.100] Nova mensagem de contato de: joao@example.com (Nome: João Silva)
[2026-02-22 10:30:17] [INFO] [192.168.1.100] Email de contato enviado com sucesso para: joao@example.com
```

**Níveis de log:**
- `INFO` - Operações normais
- `WARNING` - Avisos (rate limit excedido)
- `ERROR` - Erros (falha ao enviar email)

---

### **2. Log de Erros PHP** (`logs/php_errors.log`)

Erros e warnings do PHP:

```
[22-Feb-2026 10:30:15 America/Sao_Paulo] PHP Warning: ...
```

---

### **3. Rate Limits** (`logs/rate_limits.json`)

Controle de requisições por IP:

```json
{
  "contact_abc123def456": {
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
cd /var/www/terminal404/backend
php -S localhost:8000

# Testar health check
curl http://localhost:8000/api/health

# Testar formulário de contato
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "message": "Esta é uma mensagem de teste com mais de 10 caracteres para validação."
  }'
```

---

### **Teste em Produção**

```bash
# Health check
curl https://terminal404.com.br/api/health

# Formulário de contato
curl -X POST https://terminal404.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Mensagem de teste em produção."
  }'

# Solicitação de projeto
curl -X POST https://terminal404.com.br/api/project-request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phone": "11987654321",
    "project_type": "Website",
    "project_title": "Site Institucional",
    "project_description": "Descrição completa do projeto com pelo menos 20 caracteres."
  }'
```

---

## 🐛 Troubleshooting

### **❌ Erro: "Muitas requisições"**

**Causa:** Rate limit excedido  
**Solução:** Aguarde 60 segundos ou resetar rate limits:

```bash
echo "[]" > /var/www/terminal404/backend/logs/rate_limits.json
```

---

### **❌ Erro: "Erro ao enviar email"**

**Possíveis causas:**

1. **Senha incorreta** → Verificar `config.php`
2. **Firewall bloqueando** → Liberar portas 587 e 465
3. **Extensão OpenSSL não instalada** → `sudo apt install php-openssl`

**Verificar logs:**
```bash
tail -f /var/www/terminal404/backend/logs/api.log
```

---

### **❌ Erro 500: Internal Server Error**

**Verificar permissões:**
```bash
ls -la /var/www/terminal404/backend/
ls -la /var/www/terminal404/backend/logs/
```

**Verificar logs:**
```bash
tail -f /var/www/terminal404/backend/logs/php_errors.log
```

---

### **❌ CORS Bloqueado**

**Adicionar domínio** em `config.php`:

```php
define('ALLOWED_ORIGINS', [
    'https://seu-dominio.com'
]);
```

---

## 🚀 Deploy em Produção

### **Via Git**

```bash
cd /var/www/terminal404
git pull origin main

# Corrigir permissões
sudo chown -R www-data:www-data backend/
sudo chmod 755 backend/logs/
```

---

### **Via FTP/SFTP**

1. Enviar todos os arquivos para `/var/www/terminal404/backend/`
2. Executar comandos de permissão (ver seção Configuração)
3. Testar: `curl https://terminal404.com.br/api/health`

---

## 📊 Manutenção

### **Limpar logs antigos**

```bash
cd /var/www/terminal404/backend/logs

# Fazer backup
cp api.log api.log.$(date +%Y%m%d).bak
cp php_errors.log php_errors.log.$(date +%Y%m%d).bak

# Limpar
> api.log
> php_errors.log
```

---

### **Resetar rate limits**

```bash
echo "[]" > /var/www/terminal404/backend/logs/rate_limits.json
```

---

### **Monitorar logs em tempo real**

```bash
# API
tail -f /var/www/terminal404/backend/logs/api.log

# Erros
tail -f /var/www/terminal404/backend/logs/php_errors.log
```

---

## 📧 Emails HTML

Os emails são enviados em **HTML responsivo** com:

✅ Design profissional (cores Terminal_404)  
✅ Layout responsivo  
✅ Campos bem formatados  
✅ Timestamps  
✅ Tech stack com badges (solicitação de projeto)  

---

## 📄 Licença

© 2026 **Terminal_404** - Todos os direitos reservados

---

## 🆘 Suporte

- **Email:** terminallocal404@gmail.com
- **Site:** https://terminal404.com.br
- **GitHub:** https://github.com/Terminllocal404/terminal404-Fim

---

**Desenvolvido com ❤️ por Terminal_404**  
**Versão 3.0.0** | 22 de Fevereiro de 2026
