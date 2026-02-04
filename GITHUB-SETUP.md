# 📋 Guia: Enviar Projeto para GitHub

## ✅ Pré-requisitos

- ✓ Git instalado (https://git-scm.com/download/win)
- ✓ Repositório criado no GitHub: `https://github.com/lirourafa-ai/calculadoradec02.git`
- ✓ Projeto local configurado

## 🚀 Passo a Passo

### 1️⃣ Configurar Git (Primeira vez apenas)

Abra PowerShell e configure seu nome e email:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@github.com"
```

### 2️⃣ Inicializar Repositório Git

```powershell
cd "c:\Users\João\carbon-calculator"
git init
```

### 3️⃣ Adicionar Arquivos

```powershell
git add .
```

Verifique os arquivos que serão inclusos:
```powershell
git status
```

### 4️⃣ Fazer o Primeiro Commit

```powershell
git commit -m "Initial commit: Calculadora de Emissão de Carbono"
```

### 5️⃣ Conectar ao Repositório Remoto

```powershell
git branch -M main
git remote add origin https://github.com/lirourafa-ai/calculadoradec02.git
```

### 6️⃣ Enviar para GitHub

```powershell
git push -u origin main
```

Será solicitado autenticação. Use:
- **Username**: Seu usuário GitHub (`lirourafa-ai`)
- **Password**: Token de acesso pessoal (gerado em GitHub Settings)

## 🔑 Criar Token de Acesso (GitHub)

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token"
3. Selecione escopos: `repo`, `read:user`
4. Copie o token gerado
5. Use como senha no git push

## 📂 Verificar Envio

Após o push, acesse:
```
https://github.com/lirourafa-ai/calculadoradec02
```

Você deve ver:
- ✓ Arquivo `index.html`
- ✓ Pasta `css/` com `style.css`
- ✓ Pasta `js/` com 5 arquivos
- ✓ `README.md`
- ✓ `.gitignore`

## 🔄 Próximos Commits

Para futuros commits, use:

```powershell
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "Descrição da mudança"

# Enviar para GitHub
git push
```

## 💡 Dicas

- **Mensagens de commit**: Sejam descritivas ("Add dark mode" em vez de "Update")
- **Commits frequentes**: Faça commits pequenos e lógicos
- **Branches**: Para features maiores, crie branches separadas

## ❓ Troubleshooting

**"git not found"**
- Reinstale Git: https://git-scm.com/download/win

**"Authentication failed"**
- Use token em vez de senha
- Verifique escopos do token

**"remote already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/lirourafa-ai/calculadoradec02.git
```

**"fatal: no changes added"**
```powershell
git add .
git commit -m "mensagem"
```

## ✨ Estrutura Final no GitHub

```
calculadoradec02/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── routes-data.js
│   ├── config.js
│   ├── calculator.js
│   ├── ui.js
│   └── app.js
├── .gitignore
├── README.md
└── (este arquivo)
```

---

**Seu projeto estará visível em:**
🔗 https://github.com/lirourafa-ai/calculadoradec02
