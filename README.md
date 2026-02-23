# 🚀 TERMINAL_404

> Site institucional profissional com design futurista, tecnológico e confiável. Desenvolvido com React + Vite (Frontend) e PHP puro (Backend).

**Status:** ✅ Produção  
**Versão:** 3.0.0  
**Data:** 23 de Fevereiro de 2026

---

## 🌐 Site ao Vivo

**🔗 URL:** https://terminal404.com.br  
**📧 Email:** terminallocal404@gmail.com  
**💬 Discord:** [Terminal_404 Community](https://discord.gg/seu-convite)

---

## 📋 Sobre o Projeto

A **Terminal_404** é uma comunidade técnica e empresa de tecnologia especializada em:

- ✅ **Backend Development** (Node.js, Python, PHP, Java)
- ✅ **Frontend Development** (React, Vue, Angular)
- ✅ **Database Management** (PostgreSQL, MySQL, MongoDB)
- ✅ **DevOps & Cloud** (Docker, AWS, CI/CD)
- ✅ **Projetos Empresariais** (Sistemas completos e robustos)

---

## 🎨 Design e Tecnologia

### Visual
- **Paleta:** Ciano #00E5FF (primária), Azul escuro #0B0F1A (secundária), Preto/azul #05070D (fundo)
- **Efeitos:** Glow, gradientes, elementos de circuito, animações futuristas
- **Layout:** Responsivo, moderno, empresarial e técnico

### Tech Stack

**Frontend:**
- ⚛️ React 18.3 + TypeScript
- ⚡ Vite 6.0 (build tool)
- 🎨 Tailwind CSS 4.0
- 🧭 React Router 7.1
- 🎭 Motion (animações)
- 🎯 Lucide React (ícones)

**Backend:**
- 🐘 PHP 8.1+ (puro, sem frameworks)
- 📧 SMTP Gmail (envio de emails)
- 🔐 Rate limiting, sanitização, validação
- 📝 Logs de auditoria
- 🛡️ Headers de segurança

---

## 📂 Estrutura do Projeto

```
terminal404/
├── src/                      # Código fonte frontend
│   ├── app/                  # Componentes da aplicação
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas (Home, Sobre, etc.)
│   │   ├── App.tsx           # Componente principal
│   │   └── routes.ts         # Configuração de rotas
│   ├── imports/              # Assets importados do Figma
│   └── styles/               # Estilos globais e temas
│
├── backend/                  # API PHP
│   ├── index.php             # Router principal
│   ├── config.php            # Configurações
│   ├── functions.php         # Funções auxiliares
│   ├── .htaccess             # Config Apache/Nginx
│   └── logs/                 # Logs da API
│
├── public/                   # Arquivos públicos
│   └── favicon.svg           # Ícone do site
│
├── dist/                     # Build de produção (gerado)
├── package.json              # Dependências Node.js
├── vite.config.ts            # Configuração Vite
├── tsconfig.json             # Configuração TypeScript
└── tailwind.config.js        # Configuração Tailwind
```

---

## 🚀 Deploy no Servidor

### ⚡ Método 1: Instalação Automática (RECOMENDADO)

Execute no seu servidor Ubuntu:

```bash
ssh root@SEU_IP_SERVIDOR
curl -fsSL https://raw.githubusercontent.com/Terminllocal404/terminal404-Fim/main/install.sh -o install.sh
bash install.sh
```

**✅ Pronto! O script instala tudo automaticamente em 10 minutos.**

---

### 📖 Método 2: Instalação Manual

Siga o guia completo passo a passo:

**👉 `DEPLOY_SIMPLES_UBUNTU.md`**

---

### 🔍 Diagnóstico de Problemas

Se algo der errado, execute o diagnóstico automático:

```bash
bash /var/www/terminal404/backend/diagnostico.sh
```

Ele detecta e mostra **EXATAMENTE** qual é o problema!

---

## 💻 Desenvolvimento Local

### Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn
- PHP 8.1+ (para testar backend localmente)

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/Terminllocal404/terminal404-Fim.git
cd terminal404-Fim

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

### Testar Backend Localmente

```bash
cd backend
php -S localhost:8000

# Em outro terminal, testar:
curl http://localhost:8000/api/health
```

---

## 📡 API Endpoints

### Health Check

```bash
GET /api/health
```

**Resposta:**
```json
{
  "status": "online",
  "message": "Terminal_404 API Running",
  "timestamp": "2026-02-23T10:00:00-03:00"
}
```

### Formulário de Contato

```bash
POST /api/contact
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "message": "Mensagem de contato..."
}
```

### Solicitação de Projeto

```bash
POST /api/project-request
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@empresa.com",
  "phone": "11987654321",
  "project_type": "Website Institucional",
  "project_title": "Site Corporativo",
  "project_description": "Descrição detalhada do projeto..."
}
```

**📚 Documentação completa:** `backend/README.md`

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Gera build de produção em /dist

# Preview
npm run preview          # Visualiza build de produção localmente

# Linting
npm run lint             # Verifica código com ESLint
```

---

## 🔐 Segurança

O backend implementa:

✅ **Rate Limiting** - Proteção contra spam  
✅ **Sanitização** - Remove HTML/scripts maliciosos  
✅ **Validação** - Valida todos os inputs  
✅ **Headers de Segurança** - X-Frame-Options, CSP, etc.  
✅ **Logs de Auditoria** - Registra todas as atividades  
✅ **CORS Configurado** - Apenas domínios permitidos  

---

## 📊 Estatísticas do Projeto

- 👥 **250+ Membros** na comunidade Discord
- 💼 **50+ Projetos** entregues
- ⭐ **100% Satisfação** dos clientes
- 🌐 **24/7 Disponibilidade** do site

---

## 📧 Contato e Suporte

**Email:** terminallocal404@gmail.com  
**Discord:** [Entrar na Comunidade](https://discord.gg/seu-convite)  
**GitHub:** [Terminllocal404](https://github.com/Terminllocal404)

---

## 📄 Licença

© 2026 **Terminal_404** - Todos os direitos reservados

Este projeto é proprietário e desenvolvido exclusivamente pela Terminal_404.

---

## 👥 Time de Fundadores

**Lipe Augusto** - CEO & Full Stack Developer  
**Lucas Nunes** - CTO & Backend Specialist

---

## 📚 Documentação Adicional

- **🚀 Deploy Rápido:** `INSTALACAO_RAPIDA.md`
- **📖 Manual Completo:** `DEPLOY_SIMPLES_UBUNTU.md`
- **🔧 Guia do Servidor:** `README_SERVIDOR.md`
- **🐘 Backend API:** `backend/README.md`
- **🔍 Diagnóstico:** `backend/diagnostico.sh`
- **📝 Changelog Backend:** `backend/CHANGELOG.md`

---

## 🎉 Agradecimentos

Agradecemos a todos os membros da comunidade Terminal_404 que contribuem diariamente para o crescimento e sucesso da nossa plataforma!

---

**Desenvolvido com ❤️ e ☕ pela equipe Terminal_404**  
**Versão 3.0.0** | 23 de Fevereiro de 2026

---

## 🌟 Próximos Passos

Interessado em fazer parte da Terminal_404?

1. **Visite:** https://terminal404.com.br
2. **Entre no Discord:** Clique em "Entrar na Comunidade"
3. **Solicite um Projeto:** Use o formulário de solicitação
4. **Contribua:** Participe de discussões técnicas

**Seja bem-vindo à Terminal_404! 🚀**
