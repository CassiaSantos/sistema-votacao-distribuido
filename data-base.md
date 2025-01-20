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
