# Terminal_404 - Site Institucional Completo

## 🎯 Visão Geral

Site institucional profissional da Terminal_404 com frontend React moderno e backend Python robusto para processamento de formulários e envio de emails.

---

## 🏗️ Arquitetura do Projeto

```
terminal_404/
│
├── 📁 src/                          # Frontend React + TypeScript
│   ├── app/
│   │   ├── components/              # Componentes reutilizáveis
│   │   │   ├── Header.tsx           # Cabeçalho com navegação
│   │   │   ├── Footer.tsx           # Rodapé com links sociais
│   │   │   ├── Hero.tsx             # Seção hero animada
│   │   │   ├── Services.tsx         # Cards de serviços 3D
│   │   │   ├── About.tsx            # Sobre a empresa
│   │   │   ├── Community.tsx        # Seção comunidade
│   │   │   ├── Team.tsx             # Equipe
│   │   │   ├── Contact.tsx          # Formulário de contato
│   │   │   ├── WhatsAppButton.tsx   # Botão flutuante WhatsApp
│   │   │   └── Layout.tsx           # Layout principal
│   │   │
│   │   ├── pages/                   # Páginas do site
│   │   │   ├── HomePage.tsx         # Página inicial
│   │   │   ├── AboutPage.tsx        # Página sobre
│   │   │   ├── ServicesPage.tsx     # Página serviços
│   │   │   ├── CommunityPage.tsx    # Página comunidade
│   │   │   ├── TeamPage.tsx         # Página equipe
│   │   │   ├── ContactPage.tsx      # Página contato
│   │   │   └── RequestPage.tsx      # Página solicitação
│   │   │
│   │   ├── routes.ts                # Configuração React Router
│   │   └── App.tsx                  # App principal
│   │
│   └── styles/                      # Estilos globais
│       ├── theme.css                # Tema e variáveis
│       └── fonts.css                # Fontes
│
├── 📁 backend/                      # Backend Python + FastAPI
│   ├── main.py                      # API principal
│   ├── requirements.txt             # Dependências Python
│   ├── .env.example                 # Exemplo de configurações
│   ├── start.sh                     # Script de inicialização
│   └── README.md                    # Documentação backend
│
├── 📁 public/                       # Arquivos públicos
├── package.json                     # Dependências Node.js
└── README_COMPLETO.md               # Este arquivo
```

---

## 🚀 Tecnologias Utilizadas

### Frontend
- ⚛️ **React 18** - Biblioteca UI moderna
- 📘 **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS v4** - Estilização utilitária
- 🎭 **Motion (Framer Motion)** - Animações fluidas
- 🔀 **React Router** - Navegação multi-página
- 🎯 **Lucide React** - Ícones modernos
- ⚡ **Vite** - Build tool rápido

### Backend
- 🐍 **Python 3.8+** - Linguagem principal
- ⚡ **FastAPI** - Framework web moderno
- 📧 **SMTP** - Envio de emails via Gmail
- ✅ **Pydantic** - Validação de dados
- 🛡️ **SlowAPI** - Rate limiting
- 🦄 **Uvicorn** - Servidor ASGI

---

## ✨ Funcionalidades Principais

### Frontend

✅ **Design Profissional e Moderno**
- Tema dark com cores tecnológicas (#00E5FF, #0B0F1A, #05070D)
- Animações suaves e transições
- Efeitos glow e gradientes
- Partículas flutuantes
- Layout 100% responsivo

✅ **Navegação Multi-Página**
- 7 páginas completas (Home, Sobre, Serviços, Comunidade, Equipe, Contato, Solicitação)
- React Router com navegação suave
- Scroll to top automático
- URLs amigáveis

✅ **Componentes Interativos**
- Hero com estatísticas animadas
- Cards 3D com hover effects
- Formulários com validação visual
- Botão WhatsApp flutuante
- Links de redes sociais integrados

✅ **SEO e Performance**
- Smooth scrolling
- Lazy loading
- Código otimizado
- Acessibilidade (ARIA labels)

### Backend

✅ **API RESTful Robusta**
- 2 endpoints principais (contato e projeto)
- Documentação automática (Swagger)
- Health check endpoint
- Tratamento de erros completo

✅ **Segurança Empresarial**
- Rate limiting (5/min contato, 3/min projeto)
- Validação de dados com Pydantic
- Sanitização HTML anti-XSS
- CORS configurado
- Logs de auditoria

✅ **Sistema de Emails**
- Envio via SMTP do Gmail
- Templates HTML formatados
- Informações organizadas por seções
- Confirmação de envio
- Tratamento de falhas

✅ **Monitoramento**
- Logs detalhados em arquivo
- Registro de todas requisições
- Erros e exceções rastreados
- Timestamp em todas operações

---

## 📋 Guia de Instalação Rápida

### 1. Instalar Dependências

#### Frontend:
```bash
npm install
```

#### Backend:
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar Gmail SMTP

**IMPORTANTE**: Você precisa de uma **Senha de App** do Gmail, não a senha normal!

1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas"
3. Acesse: https://myaccount.google.com/apppasswords
4. Gere uma senha de app para "Correio"
5. Copie a senha gerada

No arquivo `/backend/main.py`, linha 68, substitua:

```python
"password": "123456",  # ⚠️ Trocar pela senha de app
```

Por:

```python
"password": "sua-senha-de-app-aqui",
```

### 3. Iniciar Aplicação

#### Backend (Terminal 1):
```bash
cd backend
python3 main.py
```

Backend rodará em: http://localhost:8000

#### Frontend (Terminal 2):
```bash
npm run dev
```

Frontend rodará em: http://localhost:5173

---

## 🌐 Endpoints da API

### `GET /`
Informações da API

### `GET /health`
Health check do servidor

### `POST /api/contact`
Processar formulário de contato simples

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "message": "Mensagem aqui..."
}
```

**Rate Limit:** 5 requisições/minuto

---

### `POST /api/project-request`
Processar solicitação de projeto completa

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
  "budget": "R$ 10.000 - R$ 20.000",
  "has_design": true,
  "needs_hosting": true,
  "additional_info": "Informações extras..."
}
```

**Rate Limit:** 3 requisições/minuto

---

## 🎨 Paleta de Cores

```
Primária:    #00E5FF (Ciano tecnológico)
Secundária:  #0B0F1A (Azul escuro)
Background:  #05070D (Preto/azul escuro)
Texto:       #FFFFFF (Branco)
Texto Muted: #B0B3B8 (Cinza claro)
```

---

## 📱 Redes Sociais Integradas

- 📧 **Email**: terminallocal404@gmail.com
- 📞 **Telefone**: (32) 99100-4523
- 💬 **WhatsApp**: (32) 91547-944 - https://wa.me/553291547944
- 🐙 **GitHub**: https://github.com/Terminllocal404
- 💼 **LinkedIn**: Terminal_404
- 📸 **Instagram**: @terminal_4.0.4

---

## 🔒 Recursos de Segurança

### Frontend
✅ Validação de formulários no client-side  
✅ Sanitização de inputs  
✅ Feedback visual de erros  
✅ Loading states  
✅ Tratamento de erros de rede  

### Backend
✅ Rate limiting por IP  
✅ Validação de dados com Pydantic  
✅ Sanitização HTML  
✅ CORS configurado  
✅ Logs de auditoria  
✅ Tratamento de exceções  
✅ Mensagens de erro seguras  

---

## 📊 Logs e Monitoramento

Os logs do backend são salvos em `/backend/terminal404.log`:

```bash
# Ver logs em tempo real
cd backend
tail -f terminal404.log
```

**Informações registradas:**
- Data/hora de cada operação
- IP do solicitante
- Tipo de requisição
- Status de envio de email
- Erros e exceções
- Rate limit violations

---

## 🐛 Troubleshooting

### Problema: Backend não conecta

**Solução:**
```bash
# Verificar se o backend está rodando
curl http://localhost:8000/health

# Se não responder, inicie o backend
cd backend
python3 main.py
```

---

### Problema: Email não envia

**Verifique:**
1. ✅ Senha de app do Gmail está correta
2. ✅ Verificação em duas etapas está ativa
3. ✅ Email de destino está correto
4. ✅ Confira os logs: `tail -f backend/terminal404.log`
5. ✅ Verifique pasta SPAM do Gmail

---

### Problema: Rate limit excedido

**Solução:**
- Aguarde 1 minuto entre requisições
- Isso é normal e protege contra spam

---

## 🚀 Deploy em Produção

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy da pasta dist/
```

### Backend (Railway/Heroku/AWS)

1. Criar arquivo `.env` com credenciais
2. Configurar variáveis de ambiente
3. Atualizar CORS com domínio real
4. Configurar HTTPS
5. Monitorar logs

**Melhorias para Produção:**
- Usar serviço de email profissional (SendGrid, SES)
- Banco de dados para logs
- Autenticação JWT
- CDN para assets
- Monitoramento (Sentry)
- Backup automático

---

## 📚 Documentação Adicional

- **Backend detalhado**: `/backend/README.md`
- **Guia de setup**: `/SETUP_BACKEND.md`
- **Documentação API**: http://localhost:8000/docs (Swagger)

---

## 🎯 Próximas Melhorias Sugeridas

1. **Painel Admin**: Dashboard para gerenciar solicitações
2. **Banco de Dados**: Persistir dados de solicitações
3. **Autenticação**: Login para área restrita
4. **Blog**: Sistema de postagens técnicas
5. **Portfolio**: Showcase de projetos realizados
6. **Chat em Tempo Real**: Suporte instantâneo
7. **Multi-idioma**: Inglês e Português
8. **Dark/Light Mode**: Toggle de tema
9. **Analytics**: Google Analytics integrado
10. **Newsletter**: Sistema de inscrição

---

## 👨‍💻 Desenvolvimento

### Adicionar Nova Página

1. Criar arquivo em `/src/app/pages/NovaPagina.tsx`
2. Adicionar rota em `/src/app/routes.ts`
3. Adicionar link no Header e Footer

### Adicionar Novo Endpoint

1. Criar modelo Pydantic em `/backend/main.py`
2. Criar função de formatação de email
3. Adicionar rota com decorator `@app.post()`
4. Atualizar frontend para consumir

---

## 📄 Licença

Este projeto foi desenvolvido para Terminal_404.

---

## 📞 Suporte

**Terminal_404 - Tecnologia & Desenvolvimento**

- 📧 Email: terminallocal404@gmail.com
- 💬 WhatsApp: (32) 91547-944
- 🐙 GitHub: https://github.com/Terminllocal404
- 💼 LinkedIn: Terminal_404
- 📸 Instagram: @terminal_4.0.4

---

## ✨ Status do Projeto

**Versão:** 1.0.0  
**Status:** ✅ Completo e Funcional  
**Última Atualização:** Fevereiro 2026

---

**Desenvolvido com ❤️ e ☕ pela comunidade Terminal_404**

🚀 **Bom desenvolvimento!**
