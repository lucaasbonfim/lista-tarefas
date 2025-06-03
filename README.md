# 📝 Lista de Tarefas (To-Do App)

Aplicação web para criação e gerenciamento de tarefas diárias. Ideal para organização pessoal e produtividade.


## 📌 Sobre o Projeto

Este projeto é uma aplicação fullstack que permite ao usuário criar, visualizar, marcar como concluídas e excluir tarefas. Atualmente, a funcionalidade de login e autenticação de usuários está em desenvolvimento.

A aplicação está dividida entre frontend (HTML/CSS/JS puro) e backend com Node.js, Express e Prisma ORM.


## 🚀 Tecnologias

### 🖥️ Frontend:
- HTML5
- CSS3 (incluindo Bootstrap)
- JavaScript
- Font Awesome

### ⚙️ Backend:
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (banco de dados)
- Knex.js
- Vercel (Deploy)

### 📦 Instalação

Clone o repositório:
```bash
git clone https://github.com/lucaasbonfim/lista-tarefas.git
cd lista-tarefas
```

Instale as dependências do backend:
```bash
cd server
npm install
```

Configure o banco de dados PostgreSQL:

Crie um arquivo `.env` no diretório `/server` com sua string de conexão:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

Rode as migrações para criar a tabela de tarefas:
```bash
npx prisma migrate dev
```

Inicie o servidor:
```bash
npm run dev
```

Acesse o frontend:
Abra o arquivo `client/index.html` no navegador ou utilize uma extensão como Live Server.

## 🛠️ Estrutura do Projeto

```
lista-tarefas/
├── client/
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── img/
│   │   └── fontawesome/
├── server/
│   ├── src/
│   │   ├── controller/
│   │   ├── business/
│   │   ├── datasource/
│   │   ├── database/
│   │   └── routes.js
│   ├── prisma/
│   │   └── schema.prisma
│   └── index.js
```

## ✨ Funcionalidades

✅ Criar novas tarefas  
✅ Listar tarefas cadastradas  
✅ Marcar tarefas como concluídas  
✅ Excluir tarefas  
🔒 [Em breve] Login de usuários  
📁 [Em breve] Tarefas por usuário  

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch:  
```bash
git checkout -b feature/sua-nova-feature
```
3. Commit suas alterações:  
```bash
git commit -m 'feat: nova funcionalidade'
```
4. Push na sua branch:  
```bash
git push origin feature/sua-nova-feature
```
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT — consulte o arquivo LICENSE.md para mais informações.

## 📬 Contato

👤 Lucas Bonfim  
📧 [lucascardoso2103@gmail.com](mailto:lucascardoso2103@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/lucaasbonfim/)  
💻 [GitHub](https://github.com/lucaasbonfim)

---

🚧 Projeto em desenvolvimento — acompanhe para mais atualizações!
