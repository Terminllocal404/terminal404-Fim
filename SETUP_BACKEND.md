# 🚀 Terminal_404 - Guia de Configuração Backend

## 📋 Visão Geral

O backend do Terminal_404 é uma API Python robusta construída com FastAPI que processa formulários e envia emails via SMTP do Gmail.

---

## 🔧 Passo a Passo de Instalação

### 1. Instalar Python

Certifique-se de ter Python 3.8 ou superior instalado:

```bash
python3 --version
```

### 2. Navegar até a pasta backend

```bash
cd backend
```

### 3. Instalar Dependências

```bash
pip install -r requirements.txt
```

Ou se preferir pip3:

```bash
pip3 install -r requirements.txt
```

---

## ⚙️ Configurar Gmail para SMTP

### ⚠️ IMPORTANTE: NÃO USE A SENHA NORMAL DO GMAIL

Para usar o Gmail SMTP, você precisa criar uma **Senha de App**:

### Passo 1: Ativar Verificação em Duas Etapas

1. Acesse: https://myaccount.google.com/security
2. Na seção "Como fazer login no Google", clique em "Verificação em duas etapas"
3. Ative a verificação em duas etapas (se ainda não estiver ativa)

### Passo 2: Gerar Senha de App

1. Acesse: https://myaccount.google.com/apppasswords
2. Você pode precisar fazer login novamente
3. Em "Selecione o app", escolha **"Correio"**
4. Em "Selecione o dispositivo", escolha **"Outro (nome personalizado)"**
5. Digite: "Terminal_404"
6. Clique em "Gerar"
7. **Copie a senha gerada** (16 caracteres sem espaços)

### Passo 3: Configurar Senha no Backend

Abra o arquivo `/backend/main.py` e localize a linha:

```python
"password": "123456",  # ⚠️ ATENÇÃO: Trocar por senha real
```

Substitua `"123456"` pela senha de app que você gerou:

```python
"password": "abcd efgh ijkl mnop",  # Senha de app do Gmail
```

**IMPORTANTE:** Cole a senha gerada EXATAMENTE como foi fornecida pelo Google.

---

## ▶️ Iniciar o Backend

### Opção 1: Script Start (Linux/Mac)

```bash
chmod +x start.sh
./start.sh
```

### Opção 2: Executar diretamente com Python

```bash
python3 main.py
```

### Opção 3: Usar Uvicorn

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

O servidor iniciará em: **http://localhost:8000**

---

## ✅ Testar o Backend

### 1. Acessar a documentação interativa

Abra no navegador:

```
http://localhost:8000/docs
```

Você verá a interface Swagger com todos os endpoints disponíveis.

### 2. Testar Health Check

```bash
curl http://localhost:8000/health
```

Deve retornar:

```json
{
  "status": "healthy",
  "timestamp": "2026-02-21T..."
}
```

### 3. Testar Envio de Email

#### Formulário de Contato:

```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "message": "Olá, gostaria de mais informações sobre os serviços."
  }'
```

#### Solicitação de Projeto:

```bash
curl -X POST http://localhost:8000/api/project-request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "(32) 99100-4523",
    "company": "Empresa XYZ",
    "project_type": "Website Institucional",
    "project_title": "Site da Empresa",
    "project_description": "Preciso de um site institucional moderno para minha empresa.",
    "tech_stack": ["React", "Node.js"],
    "deadline": "2 meses",
    "budget": "R$ 10.000 - R$ 20.000",
    "has_design": true,
    "needs_hosting": true,
    "additional_info": "Preciso também de integração com redes sociais."
  }'
```

---

## 🌐 Iniciar o Frontend

Em outro terminal, na pasta raiz do projeto:

```bash
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:5173** (ou porta indicada)

---

## 📝 Estrutura de Arquivos Backend

```
backend/
├── main.py              # API principal com todos os endpoints
├── requirements.txt     # Dependências Python
├── .env.example        # Exemplo de configurações
├── start.sh            # Script de inicialização
├── README.md           # Documentação detalhada
└── terminal404.log     # Logs da aplicação (gerado automaticamente)
```

---

## 🔒 Segurança Implementada

✅ **Rate Limiting**: Proteção contra spam
- Formulário de contato: 5 requisições/minuto
- Solicitação de projeto: 3 requisições/minuto

✅ **Validação de Dados**: Todos os campos são validados com Pydantic

✅ **Sanitização HTML**: Proteção contra XSS

✅ **Logs de Auditoria**: Todas as requisições são registradas

✅ **CORS Configurado**: Apenas origens permitidas

✅ **Tratamento de Erros**: Mensagens de erro claras sem expor detalhes internos

---

## 🐛 Troubleshooting

### Problema: "SMTPAuthenticationError"

**Causa**: Senha incorreta ou não é senha de app

**Solução**:
1. Certifique-se de usar a **senha de app** do Gmail, não a senha normal
2. Verifique se a verificação em duas etapas está ativa
3. Regenere a senha de app se necessário

---

### Problema: "Connection refused" ou "ECONNREFUSED"

**Causa**: Backend não está rodando

**Solução**:
1. Inicie o backend: `python3 main.py`
2. Verifique se está rodando em http://localhost:8000
3. Confirme que não há outro processo usando a porta 8000

---

### Problema: "429 Too Many Requests"

**Causa**: Rate limit excedido

**Solução**:
- Aguarde 1 minuto antes de tentar novamente
- Isso é uma proteção contra spam

---

### Problema: Email não chega

**Verifique**:
1. ✅ Senha de app está correta no código
2. ✅ Email de destino está correto: `terminallocal404@gmail.com`
3. ✅ Verifique a pasta de SPAM do Gmail
4. ✅ Confira os logs em `terminal404.log`

---

## 📊 Logs

Os logs são salvos automaticamente em `terminal404.log` e contêm:

- ✅ Todas as requisições recebidas
- ✅ Emails enviados com sucesso
- ✅ Erros e exceções
- ✅ Tentativas bloqueadas por rate limit

Para ver os logs em tempo real:

```bash
tail -f terminal404.log
```

---

## 🚀 Pronto para Produção

Para colocar em produção, considere:

1. **Variáveis de Ambiente**: Mover credenciais para arquivo `.env`
2. **HTTPS**: Configurar certificado SSL
3. **Domínio**: Atualizar CORS com domínio real
4. **Serviço de Email Profissional**: SendGrid, Amazon SES, etc.
5. **Banco de Dados**: Salvar logs e solicitações
6. **Monitoramento**: Sentry, New Relic, etc.
7. **Deploy**: AWS, Google Cloud, Heroku, Railway, etc.

---

## 📞 Suporte

- **Email**: terminallocal404@gmail.com
- **WhatsApp**: (32) 91547-944
- **GitHub**: https://github.com/Terminllocal404

---

## ✨ Pronto!

Agora o site Terminal_404 está completo com:

✅ Frontend React moderno e responsivo  
✅ Backend Python robusto e seguro  
✅ Envio de emails automático via SMTP  
✅ Formulários funcionais  
✅ Rate limiting e proteção  
✅ Logs e auditoria  

**Bom desenvolvimento! 🚀**
