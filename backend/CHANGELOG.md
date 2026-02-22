# 📝 Changelog - Terminal_404 Backend

Todas as mudanças importantes do backend serão documentadas aqui.

---

## [3.0.0] - 2026-02-22

### 🚀 Migração Completa para PHP

**BREAKING CHANGES:** Migração do backend de Python (FastAPI) para PHP puro.

### ✨ Novidades

- ✅ Backend completamente reescrito em **PHP 8.0+**
- ✅ API RESTful com rotas `/api/*`
- ✅ Envio de emails via **SMTP Gmail** (porta 587 e 465)
- ✅ **Rate Limiting** por IP:
  - `/api/contact`: 5 requisições/minuto
  - `/api/project-request`: 3 requisições/minuto
- ✅ **Sanitização completa** de inputs (XSS protection)
- ✅ **Validações rigorosas** de todos os campos
- ✅ Emails HTML profissionais e responsivos
- ✅ Sistema de **logs de auditoria** completo
- ✅ Headers de segurança (XSS, Frame, MIME, CSP)
- ✅ Compressão GZIP automática
- ✅ CORS configurado para múltiplos domínios
- ✅ Suporte a UTF-8 e caracteres especiais
- ✅ Detecção automática de IP real (CloudFlare, Proxy, Nginx)

### 📁 Arquivos Criados

- `index.php` - Roteamento e handlers principais
- `config.php` - Configurações centralizadas (SMTP, rate limit, logs)
- `functions.php` - Funções auxiliares (email, validação, segurança)
- `.htaccess` - Configuração Apache (rotas, segurança, compressão)
- `README.md` - Documentação completa da API
- `test.php` - Script de teste do ambiente
- `.gitignore` - Arquivos ignorados pelo Git
- `CHANGELOG.md` - Este arquivo

### 🔧 Configurações

- **SMTP Email:** terminallocal404@gmail.com
- **SMTP Password:** oxii jedf rkav ubgz (senha de app Gmail)
- **Timezone:** America/Sao_Paulo
- **Log Max Size:** 10MB (rotação automática)

### 🔐 Segurança

- **Sanitização:** strip_tags + htmlspecialchars
- **Validação:** Email (RFC), Nome (regex), Telefone (10-11 dígitos)
- **Rate Limiting:** JSON file-based com TTL de 1 hora
- **Headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, CSP
- **CORS:** Lista branca de origens permitidas

### 📧 Emails

Dois templates HTML profissionais:

1. **Formulário de Contato** (`format_contact_email`)
   - Design Terminal_404 (ciano #00E5FF)
   - Campos: Nome, Email, Mensagem
   - Timestamp automático

2. **Solicitação de Projeto** (`format_project_email`)
   - Layout completo com seções
   - Tech stack com badges visuais
   - Campos opcionais condicionais
   - Timestamp automático

### 🛠️ Endpoints

| Endpoint | Método | Descrição | Rate Limit |
|----------|--------|-----------|------------|
| `/api` | GET | Informações da API | - |
| `/api/health` | GET | Health check | - |
| `/api/contact` | POST | Formulário de contato | 5/min |
| `/api/project-request` | POST | Solicitação de projeto | 3/min |

### 📝 Logs

- `logs/api.log` - Atividades da API (INFO, WARNING, ERROR)
- `logs/php_errors.log` - Erros do PHP
- `logs/rate_limits.json` - Controle de rate limiting

### 🗑️ Removido

- ❌ Backend Python (FastAPI)
- ❌ `main.py`
- ❌ `requirements.txt`
- ❌ `start.sh`
- ❌ `test_api.py`
- ❌ `SEGURANCA.md`
- ❌ Systemd service (não mais necessário)
- ❌ Virtual environment Python
- ❌ Dependência de porta 8000

### 📚 Documentação

- ✅ README.md completo com todos os endpoints
- ✅ MANUAL_SERVIDOR_UBUNTU.md atualizado para PHP
- ✅ Exemplos de uso com curl
- ✅ Troubleshooting detalhado
- ✅ Guia de testes

### 🔄 Compatibilidade

- **PHP:** 7.4+ (recomendado: 8.0+)
- **Servidor:** Apache 2.4+ ou Nginx
- **Extensões:** mbstring, json, openssl
- **Frontend:** 100% compatível (mesmas rotas `/api/*`)

---

## [2.0.0] - 2026-02-21 (Python - DESCONTINUADO)

### Última versão em Python antes da migração

- Backend FastAPI
- Porta 8000 com systemd
- Envio de email via smtplib
- Rate limiting com slowapi
- Virtual environment Python

**⚠️ Esta versão foi completamente substituída pela v3.0.0 em PHP**

---

## [1.0.0] - 2026-02-20 (Python - DESCONTINUADO)

### Versão inicial

- Backend básico em Python
- Formulários simples
- Envio de email

**⚠️ Esta versão foi completamente substituída pela v3.0.0 em PHP**

---

## 📌 Convenções de Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Mudanças incompatíveis com versões anteriores
- **MINOR** (0.X.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.X): Correções de bugs

---

**Desenvolvido por Terminal_404**  
**Data:** 22/02/2026
