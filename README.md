
# 🛒 Fullstack App: Cadastro de Produtos (Next.js + NestJS + PostgreSQL)

Este é um projeto fullstack para cadastro e listagem de produtos, utilizando:

- **Frontend:** Next.js + TailwindCSS
- **Backend:** NestJS + Prisma + PostgreSQL
- **Banco de Dados:** PostgreSQL (local ou em nuvem)

---

## ✨ Funcionalidades

- Criar, listar e excluir produtos
- Comunicação frontend/backend via API REST
- Interface amigável com formulário e validações básicas
- Organização de código com boas práticas

---

## 📁 Estrutura do Projeto

```bash
fullstack/
├── backend/           # NestJS + Prisma + PostgreSQL
├── frontend/          # Next.js com TailwindCSS
├── README.md
```

---

## 🚀 Como rodar o projeto

### 🔧 Requisitos

- Node.js (v18+)
- PostgreSQL
- Yarn ou npm

---

## 🔙 Backend (NestJS + Prisma)

### 1. Acesse a pasta backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

No arquivo `.env`, configure sua conexão com PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/seubanco"
```

### 4. Rode as migrações e gere o Prisma Client

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

Servidor rodando em: `http://localhost:3001`

---

## 🖥️ Frontend (Next.js)

### 1. Acesse a pasta frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto

```bash
npm run dev
```

Aplicação disponível em: `http://localhost:3000`

---

## 🔗 API Endpoints

- `GET    /produto` – Lista todos os produtos
- `POST   /produto` – Cria um novo produto
- `DELETE /produto/:id` – Deleta um produto por ID

---

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 🧑‍💻 Autor(a)

Desenvolvido por **Marlene Carvalho**  
📫 [GitHub](https://github.com/marlenecarvalho)

---

## 📜 Licença

Este projeto está sob a licença MIT.
