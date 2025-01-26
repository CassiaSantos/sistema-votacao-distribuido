-- Criação do Banco de Dados
CREATE DATABASE sistema_votacao;
\c sistema_votacao;

-- Tabela: Eleitores
CREATE TABLE eleitores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    data_de_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Votações
CREATE TABLE votacoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL
);

-- Tabela: Opções de Voto
CREATE TABLE opcoes_voto (
    id SERIAL PRIMARY KEY,
    id_votacao INT NOT NULL REFERENCES votacoes(id) ON DELETE CASCADE,
    descricao VARCHAR(200) NOT NULL
);

-- Tabela: Votos
CREATE TABLE votos (
    id SERIAL PRIMARY KEY,
    id_votacao INT NOT NULL REFERENCES votacoes(id) ON DELETE CASCADE,
    id_opcao INT NOT NULL REFERENCES opcoes_voto(id) ON DELETE CASCADE,
    id_eleitor INT NOT NULL REFERENCES eleitores(id) ON DELETE CASCADE,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_votacao, id_eleitor) -- Garante que o eleitor vote apenas uma vez por votação
);

-- Tabela: Administradores
CREATE TABLE administradores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL -- Armazenar hash da senha
);

-- Inserção de Dados de Exemplo (opcional)
INSERT INTO administradores (nome, email, senha)
VALUES ('Admin Principal', 'admin@sistema.com', 'hash_da_senha');

INSERT INTO votacoes (nome, descricao, data_inicio, data_fim)
VALUES 
    ('Eleição de Representante', 'Escolha do representante da turma.', '2025-02-01 08:00:00', '2025-02-01 18:00:00');

INSERT INTO opcoes_voto (id_votacao, descricao)
VALUES 
    (1, 'Candidato 1'),
    (1, 'Candidato 2'),
    (1, 'Candidato 3');
