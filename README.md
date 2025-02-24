# DecideAí - Sistema de Votação Distribuído  

## 📌 Sobre o Projeto  
O **DecideAí - Sistema de Votação Distribuído** é uma aplicação desenvolvida em **Node.js** e **PostgreSQL (Supabase)** para gerenciar votações de maneira simples e eficiente. Ele permite o cadastro de eleitores, a criação de votações e a computação dos votos, além de fornecer um painel administrativo para gerenciar todo o processo.  

## 🧑‍💻 Autora  
O projeto foi desenvolvido por **Cássia Santos**. Você pode encontrar mais informações e contribuições da autora no GitHub:  
🔗 [GitHub - Cássia Santos](https://github.com/CassiaSantos)  

## 📂 Estrutura do Projeto  
O projeto possui a seguinte organização:  

```
📦 sistema-votacao-distribuido
|── 📂 src 
│   ├── 📂 config               # Configuração do banco de dados e Supabase
│       ├── db.js               # Conexão com o banco de dados
│       ├── sistema_votacao.sql # Script para criação das tabelas no Supabase
│     
│   ├── 📂 controllers          # Lógica do backend para rotas e regras de negócio
│
│   ├── 📂 routes               # Rotas da API organizadas por funcionalidade
│
|── 📂frontend             # Código do frontend do sistema
│   ├── 📂 pages            # Páginas HTML do sistema
│   ├── 📂 styles           # Estilos CSS
│   ├── 📂 scripts          # Código JavaScript do frontend
│
│── 📜 .env                 # Variáveis de ambiente (não deve ser compartilhado)
│── 📜 package.json         # Configuração do projeto e dependências
│── 📜 server.js            # Arquivo principal que inicia o servidor
│── 📜 README.md            # Documentação do projeto
```

## 🚀 Tecnologias Utilizadas  
Para rodar este projeto, é necessário instalar as seguintes tecnologias:  

- **Node.js** (v16+ recomendado)  
- **Express.js**  
- **PostgreSQL** (Banco de dados gerenciado pelo Supabase)  
- **Supabase** (Banco de dados e autenticação)  
- **dotenv** (Gerenciamento de variáveis de ambiente)  
- **CORS** (Para permitir requisições entre diferentes origens)  

## 📥 Como Clonar o Projeto  
```sh
git clone https://github.com/CassiaSantos/sistema-votacao-distribuido.git
cd sistema-votacao-distribuido
```

## 🔧 Configuração do Banco de Dados  
Após clonar o repositório, siga os passos abaixo para configurar o banco no **Supabase**:  

1. Acesse [Supabase](https://supabase.com) e crie um novo projeto.  
2. Vá até a aba **SQL Editor** e execute o script localizado em:  
   ```
   src/config/sistema_votacao.sql
   ```
   Isso criará as tabelas necessárias no banco de dados.  

## ⚙️ Configuração das Variáveis de Ambiente  
Antes de rodar o projeto, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:  

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
PORT=3001
```

Substitua `sua_url_do_supabase` e `sua_chave_do_supabase` pelos valores obtidos no Supabase.  

## 📦 Instalação das Dependências  
Inicie o projeto com:  
```sh
npm init -y
```
Instale as dependências do projeto com o seguinte comando:  

```sh
npm install
```

## ▶️ Como Rodar o Projeto  
Após instalar as dependências e configurar o banco de dados, inicie o servidor com:  

```sh
npm start
```

O servidor será executado na porta **3001** (ou outra definida no `.env`).  

## 🎯 Funcionalidades Implementadas  
- Cadastro de Eleitores e Administradores  
- Criação de Votações e Opções de Voto  
- Votação pelos Eleitores  
- Armazenamento e Apuração dos Resultados  
- Painel Administrativo para Gestão das Votações  