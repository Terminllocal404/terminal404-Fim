# Terminal_404 - Backend API

Backend Python robusto para processamento de formulários e envio de emails via SMTP.

## 🚀 Tecnologias

- **FastAPI** - Framework moderno e rápido
- **Pydantic** - Validação de dados
- **SMTP** - Envio de emails via Gmail
- **SlowAPI** - Rate limiting
- **Uvicorn** - Servidor ASGI de alta performance

## 📋 Funcionalidades

✅ Processamento de formulário de contato  
✅ Processamento de solicitação de projeto  
✅ Validação robusta de dados  
✅ Rate limiting (proteção contra spam)  
✅ Sanitização de inputs (proteção XSS)  
✅ Logs detalhados  
✅ Emails HTML formatados  
✅ CORS configurado  

## 🔧 Instalação

### 1. Instalar Dependências

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
SMTP_EMAIL=terminallocal404@gmail.com
SMTP_PASSWORD=sua-senha-de-app-do-gmail
```

### 3. Configurar Gmail SMTP

⚠️ **IMPORTANTE**: Para usar Gmail SMTP, você precisa:

1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas"
3. Acesse: https://myaccount.google.com/apppasswords
4. Gere uma "Senha de app" para "Correio"
5. Use essa senha gerada no arquivo `.env`

**NÃO use a senha normal da sua conta Gmail!**

## ▶️ Executar

```bash
# Desenvolvimento
python main.py

# Ou com uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A API estará disponível em: `http://localhost:8000`

## 📡 Endpoints

### GET `/`
Informações da API

### GET `/health`
Health check

### POST `/api/contact`
Processar formulário de contato

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "message": "Olá, gostaria de mais informações..."
}
```

**Rate Limit:** 5 requisições/minuto

### POST `/api/project-request`
Processar solicitação de projeto

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "(32) 99100-4523",
  "company": "Empresa XYZ",
  "project_type": "Website Institucional",
  "project_title": "Site da Empresa",
  "project_description": "Descrição detalhada...",
  "tech_stack": ["React", "Node.js"],
  "deadline": "2 meses",
  "budget": "R$ 10.000",
  "has_design": true,
  "needs_hosting": true,
  "additional_info": "Informações extras..."
}
```

**Rate Limit:** 3 requisições/minuto

## 🔒 Segurança

- ✅ Rate limiting por IP
- ✅ Validação de dados com Pydantic
- ✅ Sanitização HTML
- ✅ CORS configurado
- ✅ Logs de auditoria
- ✅ Tratamento de erros robusto

## 📊 Logs

Os logs são salvos em `terminal404.log` e incluem:

- Requisições recebidas
- Emails enviados
- Erros e exceções
- Tentativas de rate limit

## 🐛 Troubleshooting

### Erro ao enviar email

**Problema:** `SMTPAuthenticationError`

**Solução:** 
1. Verifique se está usando "Senha de app" do Gmail
2. Confirme que a verificação em duas etapas está ativa
3. Verifique se o email e senha estão corretos no `.env`

### Rate limit excedido

**Problema:** `429 Too Many Requests`

**Solução:** Aguarde 1 minuto e tente novamente

## 📝 Notas de Produção

Para produção, considere:

1. Usar variáveis de ambiente reais (não hardcoded)
2. Configurar HTTPS
3. Usar um servidor de email profissional (SendGrid, Amazon SES)
4. Adicionar autenticação JWT
5. Implementar banco de dados para logs
6. Configurar backup e monitoramento
7. Usar domínios específicos no CORS

## 👨‍💻 Desenvolvimento

```bash
# Instalar dependências de desenvolvimento
pip install fastapi[all] uvicorn[standard]

# Executar em modo desenvolvimento
uvicorn main:app --reload
```

## 📫 Suporte

Email: terminallocal404@gmail.com  
WhatsApp: (32) 91547-944
