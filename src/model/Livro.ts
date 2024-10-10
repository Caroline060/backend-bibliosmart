/* Classe que representa um Livro */
export class Livro {

    /* Identificador do Livro */
    private idLivro: number = 0;
    /* Título do Livro */
    private titulo: string;
    /* Autor do Livro */
    private autor: string;
    /* Editora do Livro */
    private editora: string;
    /* Ano de publicação do Livro */
    private anoPublicacao: string;
    /* ISBN do Livro */
    private isbn: string;
    /* Quantidade total de cópias do Livro */
    private quantTotal: number = 0;
    /* Quantidade de cópias disponíveis para empréstimo */
    private quantDisponivel: number = 0;
    /* Valor de aquisição do Livro */
    private valorAquisicao: number = 0;
    /* Status do Livro em relação a empréstimos */
    private statusLivroEmprestado: string;

    /**
     * Construtor da classe Livro
     *
     * @param idLivro Identificador único do livro
     * @param titulo Título do livro
     * @param autor Autor do livro
     * @param editora Editora do livro
     * @param anoPublicacao Ano de publicação do livro
     * @param isbn ISBN do livro
     * @param quantTotal Quantidade total de cópias do livro
     * @param quantDisponivel Quantidade de cópias disponíveis para empréstimo
     * @param valorAquisicao Valor de aquisição do livro
     * @param statusLivroEmprestado Status do livro em relação a empréstimos
     */
    constructor (
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: string,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string
    ) {
        this.titulo = titulo; 
        this.autor = autor; 
        this.editora = editora; 
        this.anoPublicacao = anoPublicacao; 
        this.isbn = isbn; 
        this.quantTotal = quantTotal; 
        this.quantDisponivel = quantDisponivel; 
        this.valorAquisicao = valorAquisicao; 
        this.statusLivroEmprestado = statusLivroEmprestado; 
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do livro
     * @returns O identificador do livro
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define um novo identificador para o livro
     * @param idLivro Novo identificador do livro
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Recupera o título do livro
     * @returns O título do livro
     */
    public getTitulo(): string {
        return this.titulo; 
    }

    /**
     * Define um novo título para o livro
     * @param titulo Novo título do livro
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    /**
     * Recupera o autor do livro
     * @returns O autor do livro
     */
    public getAutor(): string {
        return this.autor;
    }

    /**
     * Define um novo autor para o livro
     * @param autor Novo autor do livro
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * Recupera a editora do livro
     * @returns {string} A editora do livro
     */
    public getEditora(): string {
        return this.editora;
    }

    /**
     * Define uma nova editora para o livro
     * @param editora Nova editora do livro
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

    /**
     * Recupera o ano de publicação do livro
     * @returns {string} O ano de publicação do livro
     */
    public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }

    /**
     * Define um novo ano de publicação para o livro
     * @param anoPublicacao Novo ano de publicação do livro
     */
    public setAnoPublicacao(anoPublicacao: string): void {
        this.anoPublicacao = anoPublicacao;
    }

    /**
     * Recupera o ISBN do livro
     * @returns {string} O ISBN do livro
     */
    public getIsbn(): string {
        return this.isbn;
    }

    /**
     * Define um novo ISBN para o livro
     * @param isbn Novo ISBN do livro
     */
    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    /**
     * Recupera a quantidade total de cópias do livro
     * @returns {number} A quantidade total de cópias
     */
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    /**
     * Define uma nova quantidade total de cópias para o livro
     * @param quantTotal Nova quantidade total de cópias
     */
    public setQuantTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

    /**
     * Recupera a quantidade disponível de cópias do livro
     * @returns {number} A quantidade disponível
     */
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    /**
     * Define uma nova quantidade disponível para o livro
     * @param quantDisponivel Nova quantidade disponível
     */
    public setQuantDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

    /**
     * Recupera o valor de aquisição do livro
     * @returns {number} O valor de aquisição
     */
    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    /**
     * Define um novo valor de aquisição para o livro
     * @param valorAquisicao Novo valor de aquisição
     */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

    /**
     * Recupera o status do livro em relação a empréstimos
     * @returns {string} O status do livro
     */
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    /**
     * Define um novo status para o livro em relação a empréstimos
     * @param statusLivroEmprestado Novo status do livro
     */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }
}