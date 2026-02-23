# 🚀 TERMINAL_404 - DEPLOY NO SERVIDOR

## 📋 ARQUIVOS IMPORTANTES

1. **`DEPLOY_SIMPLES_UBUNTU.md`** ← ⭐ **COMECE AQUI!**
   - Manual completo passo a passo
   - Do zero ao site no ar
   - Método simplificado e testado

2. **`backend/diagnostico.sh`**
   - Script de diagnóstico automático
   - Detecta problemas automaticamente
   - Execute quando algo der errado

---

## ⚡ INÍCIO RÁPIDO

### 1. Conectar ao Servidor

```bash
ssh root@SEU_IP_SERVIDOR
```

### 2. Executar Deploy

Siga **EXATAMENTE** o arquivo `DEPLOY_SIMPLES_UBUNTU.md` passo a passo.

### 3. Se Algo Der Errado

Execute o diagnóstico:

```bash
cd /var/www/terminal404
bash backend/diagnostico.sh
```

Ele vai mostrar **EXATAMENTE** o que está errado!

---

## 🎯 ESTRUTURA DO DEPLOY

```
/var/www/terminal404/
├── dist/              ← Frontend buildado (servido pelo Nginx)
├── backend/           ← API PHP
│   ├── index.php      ← Router principal
│   ├── config.php     ← Configurações
│   └── logs/          ← Logs da API
├── src/               ← Código fonte React
└── package.json       ← Dependências
```

---

## 🌐 ARQUITETURA

```
Usuário → Nginx (porta 80/443)
           ├─> Frontend (arquivos estáticos em /dist)
           └─> Backend (PHP-FPM via socket)
                 └─> API (/api/*)
```

---

## ✅ VERIFICAÇÃO RÁPIDA

Depois do deploy, verifique:

```bash
# 1. Nginx rodando?
systemctl status nginx

# 2. PHP-FPM rodando?
systemctl status php*-fpm

# 3. Site responde?
curl http://localhost

# 4. API responde?
curl http://localhost/api/health
```

Se **TODOS** retornarem OK, está funcionando! ✅

---

## 🆘 PROBLEMAS COMUNS

### "502 Bad Gateway"
```bash
# PHP-FPM parou
systemctl restart php8.1-fpm  # ou php8.2, php8.3
```

### "Apache Default Page"
```bash
# Apache está no caminho
systemctl stop apache2
systemctl disable apache2
systemctl restart nginx
```

### "API retorna 404"
```bash
# Permissões erradas
chown -R www-data:www-data /var/www/terminal404/backend
chmod -R 755 /var/www/terminal404/backend
chmod -R 777 /var/www/terminal404/backend/logs
```

### Nada funciona?
```bash
# Execute o diagnóstico!
bash /var/www/terminal404/backend/diagnostico.sh
```

---

## 📧 SUPORTE

**Desenvolvido por:** Terminal_404  
**Email:** terminallocal404@gmail.com

---

**⭐ LEMBRE-SE:** Sempre siga o `DEPLOY_SIMPLES_UBUNTU.md` do início ao fim!
