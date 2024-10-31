import { DatabaseModel } from "./DataBaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/* Classe que representa Empréstimo */
export class Emprestimo {

    /* Identificador do Empréstimo */
    private idEmprestimo: number = 0;
    /* identificador do aluno */
    private idAluno: number = 0;
    /* identificador do livro */
    private idLivro: number = 0;
    /* data do empréstimo */
    private dataEmprestimo: Date;
    /* data da devolução */
    private dataDevolucao: Date;
    /* status do empréstimo */
    private statusEmprestimo: string;

    /**
     * Construtor da classe Emprestimo
     * 
     * @param idAluno Aluno que realiza o empréstimo
     * @param idLivro Livro a ser emprestado
     * @param dataEmprestimo Data do empréstimo
     * @param dataDevolucao Data da devolução
     * @param statusEmprestimo Status do empréstimo
     */
    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do empréstimo
     * @returns o identificador do empréstimo
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao identificador do empréstimo
     * @param idEmprestimo novo identificador do empréstimo
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * Retorna a data do empréstimo.
     *
     * @returns {Date} a data do empréstimo.
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo; 
    }

    /**
     * Define a data do empréstimo.
     * 
     * @param dataEmprestimo - a data do empréstimo a ser definida.
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data da devolução.
     *
     * @returns {Date} a data da devolução.
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Define a data da devolução.
     *
     * @param dataDevolucao - a data da devolução a ser definida.
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna o status do empréstimo.
     *
     * @returns {string} o status do empréstimo.
     */
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    /**
     * Define o status do empréstimo.
     *
     * @param statusEmprestimo - o status do empréstimo a ser definido.
     */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    static async listagemEmprestimo(): Promise<Array<Emprestimo> | null> {
        // Objeto para armazenar a lista de empréstimos
        const listaDeEmprestimo: Array<Emprestimo> = [];
    
        try {
            // Query de consulta para selecionar todos os empréstimos do banco de dados
            const querySelectEmprestimo = `SELECT * FROM emprestimo;`;
    
            // Executa a consulta e armazena a resposta
            const respostaBD = await database.query(querySelectEmprestimo);
    
            // Itera sobre as linhas do resultado da consulta para criar objetos Emprestimo
            respostaBD.rows.forEach((linha:any) => {
                // Cria uma nova instância de Emprestimo com os dados da linha
                const novoEmprestimo = new Emprestimo(
                    linha.idAluno,
                    linha.idLivro,
                    linha.dataEmprestimo,
                    linha.dataDevolucao,
                    linha.statusEmprestimo
                );
    
                // Atribui o ID do empréstimo à instância de Emprestimo
                novoEmprestimo.setIdEmprestimo(linha.id_emprestimo);
    
                // Adiciona o objeto Emprestimo à lista de empréstimos
                listaDeEmprestimo.push(novoEmprestimo);
            });
    
            // Retorna a lista de empréstimos criada
            return listaDeEmprestimo;
    
        } catch (error) {
            // Log de erro caso ocorra uma falha na consulta
            console.log('Erro ao buscar lista de empréstimos. Verifique os logs para mais detalhes.');
            console.log(error);
            return null; // Retorna null em caso de erro na consulta
        }
    }
}    