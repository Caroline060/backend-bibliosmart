-- CREATE ALUNO
CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

-- INSIRA 10 ALUNOS 
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) VALUES 
('Lucas', 'Silva', '2000-03-15', 'Rua das Flores, 765', 'lucas.silva@email.com', '11987654321'),
('Mariana', 'Souza', '1999-07-22', 'Rua da Paz, 345', 'mariana.souza@email.com', '11876543210'),
('Gabriel', 'Oliveira', '2001-10-30', 'Rua do Sol, 543', 'gabriel.oliveira@email.com', '11923456789'),
('Ana', 'Pereira', '2002-05-14', 'Rua do Mar, 694', 'ana.pereira@email.com', '11765432109'),
('Felipe', 'Lima', '1998-12-01', 'Rua Verde, 23', 'felipe.lima@email.com', '11934567890'),
('Juliana', 'Martins', '2000-08-19', 'Rua do Vento, 65', 'juliana.martins@email.com', '11887654321'),
('Rafael', 'Costa', '1997-11-29', 'Rua do Ouro, 968', 'rafael.costa@email.com', '11798765432'),
('Camila', 'Alves', '2003-02-03', 'Avenida H, 753', 'camila.alves@email.com', '11987654322'),
('Thiago', 'Rocha', '2001-04-10', 'Rua Inglaterra, 852', 'thiago.rocha@email.com', '11876543211'),
('Carla', 'Gomes', '2000-09-25', 'Avenida Junho, 963', 'carla.gomes@email.com', '11765432108');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

--INSIRA 10 LIVROS
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) VALUES 
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'Editora Martin Claret', 1847, '9788577800255', 10, 7, 39.90, 'Não'),
('O Estrangeiro', 'Albert Camus', 'Editora Companhia das Letras', 1942, '9788535930564', 8, 5, 34.90, 'Sim'),
('A Sombra do Vento', 'Carlos Ruiz Zafón', 'Editora Suma de Letras', 2001, '9788573025301', 12, 9, 49.90, 'Não'),
('O Apanhador no Campo de Centeio', 'J.D. Salinger', 'Editora do Brasil', 1951, '9788535911549', 6, 3, 29.90, 'Não'),
('Fahrenheit 451', 'Ray Bradbury', 'Editora Record', 1953, '9788501051091', 15, 12, 39.90, 'Sim'),
('O Código Da Vinci', 'Dan Brown', 'Editora Sextante', 2003, '9788573022478', 7, 4, 54.90, 'Não'),
('A Guerra dos Tronos', 'George R.R. Martin', 'Editora Leya', 1996, '9788535940082', 9, 6, 59.90, 'Sim'),
('O Casamento', 'Meg Wolitzer', 'Editora Intrínseca', 2017, '9788551000564', 5, 2, 34.90, 'Não'),
('A Arte da Guerra', 'Sun Tzu', 'Editora Pensamento', 1345, '9788531511690', 20, 15, 29.90, 'Não'),
('A Casa dos Espíritos', 'Isabel Allende', 'Editora Record', 1982, '9788501053279', 11, 8, 44.90, 'Sim');

--EMPRÉSTIMO
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

-- 10 EMPRESTIMOS
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) VALUES 
(1, 4, '2024-09-01', '2024-09-15', 'Devolvido'),
(2, 7, '2024-09-05', '2024-09-19', 'Devolvido'),
(3, 1, '2024-09-10', '2024-09-24', 'Devolvido'),
(4, 5, '2024-09-12', '2024-09-26', 'Devolvido'),
(5, 6, '2024-09-15', '2024-09-29', 'Pendente'),
(6, 2, '2024-09-20', '2024-10-04', 'Pendente'),
(7, 3, '2024-09-22', '2024-10-06', 'Pendente'),
(8, 9, '2024-09-25', '2024-10-10', 'Devolvido'),
(9, 8, '2024-09-28', '2024-10-12', 'Pendente'),
(10, 10, '2024-09-30', '2024-10-14', 'Pendente');

----
SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;
