# API CRUD com Autenticação + Frontend

Projeto full stack desenvolvido com foco em aprendizado de APIs REST, autenticação e integração entre backend e frontend.

---

## 📌 Sobre o projeto

Este projeto consiste em uma aplicação completa com:

* Autenticação com JWT
* Cadastro e login de usuários
* Recuperação de senha com pergunta de segurança
* Listagem de usuários protegida
* Exclusão de usuários
* Integração entre backend e frontend

---

## Funcionalidades

### Backend

* Cadastro de usuário
* Login com geração de token JWT
* Middleware de autenticação
* Recuperação de senha
* Listagem de usuários (rota protegida)
* Exclusão de usuários

### Frontend

* Tela de cadastro
* Tela de login
* Tela de recuperação de senha
* Listagem de usuários com:

  * Avatar com iniciais
  * Exclusão de usuário
  * Logout

---

## Tecnologias utilizadas

### Backend

* Node.js
* Express
* Prisma ORM
* MongoDB
* JWT (Autenticação)
* Bcrypt (Hash de senha)
* CORS

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS

---

## ⚙️ Como rodar o projeto

### 🔧 Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```
DATABASE_URL="SUA_STRING_DO_MONGODB"
JWT_SECRET="SUA_CHAVE_SECRETA"
```

Rodar o servidor:

```bash
node server.js
```

Servidor rodará em:

```
http://localhost:2000/api
```

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend rodará em:

```
http://localhost:5173
```

---

## Rotas da API

### Públicas

| Método | Rota                 | Descrição                |
| ------ | -------------------- | ------------------------ |
| POST   | /api/cadastro        | Criar usuário            |
| POST   | /api/login           | Login e geração de token |
| PUT    | /api/recuperar-senha | Redefinir senha          |

---

### Privadas (necessário token)

| Método | Rota                 | Descrição       |
| ------ | -------------------- | --------------- |
| GET    | /api/listar-usuarios | Listar usuários |
| DELETE | /api/user/:id        | Deletar usuário |

---

## 🔑 Autenticação

As rotas privadas utilizam token JWT no header:

```
Authorization: Bearer SEU_TOKEN
```
