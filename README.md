# sistema-votacao-distribuido
Esse repositório é destinado a armazenar os códigos do sistema de votação distribuído desenvolvido na disciplina de 'Sistemas Distribuídos', ministrada pelo professor Rennan José Maia.

## Para executar o projeto:

1. Instale as dependências:
```bash
npm install express pg bcrypt jsonwebtoken cors dotenv
```

2. Configure o arquivo `.env` com suas credenciais

3. Inicie o servidor:
```bash
node src/server.js
```

## API (Application Programming Interface): 
A API foi estruturada seguindo o padrão MVC e princípios REST. Segue a explicação da organização:

1. **Configuração**
   - `config/database.js`: Configuração da conexão com PostgreSQL

2. **Middlewares**
   - `auth.middleware.js`: Autenticação via JWT
   - `admin.middleware.js`: Verificação de permissões de administrador

3. **Controllers**
   - `eleitor.controller.js`: Gerencia eleitores (login/registro)
   - `admin.controller.js`: Gerencia administradores (login)
   - `votacao.controller.js`: Gerencia votações (criar/listar/resultados)
   - `voto.controller.js`: Gerencia votos (registrar)

4. **Rotas**
   - `eleitor.routes.js`: Rotas para eleitores
   - `admin.routes.js`: Rotas para administradores
   - `votacao.routes.js`: Rotas para votações
   - `voto.routes.js`: Rotas para votos

5. **Aplicação**
   - `app.js`: Configuração do Express e rotas
   - `server.js`: Inicialização do servidor

### Endpoints disponíveis:

1. **Eleitores**
   - POST `/api/eleitores/login`: Login do eleitor
   - POST `/api/eleitores/register`: Registro de novo eleitor

2. **Administradores**
   - POST `/api/admin/login`: Login do administrador

3. **Votações**
   - POST `/api/votacoes`: Criar nova votação (admin)
   - GET `/api/votacoes/active`: Listar votações ativas
   - GET `/api/votacoes/:id_votacao/results`: Ver resultados (admin)

4. **Votos**
   - POST `/api/votos`: Registrar voto


## Descrição do Código da base de dados
O script SQL cria uma estrutura completa de banco de dados para o sistema de votação, incluindo:

### Tabelas:
Todas as tabelas definidas no modelo de dados:
   - eleitores
   - votacoes
   - opcoes_voto
   - votos
   - administradores

### Relacionamentos e Constraints:
   - Chaves estrangeiras com CASCADE para exclusão;
   - Constraint para garantir um único voto por eleitor por votação;
   - Check constraint para garantir que data_fim_votacao seja posterior a data_inicio_votacao;

### Índices para otimização:
   - Índices nas chaves estrangeiras mais consultadas;
   - Índice no email do eleitor para busca rápida;

### View para resultados:
   - resultado_votacao: apresenta a contagem de votos por opção;

### Função e Trigger:
   - Função is_votacao_ativa para verificar se uma votação está em andamento;
   - Trigger para validar votos antes da inserção;

### Recursos adicionais:
   - Timestamps automáticos para registro de votos;
   - Comentários nas tabelas para documentação;
   - Exemplo de inserção de administrador padrão;

#### Para usar este script:
1. Execute-o em um banco PostgreSQL;
2. Substitua 'senha_hash_aqui' por um hash real de senha;
3. Adicione dados iniciais conforme necessário;
