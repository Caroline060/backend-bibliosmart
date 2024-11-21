import { DatabaseModel } from "./DataBaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/* Classe que representa um Aluno */
export class Aluno {

    /* Identificador do Aluno */
    private idAluno: number = 0;
    /* ra do Aluno */
    private ra: string = "";
    /* Nome do Aluno */
    private nome: string;
    /* Sobrenome do Aluno */
    private sobrenome: string;
    /* Data de Nascimento do Aluno */
    private dataNascimento: Date;
    /* Endereço do Aluno */
    private endereco: string;
    /* Email de contato do Aluno */
    private email: string;
    /* Número de celular do Aluno */
    private celular: string;

    /**
     * Construtor da classe Aluno
     *
     * @param idAluno Identificador único do aluno
     * @param ra Registro Acadêmico do aluno
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email Email do aluno
     * @param celular Número de celular do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno
     * @returns {number} O identificador do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define um novo identificador para o aluno
     * @param idAluno Novo identificador do aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Recupera o Registro Acadêmico do aluno
     * @returns {string} O Registro Acadêmico do aluno
     */
    public getRa(): string {
        return this.ra;
    }

    /**
     * Define um novo Registro Acadêmico para o aluno
     * @param ra Novo Registro Acadêmico do aluno
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }

    /**
     * Recupera o nome do aluno
     * @returns {string} O nome do aluno
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define um novo nome para o aluno
     * @param nome Novo nome do aluno
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Recupera o sobrenome do aluno
     * @returns {string} O sobrenome do aluno
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define um novo sobrenome para o aluno
     * @param sobrenome Novo sobrenome do aluno
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Recupera a data de nascimento do aluno
     * @returns {Date} A data de nascimento do aluno
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define uma nova data de nascimento para o aluno
     * @param dataNascimento Nova data de nascimento do aluno
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * Recupera o endereço do aluno
     * @returns {string} O endereço do aluno
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define um novo endereço para o aluno
     * @param endereco Novo endereço do aluno
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * Recupera o email do aluno
     * @returns {string} O email do aluno
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define um novo email para o aluno
     * @param email Novo email do aluno
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Recupera o número de celular do aluno
     * @returns {string} O número de celular do aluno
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define um novo número de celular para o aluno
     * @param celular Novo número de celular do aluno
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    static async listagemAlunos(): Promise<Array<Aluno> | null> {
        // Objeto para armazenar a lista de alunos
        const listaDeAlunos: Array<Aluno> = [];

        try {
            // Query de consulta para selecionar todos os alunos do banco de dados
            const querySelectAluno = `SELECT * FROM aluno;`;

            // Executa a consulta e armazena a resposta
            const respostaBD = await database.query(querySelectAluno);

            // Itera sobre as linhas do resultado da consulta para criar objetos Aluno
            respostaBD.rows.forEach((linha: any) => {
                // Cria uma nova instância de Aluno com os dados da linha
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.sobrenome,
                    linha.dataNascimento,
                    linha.endereco,
                    linha.email,
                    linha.celular
                );

                // Atribui o ID do aluno à instância de Aluno
                novoAluno.setIdAluno(linha.id_aluno);

                // Adiciona o objeto aluno à lista de alunos
                listaDeAlunos.push(novoAluno);
            });

            // Retorna a lista de alunos criada
            return listaDeAlunos;

        } catch (error) {
            // Log de erro caso ocorra uma falha na consulta
            console.log('Erro ao buscar lista de alunos. Verifique os logs para mais detalhes.');
            console.log(error);
            return null; // Retorna null em caso de erro na consulta
        }
    }

    static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // Query para inserir um novo aluno no banco de dados
            const queryInsertAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                      VALUES
                                      ('${aluno.getNome()}', 
                                      '${aluno.getSobrenome()}', 
                                      '${aluno.getDataNascimento()}', 
                                      '${aluno.getEndereco()}',
                                      '${aluno.getEmail()}',
                                      '${aluno.getCelular()}')
                                      RETURNING id_aluno;`;

            // Executa a query no banco de dados e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);

            // Verifica se a quantidade de linhas afetadas é diferente de 0 (indicando sucesso)
            if (respostaBD.rowCount !== 0) {
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
                return true; // Retorna true indicando sucesso no cadastro
            }

            return false; // Retorna false caso não tenha ocorrido a inserção

        } catch (error) {
            // Log de erro no console caso ocorra uma falha na inserção
            console.log('Erro ao cadastrar aluno. Verifique os logs para mais detalhes.');
            console.log(error);
            return false; // Retorna false em caso de erro
        }
    }

    static async removerAluno(idAluno: number): Promise<boolean>{
        try{
            const queryDeleteAluno = `DELETE FROM aluno WHERE id_aluno = ${idAluno}`;

            const respostaBD = await database.query(queryDeleteAluno);

            if(respostaBD.rowCount != 0) {
                console.log('Aluno removido com sucesso!');
                return true;
            } return false;

        } catch (error) {
            console.log('Erro ao remover aluno. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}
