## Descrição do Código da base de dados
### Tabelas:
- Cada tabela está configurada com chaves primárias (PRIMARY KEY) e restrições de integridade referencial (FOREIGN KEY com ON DELETE CASCADE) para gerenciar dependências.

### Únicos e Restrições:
- Eleitores podem votar apenas uma vez por votação (UNIQUE (id_votacao, id_eleitor) na tabela votos).
- Emails de eleitores e administradores devem ser únicos.

### Data e Hora Automáticas:
- Campos ```data_de_registro``` e ```data_hora``` usam timestamps automáticos para registrar eventos no momento apropriado.

### Exclusão em Cascata:
- Quando uma votação ou opção é excluída, os registros relacionados também são removidos.


###### Nova base de dados:
Este script SQL cria uma estrutura completa de banco de dados para o sistema de votação, incluindo:

1. Todas as tabelas definidas no modelo de dados:
   - eleitores
   - votacoes
   - opcoes_voto
   - votos
   - administradores

2. Relacionamentos e Constraints:
   - Chaves estrangeiras com CASCADE para exclusão
   - Constraint para garantir um único voto por eleitor por votação
   - Check constraint para garantir que data_fim_votacao seja posterior a data_inicio_votacao

3. Índices para otimização:
   - Índices nas chaves estrangeiras mais consultadas
   - Índice no email do eleitor para busca rápida

4. View para resultados:
   - resultado_votacao: apresenta a contagem de votos por opção

5. Função e Trigger:
   - Função is_votacao_ativa para verificar se uma votação está em andamento
   - Trigger para validar votos antes da inserção

6. Recursos adicionais:
   - Timestamps automáticos para registro de votos
   - Comentários nas tabelas para documentação
   - Exemplo de inserção de administrador padrão

Para usar este script:

1. Execute-o em um banco PostgreSQL
2. Substitua 'senha_hash_aqui' por um hash real de senha
3. Adicione dados iniciais conforme necessário

Quer que eu explique alguma parte específica do script ou faça alguma modificação?