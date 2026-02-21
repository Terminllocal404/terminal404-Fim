# 🔒 Guia de Segurança - Terminal_404 Backend

## ⚠️ IMPORTANTE - Leia Antes de Usar em Produção

Este documento contém informações críticas sobre segurança do backend.

---

## 🔐 Configurações Sensíveis

### 1. Senha do Gmail SMTP

**⚠️ NUNCA faça commit da senha real no Git!**

**Senha Atual no Código:**
```python
"password": "123456",  # ⚠️ PLACEHOLDER - Trocar por senha real
```

**Como Proteger:**

#### Opção A: Variáveis de Ambiente (Recomendado)

1. Criar arquivo `.env` na pasta `backend/`:
```env
SMTP_PASSWORD=sua-senha-de-app-aqui
```

2. Atualizar `main.py`:
```python
import os
from dotenv import load_dotenv

load_dotenv()

SMTP_CONFIG = {
    "password": os.getenv("SMTP_PASSWORD"),
    # ...
}
```

3. Adicionar `.env` ao `.gitignore`:
```bash
echo ".env" >> .gitignore
```

#### Opção B: Secrets do Sistema (Produção)

- **Heroku:** Config Vars
- **Vercel:** Environment Variables
- **AWS:** Secrets Manager
- **Railway:** Environment Variables

---

## 🛡️ Recursos de Segurança Implementados

### ✅ Rate Limiting

**Configuração Atual:**
- Contato: 5 requisições/minuto por IP
- Projeto: 3 requisições/minuto por IP

**Como Ajustar:**
```python
@app.post("/api/contact")
@limiter.limit("10/minute")  # ← Alterar aqui
async def contact_form(request: Request, data: ContactForm):
```

**Recomendado para Produção:**
- Contato: 3-5 requisições/minuto
- Projeto: 2-3 requisições/minuto

---

### ✅ Validação de Dados (Pydantic)

**Validações Ativas:**

#### Nome:
- Mínimo: 2 caracteres
- Máximo: 100 caracteres
- Apenas letras e espaços

#### Email:
- Validação de formato padrão
- Tipo: `EmailStr` do Pydantic

#### Telefone:
- Mínimo: 10 dígitos
- Máximo: 11 dígitos

#### Mensagem:
- Mínimo: 10 caracteres
- Máximo: 2000 caracteres

#### Descrição de Projeto:
- Mínimo: 20 caracteres
- Máximo: 5000 caracteres

---

### ✅ Sanitização HTML

**Proteção contra XSS:**

```python
def sanitize_html(text: str) -> str:
    """Sanitiza texto para prevenir XSS"""
    return html.escape(text)
```

Todos os dados do usuário são sanitizados antes de serem incluídos nos emails.

---

### ✅ CORS (Cross-Origin Resource Sharing)

**Configuração Atual:**
```python
allow_origins=["*"]  # ⚠️ MUITO PERMISSIVO!
```

**Para Produção:**
```python
allow_origins=[
    "https://terminal404.com",
    "https://www.terminal404.com",
    "http://localhost:5173",  # Apenas para desenvolvimento
]
```

---

### ✅ Logs de Auditoria

**Informações Registradas:**
- Data/hora de cada requisição
- Email do solicitante
- Tipo de solicitação
- Status de envio
- Erros e exceções

**Arquivo de Log:**
- Localização: `backend/terminal404.log`
- Rotação: Manual (implementar logrotate em produção)

**Visualizar Logs:**
```bash
tail -f backend/terminal404.log
```

---

## 🚨 Vulnerabilidades Conhecidas

### 1. Credenciais Hardcoded

**Problema:**
```python
SMTP_CONFIG = {
    "password": "123456",  # ⚠️ Exposto no código
}
```

**Solução:**
- Usar variáveis de ambiente
- Nunca commitar credenciais reais

---

### 2. CORS Muito Permissivo

**Problema:**
```python
allow_origins=["*"]  # Permite qualquer origem
```

**Solução:**
```python
allow_origins=[
    "https://seudominio.com",
    "http://localhost:5173",  # Apenas desenvolvimento
]
```

---

### 3. Rate Limiting Baseado em IP

**Limitação:**
- Usuários atrás de proxy/NAT compartilham IP
- VPNs podem burlar

**Melhorias:**
- Adicionar fingerprinting de device
- Implementar CAPTCHA para requisições suspeitas
- Usar Redis para rate limiting distribuído

---

## 🔧 Melhorias de Segurança Recomendadas

### Para Desenvolvimento Local

- [x] Rate limiting
- [x] Validação de dados
- [x] Sanitização HTML
- [x] Logs básicos
- [ ] HTTPS local (opcional)

### Para Produção

- [ ] **HTTPS obrigatório**
- [ ] **Variáveis de ambiente para secrets**
- [ ] **CORS restrito a domínios específicos**
- [ ] **Firewall e IP whitelist**
- [ ] **Monitoramento de logs (Sentry, CloudWatch)**
- [ ] **Rate limiting distribuído (Redis)**
- [ ] **CAPTCHA em formulários**
- [ ] **Autenticação JWT para endpoints admin**
- [ ] **Backup automático de logs**
- [ ] **Certificado SSL válido**
- [ ] **Headers de segurança:**
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security

---

## 🔍 Checklist de Segurança

### Antes de Deploy

- [ ] Trocar senha placeholder por senha real
- [ ] Configurar variáveis de ambiente
- [ ] Remover `allow_origins=["*"]`
- [ ] Adicionar domínio real ao CORS
- [ ] Configurar HTTPS
- [ ] Testar rate limiting
- [ ] Revisar logs de erro
- [ ] Configurar monitoramento
- [ ] Implementar backup de logs
- [ ] Documentar procedimentos de segurança

---

## 📋 Boas Práticas

### ✅ DO (Faça)

- ✅ Use variáveis de ambiente para secrets
- ✅ Mantenha rate limiting ativo
- ✅ Valide todos os inputs
- ✅ Sanitize dados do usuário
- ✅ Use HTTPS em produção
- ✅ Monitore logs regularmente
- ✅ Mantenha dependências atualizadas
- ✅ Faça backup de logs
- ✅ Teste endpoints regularmente
- ✅ Documente mudanças de segurança

### ❌ DON'T (Não Faça)

- ❌ Nunca commite senhas no Git
- ❌ Nunca use `allow_origins=["*"]` em produção
- ❌ Nunca desative validação de dados
- ❌ Nunca exponha stack traces ao usuário
- ❌ Nunca ignore erros silenciosamente
- ❌ Nunca use HTTP em produção
- ❌ Nunca compartilhe logs publicamente
- ❌ Nunca desative rate limiting
- ❌ Nunca confie em dados do cliente
- ❌ Nunca ignore avisos de segurança

---

## 🆘 Resposta a Incidentes

### Se Detectar Atividade Suspeita:

1. **Imediatamente:**
   - [ ] Aumentar rate limiting
   - [ ] Revisar logs recentes
   - [ ] Identificar IP do atacante

2. **Em seguida:**
   - [ ] Bloquear IPs suspeitos
   - [ ] Notificar equipe
   - [ ] Documentar incidente

3. **Depois:**
   - [ ] Revisar código de segurança
   - [ ] Atualizar dependências
   - [ ] Implementar melhorias
   - [ ] Treinar equipe

---

## 📊 Monitoramento

### Métricas Importantes:

- **Taxa de erro**: < 1%
- **Tempo de resposta**: < 500ms
- **Rate limit hits**: Monitorar tendências
- **Emails enviados**: Taxa de sucesso > 95%

### Alertas Recomendados:

- Taxa de erro > 5%
- Rate limit excedido > 100 vezes/hora
- Tempo de resposta > 1s
- Falha de envio de email > 3 consecutivas

---

## 🔄 Manutenção de Segurança

### Diariamente:
- [ ] Revisar logs de erro
- [ ] Verificar rate limit violations

### Semanalmente:
- [ ] Analisar padrões de uso
- [ ] Verificar atualizações de dependências

### Mensalmente:
- [ ] Atualizar dependências
- [ ] Revisar políticas de segurança
- [ ] Testar backup e restore
- [ ] Audit de código

---

## 📚 Recursos Adicionais

### Documentação de Segurança:

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **FastAPI Security**: https://fastapi.tiangolo.com/tutorial/security/
- **Python Security**: https://python.readthedocs.io/en/stable/library/security_warnings.html

### Ferramentas Úteis:

- **Bandit**: Scanner de segurança Python
- **Safety**: Verificador de vulnerabilidades
- **OWASP ZAP**: Teste de penetração
- **Snyk**: Monitoramento de dependências

---

## 📞 Suporte de Segurança

Se identificar uma vulnerabilidade, entre em contato:

- **Email**: terminallocal404@gmail.com
- **Assunto**: [SECURITY] Descrição breve
- **Não divulgue publicamente** antes de correção

---

## 📝 Changelog de Segurança

### Versão 1.0.0 (Fevereiro 2026)

- ✅ Implementado rate limiting
- ✅ Validação com Pydantic
- ✅ Sanitização HTML
- ✅ Logs de auditoria
- ✅ CORS configurável
- ⚠️ Pendente: Variáveis de ambiente
- ⚠️ Pendente: HTTPS em produção

---

**Última atualização:** Fevereiro 2026

**Responsável pela Segurança:** Terminal_404 Team

🔒 **Segurança é prioridade!**
