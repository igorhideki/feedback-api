# Feedback API

Feedback App é uma aplicação para avaliação de desempenho de funcionários.

A Feedback API foi desenvolvida utilizando [Node.js](https://nodejs.org) e [Express](https://expressjs.com) para servir a aplicação Web.

Outras tecnologias utilizadas na API:

- PostgreSQL
- Sequelize
- JWT

## Instalação

Para executar a aplicação localmente é necessário ter instalado na máquina o **Node.js** (os exemplos abaixo serão utilizando **Yarn** mas ele é opcional).

1. Clone o projeto na sua máquina

2. Execute o comando `yarn install` para instalar as dependências do projeto

3. Execute o comando `yarn dev` para subir o projeto localmente, ele está configurando para abrir em `http://localhost:3333`

### Instruções extras

Para que a aplicação funcione totalmente é necessário executar um container **docker**

- Container do postgres

`docker run --name postgres -e POSTGRES_PASSWORD=<database_password> -p 5432:5432 -d postgres`

## Funcionalidades

Abaixo estão as funcionalidades da API.

- Gerenciamento de usuários
- Atribuição de revisão de desempenho
- Listagem de revisões que precisam de feedback
- Envio de feedback

## Links

- [Feedback Web](https://github.com/igorhideki/feedback-web)
