# API CRUD com Autenticação + Frontend

Projeto full stack desenvolvido com foco em aprendizado de APIs REST, autenticação e integração entre backend e frontend.

🔗 **Frontend:** https://api-crud-auth-fullstack-757s.vercel.app  
🔗 **Backend API:** https://api-crud-auth-fullstack.onrender.com/api  

---

## 📌 Sobre o projeto

Este projeto consiste em uma aplicação completa com:

- Autenticação com JWT  
- Cadastro e login de usuários  
- Recuperação de senha com pergunta de segurança  
- Listagem de usuários protegida  
- Exclusão de usuários  
- Integração entre backend e frontend  

---

## 🚀 Funcionalidades

### Backend

- Cadastro de usuário  
- Login com geração de token JWT  
- Middleware de autenticação  
- Recuperação de senha  
- Listagem de usuários (rota protegida)  
- Exclusão de usuários  

### Frontend

- Tela de cadastro  
- Tela de login  
- Tela de recuperação de senha  
- Listagem de usuários com:
  - Avatar com iniciais  
  - Exclusão de usuário  
  - Logout  

---

## 🛠 Tecnologias utilizadas

### Backend
- Node.js  
- Express  
- Prisma ORM  
- MongoDB  
- JWT (Autenticação)  
- Bcrypt (Hash de senha)  
- CORS  

### Frontend
- React  
- Vite  
- React Router DOM  
- Axios  
- Tailwind CSS  

---

## ⚙️ Como rodar o projeto localmente

Siga os passos abaixo para configurar o ambiente de desenvolvimento em sua máquina.

### 1. Backend

cd backend  
npm install  

Crie um arquivo `.env` na pasta backend:

DATABASE_URL="SUA_STRING_DO_MONGODB"  
JWT_SECRET="SUA_CHAVE_SECRETA"  

Sincronização do banco (Prisma):

npx prisma db push  
npx prisma generate  

Iniciar o servidor:

npm run dev  

Servidor rodará em:  
http://localhost:2000  

---

### 2. Frontend

cd frontend  
npm install  

Configuração da API:  
No arquivo `src/services/api.js`, ajuste a baseURL para ambiente local:

baseURL: "http://localhost:2000"  

Iniciar o frontend:

npm run dev  

Frontend rodará em:  
http://localhost:5173  

---

## 🛣 Rotas da API

### Públicas

| Método | Rota                 | Descrição                |
|--------|---------------------|------------------------|
| POST   | /api/cadastro        | Criar usuário          |
| POST   | /api/login           | Login e geração de token |
| PUT    | /api/recuperar-senha | Redefinir senha        |

---

### Privadas (necessário token)

| Método | Rota                 | Descrição           |
|--------|---------------------|------------------|
| GET    | /api/listar-usuarios | Listar usuários   |
| DELETE | /api/user/:id        | Deletar usuário   |

---

## 🔑 Autenticação

Authorization: Bearer SEU_TOKEN
