# DecideAí - Sistema de Votação Distribuído  

## 📌 Sobre o Projeto  
O **DecideAí - Sistema de Votação Distribuído** é uma aplicação desenvolvida em **Node.js, com Express** e **PostgreSQL (Supabase)** para gerenciar votações de maneira simples e eficiente. Ele permite o cadastro de eleitores, a criação de votações e a computação dos votos, além de fornecer um painel administrativo para gerenciar todo o processo.  

#### Vídeo de execução do sistema
Disponível em: https://drive.google.com/file/d/1ZPlJ44HsPWDJ0Ac_wbF-CNr72rILvzc_/view?usp=sharing

## 🧑‍💻 Autora  
O projeto foi desenvolvido por **Cássia Santos**. Você pode encontrar mais informações e contribuições da autora no GitHub:  
🔗 [GitHub - Cássia Santos](https://github.com/CassiaSantos)  

## 📂 Estrutura do Projeto  
O projeto possui a seguinte organização:  

```
📦 sistema-votacao-distribuido
|── 📂 src 
│   ├── 📂 config                  # Configuração do banco de dados e Supabase
│       ├── db.js                  # Conexão com o banco de dados
│       ├── sistema_votacao.sql    # Script para criação das tabelas no Supabase
│     
│   ├── 📂 controllers             # Lógica do backend para rotas e regras de negócio
│
│   ├── 📂 routes                  # Rotas da API organizadas por funcionalidade
│
|── 📂frontend                    # Código do frontend do sistema
│   ├── 📂 pages                  # Páginas HTML do sistema
│   ├── 📂 styles                 # Estilos CSS
│   ├── 📂 scripts                # Código JavaScript do frontend
│
│── 📜 .env                       # Variáveis de ambiente (não deve ser compartilhado)
│── 📜 package.json               # Configuração do projeto e dependências
│── 📜 server.js                  # Arquivo principal que inicia o servidor
│── 📜 README.md                  # Documentação do projeto
```

## 🚀 Tecnologias Utilizadas  
Para rodar este projeto, é necessário as seguintes tecnologias:  

- **Node.js** (v16+ recomendado)  
- **Express.js**  
- **PostgreSQL** (Banco de dados gerenciado pelo Supabase)  
- **Supabase** (Banco de dados e autenticação)  
- **dotenv** (Gerenciamento de variáveis de ambiente)  
- **CORS** (Para permitir requisições entre diferentes origens)
- **Live server** (Simula um servidor para o front-end da aplicação)

## 📥 Como Clonar o Projeto  
1. Abra o VS Code com o git já configurado com suas configurações do github;
2. Se houver pastas abertas nele, feche-as com o atalho ```CTRL + K F``` (primeiro pressione CTRL + K e depois clique na tecla F);
3. Clique na opção "Clonar um repositório Git";
4. Cole: ```git clone https://github.com/CassiaSantos/sistema-votacao-distribuido.git``` e pressione "Enter".
5. Escolha um diretório no seu computador para salvar a pasta do projeto e clique em "Selecionar" e aguarde;
6. Clique em "Open" ou "Abrir" no pop-up que aparecerá perguntando se você deseja abrir o projeto. Pronto, o projeto está aberto no VS Code;
7. No arquivo ```.gitignore```, exclua ou comente a linha com o nome da pasta ```node_modules/``` e salve as alterações do arquivo;
8. Feche o Visual Studio Code e abra novamente.

## 🔧 Configuração do Banco de Dados  
Após clonar o repositório, siga os passos abaixo para configurar o banco no **Supabase**:  

1. Acesse a palataforma [Supabase](https://supabase.com), clique em "Start your project" ou "Comece o seu projeto" e crie uma conta (ou faça login) com e-mail ou github;
2. Crie e um novo projeto clicando no botão "New project" ou "Novo projeto";
3. Escolha a organização que quer a qual o projeto pertença;
4. Defina o nome, senha e região da base de dados que está sendo criada e confirme clicando em "Criar novo projeto" ou "Create new project";
5. Aguarde enquanto o banco é criado. Após isso, será mostrado algumas informações dele. Em "Project API Keys", copie a "Project URL" e a "API Key" e deixe salvo em algum arquivo de texto por enquanto.
6. Na lateral esquerda, vá até a aba **SQL Editor** e execute o script localizado em:  
   ```
   src/config/sistema_votacao.sql
   ```
   Isso criará as tabelas necessárias no banco de dados.  

## ⚙️ Configuração das Variáveis de Ambiente  
1. Antes de rodar o projeto, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:  

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
PORT=3001
```

2. Substitua `sua_url_do_supabase` e `sua_chave_do_supabase` pelos valores obtidos no Supabase que ficou armazenado temporariamente no arquivo de texto da etapa anterior. Salve as alterações do arquivo. 

## 📦 Instalação das Dependências  
1. No terminal integrado do Visual Studio Code, inicie o projeto digitando:  
```sh
npm init -y
```
2. Instale as dependências do projeto com o seguinte comando:  

```sh
npm install
```

## ▶️ Como Rodar o Projeto  
1. Após instalar as dependências e configurar o banco de dados, inicie o servidor com:  
```sh
npm start 
```
ou 
```sh
node server.js 
```

O servidor será executado na porta **3001** (ou outra definida no `.env`). Uma mensagem no console irá aparecer confirmando o êxito até o momento.
2. Com o servidor em execução, abra o arquivo ```index.html``` com a extensão ```Live server``` do VS Code na raiz do projeto e acesse o sistema no seu navagador.

3. Caso não tenha o Live Server instalado no VS Code, vá na aba "Extensões", busque por "Live server", clique em "Instalar" e aguarde até a conclusão. Após isso, com o botão direito do mouse, clique em cima do arquivo ```index.html``` e selecione a opção "Executar com Live Server", que pode estar em português ou inglês.

## 🎯 Funcionalidades Implementadas  
- Cadastro de Eleitores;
- Login de Administradores;
- Criação de Votações e Opções de Voto;  
- Votação pelos Eleitores;  
- Armazenamento e Apuração dos Resultados;  
- Painel Administrativo para Gestão das Votações;  
