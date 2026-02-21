# ✅ Checklist de Instalação - Terminal_404

## 📋 Guia Rápido de Setup em 5 Minutos

### Pré-requisitos

- [ ] Python 3.8+ instalado
- [ ] Node.js 16+ instalado
- [ ] Conta Gmail com verificação em duas etapas

---

## 🔧 Parte 1: Configurar Gmail SMTP (⏱️ ~3 minutos)

### Passo 1: Ativar Verificação em Duas Etapas
- [ ] Acessar: https://myaccount.google.com/security
- [ ] Clicar em "Verificação em duas etapas"
- [ ] Seguir instruções para ativar

### Passo 2: Gerar Senha de App
- [ ] Acessar: https://myaccount.google.com/apppasswords
- [ ] Fazer login novamente se solicitado
- [ ] Selecionar app: **"Correio"**
- [ ] Selecionar dispositivo: **"Outro (Terminal_404)"**
- [ ] Clicar em **"Gerar"**
- [ ] **COPIAR** a senha gerada (16 caracteres)

### Passo 3: Configurar Senha no Backend
- [ ] Abrir arquivo: `/backend/main.py`
- [ ] Localizar linha 68: `"password": "123456",`
- [ ] Substituir `123456` pela senha de app copiada
- [ ] Salvar arquivo

**Exemplo:**
```python
"password": "abcd efgh ijkl mnop",  # ← Sua senha de app aqui
```

---

## 🐍 Parte 2: Instalar Backend Python (⏱️ ~2 minutos)

### Terminal 1 - Backend

```bash
# 1. Navegar para pasta backend
cd backend

# 2. Instalar dependências
pip install -r requirements.txt

# 3. Iniciar servidor
python3 main.py
```

✅ **Deve aparecer:**
```
🚀 Iniciando Terminal_404 Backend API...
INFO:     Uvicorn running on http://0.0.0.0:8000
```

- [ ] Backend rodando em: http://localhost:8000
- [ ] Acessar documentação: http://localhost:8000/docs

---

## ⚛️ Parte 3: Instalar Frontend React (⏱️ ~2 minutos)

### Terminal 2 - Frontend

```bash
# 1. Voltar para raiz (se estiver em /backend)
cd ..

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

✅ **Deve aparecer:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

- [ ] Frontend rodando em: http://localhost:5173

---

## 🧪 Parte 4: Testar Sistema (⏱️ ~2 minutos)

### Opção A: Teste Manual no Site

- [ ] Abrir: http://localhost:5173
- [ ] Navegar até "Contato" ou "Solicitação"
- [ ] Preencher formulário
- [ ] Clicar em "Enviar"
- [ ] Verificar se aparece mensagem de sucesso
- [ ] Checar email: terminallocal404@gmail.com

### Opção B: Teste Automatizado

```bash
cd backend
python3 test_api.py
```

- [ ] Verificar se todos os testes passam
- [ ] Checar email para confirmar recebimento

---

## ✅ Verificação Final

### Backend está funcionando?
- [ ] http://localhost:8000 abre página da API
- [ ] http://localhost:8000/docs mostra documentação Swagger
- [ ] http://localhost:8000/health retorna `{"status": "healthy"}`

### Frontend está funcionando?
- [ ] http://localhost:5173 abre o site
- [ ] Navegação entre páginas funciona
- [ ] Animações estão suaves
- [ ] Botão WhatsApp flutuante aparece

### Formulários estão funcionando?
- [ ] Formulário de contato envia
- [ ] Formulário de solicitação envia
- [ ] Mensagens aparecem em tempo real
- [ ] Emails chegam no Gmail

---

## 🐛 Problemas Comuns

### ❌ Erro: "SMTPAuthenticationError"
**Causa:** Senha de app incorreta

**Solução:**
- [ ] Verificar se usou senha de app (não senha normal)
- [ ] Verificar se verificação em duas etapas está ativa
- [ ] Gerar nova senha de app se necessário

---

### ❌ Erro: "Connection refused" no frontend
**Causa:** Backend não está rodando

**Solução:**
- [ ] Abrir Terminal 1
- [ ] Navegar para `/backend`
- [ ] Executar: `python3 main.py`
- [ ] Confirmar que apareceu: "Uvicorn running on..."

---

### ❌ Erro: "429 Too Many Requests"
**Causa:** Rate limit atingido (proteção anti-spam)

**Solução:**
- [ ] Aguardar 1 minuto
- [ ] Tentar novamente
- [ ] Isso é normal e protege o sistema

---

### ❌ Email não chega
**Verificar:**
- [ ] Senha de app está correta no código
- [ ] Email destino: terminallocal404@gmail.com
- [ ] Verificar pasta SPAM do Gmail
- [ ] Conferir logs: `tail -f backend/terminal404.log`

---

## 📁 Estrutura de Pastas Esperada

```
terminal_404/
├── backend/
│   ├── main.py              ← Arquivo principal da API
│   ├── requirements.txt     ← Dependências Python
│   ├── test_api.py          ← Script de testes
│   └── terminal404.log      ← Logs (criado automaticamente)
│
├── src/
│   ├── app/
│   │   ├── components/      ← Componentes React
│   │   ├── pages/           ← Páginas
│   │   └── routes.ts        ← Rotas
│   └── styles/              ← Estilos CSS
│
├── package.json             ← Dependências Node
└── README_COMPLETO.md       ← Documentação
```

---

## 🎯 URLs Importantes

| Serviço | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:5173 | - [ ] |
| Backend API | http://localhost:8000 | - [ ] |
| Documentação API | http://localhost:8000/docs | - [ ] |
| Health Check | http://localhost:8000/health | - [ ] |

---

## 📧 Informações de Contato

**Email para receber formulários:**
- terminallocal404@gmail.com

**Redes Sociais:**
- WhatsApp: (32) 91547-944
- GitHub: https://github.com/Terminllocal404
- Instagram: @terminal_4.0.4

---

## 🎉 Pronto!

Se todos os checkboxes acima estão marcados:

✅ **Sistema está 100% funcional!**

### Próximos Passos:

1. [ ] Testar todos os formulários
2. [ ] Verificar responsividade mobile
3. [ ] Personalizar conteúdos
4. [ ] Preparar para deploy
5. [ ] Configurar domínio próprio

---

## 📝 Anotações

Use este espaço para anotações durante a instalação:

```
Data da instalação: _____/_____/_____

Senha de app gerada em: _____/_____/_____

Problemas encontrados:
_____________________________________________
_____________________________________________
_____________________________________________

Soluções aplicadas:
_____________________________________________
_____________________________________________
_____________________________________________
```

---

**Tempo total estimado: ~10 minutos**

**Dificuldade: ⭐⭐ (Fácil)**

---

**Terminal_404 - Tecnologia & Desenvolvimento**

*Desenvolvido com ❤️ e ☕*
