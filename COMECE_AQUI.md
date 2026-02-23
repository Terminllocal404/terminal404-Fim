# 👋 BEM-VINDO AO TERMINAL_404!

## 🎯 COMECE POR AQUI

Este é o **guia de início rápido** para o projeto Terminal_404.

---

## 📂 QUAL ARQUIVO DEVO LER?

### 🚀 Quero fazer DEPLOY no servidor Ubuntu

**👉 Leia:** `INSTALACAO_RAPIDA.md`

Apenas **3 comandos** e o site estará no ar!

---

### 📖 Quero um guia COMPLETO passo a passo

**👉 Leia:** `DEPLOY_SIMPLES_UBUNTU.md`

Manual detalhado com **10 passos** bem explicados.

---

### 🔍 Algo deu ERRADO no servidor

**👉 Execute:** `bash backend/diagnostico.sh`

Script que detecta automaticamente o problema!

---

### 💻 Quero desenvolver LOCALMENTE

**👉 Leia:** `README.md` → Seção "Desenvolvimento Local"

Comandos:
```bash
npm install
npm run dev
```

---

### 🐘 Quero entender o BACKEND

**👉 Leia:** `backend/README.md`

Documentação completa da API PHP.

---

### 📊 Quero uma VISÃO GERAL

**👉 Leia:** `README.md`

README principal do projeto.

---

## ⚡ INSTALAÇÃO SUPER RÁPIDA

```bash
# 1. Conectar ao servidor
ssh root@SEU_IP

# 2. Executar script de instalação
curl -fsSL https://raw.githubusercontent.com/Terminllocal404/terminal404-Fim/main/install.sh -o install.sh
bash install.sh

# 3. Acessar
http://SEU_IP
```

**✅ PRONTO EM 10 MINUTOS!**

---

## 🗂️ ESTRUTURA DE ARQUIVOS

```
📦 terminal404/
│
├── 📄 COMECE_AQUI.md              ← VOCÊ ESTÁ AQUI!
├── 📄 README.md                   ← Visão geral do projeto
├── 📄 INSTALACAO_RAPIDA.md        ← Deploy em 3 passos
├── 📄 DEPLOY_SIMPLES_UBUNTU.md    ← Manual completo
├── 📄 README_SERVIDOR.md          ← Guia do servidor
├── 📄 install.sh                  ← Script de instalação automática
│
├── 📁 src/                        ← Código fonte React
│   ├── 📁 app/                    ← Componentes da aplicação
│   │   ├── 📁 components/         ← Componentes reutilizáveis
│   │   ├── 📁 pages/              ← Páginas do site
│   │   ├── App.tsx                ← App principal
│   │   └── routes.ts              ← Rotas React Router
│   ├── 📁 imports/                ← Assets do Figma
│   └── 📁 styles/                 ← Estilos globais
│
├── 📁 backend/                    ← API PHP
│   ├── 📄 README.md               ← Documentação da API
│   ├── 📄 CHANGELOG.md            ← Histórico de alterações
│   ├── 📄 diagnostico.sh          ← Script de diagnóstico
│   ├── index.php                  ← Router principal
│   ├── config.php                 ← Configurações
│   ├── functions.php              ← Funções auxiliares
│   ├── .htaccess                  ← Config servidor
│   └── 📁 logs/                   ← Logs da API
│
├── 📁 public/                     ← Arquivos públicos
│   └── favicon.svg                ← Ícone do site
│
├── package.json                   ← Dependências Node.js
├── vite.config.ts                 ← Config Vite
└── tsconfig.json                  ← Config TypeScript
```

---

## 🎓 TRILHA DE APRENDIZADO

### 1️⃣ Primeiro Deploy

1. Leia `INSTALACAO_RAPIDA.md`
2. Execute o script de instalação
3. Acesse o site

### 2️⃣ Entendendo o Projeto

1. Leia `README.md`
2. Explore a estrutura de arquivos
3. Veja o código em `src/`

### 3️⃣ Desenvolvendo Localmente

1. Clone o repositório
2. Execute `npm install`
3. Execute `npm run dev`

### 4️⃣ Trabalhando com Backend

1. Leia `backend/README.md`
2. Configure `config.php`
3. Teste com `curl`

### 5️⃣ Resolvendo Problemas

1. Execute `bash backend/diagnostico.sh`
2. Leia os logs em `backend/logs/`
3. Consulte `DEPLOY_SIMPLES_UBUNTU.md`

---

## 🆘 PRECISA DE AJUDA?

### ❌ Site não carrega no navegador

**👉 Execute:** `bash backend/diagnostico.sh`

### ❌ Erro ao enviar formulário

**👉 Verifique:** `backend/logs/api.log`

### ❌ Não sei qual versão do PHP usar

**👉 Execute:** `ls /run/php/`

### ❌ Apache conflitando com Nginx

**👉 Execute:**
```bash
systemctl stop apache2
systemctl disable apache2
systemctl start nginx
```

---

## 📞 SUPORTE

**Email:** terminallocal404@gmail.com  
**Discord:** Terminal_404 Community  
**GitHub:** https://github.com/Terminllocal404/terminal404-Fim

---

## ✅ CHECKLIST DE SUCESSO

Depois do deploy, verifique:

- [ ] Site carrega em `http://SEU_IP`
- [ ] API responde em `/api/health`
- [ ] Nginx está rodando
- [ ] PHP-FPM está rodando
- [ ] Formulário de contato funciona
- [ ] Emails são recebidos

**Se todos estão ✅ = SUCESSO! 🎉**

---

## 🚀 PRÓXIMOS PASSOS

Depois que o site estiver no ar:

1. **Configure SSL/HTTPS** (se tiver domínio)
2. **Teste os formulários** (contato e solicitação)
3. **Monitore os logs** (`backend/logs/`)
4. **Configure firewall** (UFW)
5. **Faça backup regular**

---

**Desenvolvido por Terminal_404**  
**Versão 3.0.0** | 23 de Fevereiro de 2026

**BOA SORTE COM SEU DEPLOY! 🚀✨**
