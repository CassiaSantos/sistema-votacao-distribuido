-- Criação da base de dados:
CREATE DATABASE sistema_votacao;

-- Criação da tabela de Eleitores
CREATE TABLE eleitores (
    id_eleitor SERIAL PRIMARY KEY,
    nome_eleitor VARCHAR(100) NOT NULL,
    email_eleitor VARCHAR(100) NOT NULL UNIQUE,
    data_de_registro_eleitor TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de Votações
CREATE TABLE votacoes (
    id_votacao SERIAL PRIMARY KEY,
    nome_votacao VARCHAR(100) NOT NULL,
    descricao_votacao TEXT,
    data_inicio_votacao TIMESTAMP NOT NULL,
    data_fim_votacao TIMESTAMP NOT NULL,
    CHECK (data_inicio_votacao < data_fim_votacao)
);

-- Criação da tabela de Opções de Voto
CREATE TABLE opcoes_voto (
    id_opcao_voto SERIAL PRIMARY KEY,
    id_votacao INTEGER NOT NULL,
    descricao_opcao_voto TEXT NOT NULL,
    FOREIGN KEY (id_votacao) REFERENCES votacoes(id_votacao) ON DELETE CASCADE
);

-- Criação da tabela de Votos
CREATE TABLE votos (
    id_voto SERIAL PRIMARY KEY,
    id_votacao INTEGER NOT NULL,
    id_opcao_voto INTEGER NOT NULL,
    id_eleitor INTEGER NOT NULL,
    data_hora_voto TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_votacao) REFERENCES votacoes(id_votacao) ON DELETE CASCADE,
    FOREIGN KEY (id_opcao_voto) REFERENCES opcoes_voto(id_opcao_voto) ON DELETE CASCADE,
    FOREIGN KEY (id_eleitor) REFERENCES eleitores(id_eleitor) ON DELETE CASCADE
);

-- Criação da tabela de Administradores
CREATE TABLE administradores (
    id_admin SERIAL PRIMARY KEY,
    nome_admin VARCHAR(100) NOT NULL,
    email_admin VARCHAR(100) NOT NULL UNIQUE,
    senha_admin VARCHAR(255) NOT NULL
);

-- Criação de índices para otimização de consultas
CREATE INDEX idx_votos_votacao ON votos(id_votacao);
CREATE INDEX idx_votos_opcao ON votos(id_opcao_voto);
CREATE INDEX idx_votos_eleitor ON votos(id_eleitor);
CREATE INDEX idx_opcoes_votacao ON opcoes_voto(id_votacao);

-- Criação de constraint para garantir um único voto por eleitor por votação
ALTER TABLE votos ADD CONSTRAINT unique_eleitor_votacao UNIQUE (id_eleitor, id_votacao);

-- Criação de view para contagem de votos por opção
CREATE VIEW resultado_votacao AS
SELECT 
    v.id_votacao,
    vot.nome_votacao,
    ov.id_opcao_voto,
    ov.descricao_opcao_voto,
    COUNT(v.id_voto) as total_votos
FROM votacoes vot
LEFT JOIN opcoes_voto ov ON ov.id_votacao = vot.id_votacao
LEFT JOIN votos v ON v.id_opcao_voto = ov.id_opcao_voto
GROUP BY v.id_votacao, vot.nome_votacao, ov.id_opcao_voto, ov.descricao_opcao_voto
ORDER BY v.id_votacao, total_votos DESC;

-- Criação de função para verificar se uma votação está ativa
CREATE OR REPLACE FUNCTION is_votacao_ativa(id_votacao_param INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM votacoes 
        WHERE id_votacao = id_votacao_param
        AND CURRENT_TIMESTAMP BETWEEN data_inicio_votacao AND data_fim_votacao
    );
END;
$$ LANGUAGE plpgsql;

-- Criação de trigger para validar voto antes de inserir
CREATE OR REPLACE FUNCTION validar_voto()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se a votação está ativa
    IF NOT is_votacao_ativa(NEW.id_votacao) THEN
        RAISE EXCEPTION 'Votação não está ativa';
    END IF;

    -- Verifica se a opção de voto pertence à votação correta
    IF NOT EXISTS (
        SELECT 1 
        FROM opcoes_voto 
        WHERE id_opcao_voto = NEW.id_opcao_voto 
        AND id_votacao = NEW.id_votacao
    ) THEN
        RAISE EXCEPTION 'Opção de voto inválida para esta votação';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validar_voto
BEFORE INSERT ON votos
FOR EACH ROW
EXECUTE FUNCTION validar_voto();

-- Inserção de dados de exemplo
INSERT INTO administradores (nome_admin, email_admin, senha_admin) 
VALUES ('Admin Padrão', 'admin@sistema.com', 'senhaHashAqui');

INSERT INTO votacoes (nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao)
VALUES 
    ('Eleição de Representante', 'Escolha do representante da turma.', '2025-02-01 08:00:00', '2025-02-01 18:00:00');

INSERT INTO opcoes_voto (id_votacao, descricao_opcao_voto)
VALUES 
    (1, 'Candidato 1'),
    (1, 'Candidato 2'),
    (1, 'Candidato 3');

-- Comentários nas tabelas
COMMENT ON TABLE eleitores IS 'Tabela que armazena informações dos eleitores do sistema';
COMMENT ON TABLE votacoes IS 'Tabela que armazena as votações disponíveis no sistema';
COMMENT ON TABLE opcoes_voto IS 'Tabela que armazena as opções de voto para cada votação';
COMMENT ON TABLE votos IS 'Tabela que armazena os votos realizados pelos eleitores';
COMMENT ON TABLE administradores IS 'Tabela que armazena os administradores do sistema';
