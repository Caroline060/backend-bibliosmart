import { Request, Response } from "express";
import { Livro } from "../model/Livro";

interface LivroDTO {
    titulo: string,
    autor: string,
    editora: string,
    anoPublicacao: string,
    isbn: string,
    quantTotal: number,
    quantDisponivel: number,
    valorAquisicao: number,
    statusLivroEmprestado: string
}

/**
 * A classe `LivroController` estende a classe `Livro` e é responsável
 * por controlar as requisições relacionadas aos livros.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando
 *   as operações relacionadas ao recurso "livro".
 * - Herdando de `Livro`, ela pode acessar métodos e propriedades da classe base.
 */
export class LivroController extends Livro {

    /**
     * Lista todos os livros.
     * 
     * Este método acessa a função de listagem de livros e retorna a lista de livros em formato JSON.
     * Caso ocorra um erro ao acessar a listagem, é enviado um status 400 com uma mensagem de erro.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de livros em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de livros.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os livros e armazena o resultado
            const listaDeLivros = await Livro.listagemLivros();

            // Retorna a lista de livros a quem fez a requisição web
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de livros');

            // Retorna uma mensagem de erro para quem chamou a rota
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de livros" });
        }
    }

    /**
     * Método controller para cadastrar um novo livro.
     * 
     * Esta função recebe uma requisição HTTP contendo os dados de um livro no corpo da requisição
     * e tenta cadastrar este livro no banco de dados utilizando a função `cadastroLivro`. Caso o cadastro 
     * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
     * uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param req Objeto de requisição HTTP, contendo o corpo com os dados do livro no formato `LivroDTO`.
     * @param res Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns Resposta HTTP com status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
     *         resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recupera as informações do corpo da requisição e coloca em um objeto da interface LivroDTO
            const livroRecebido: LivroDTO = req.body;

            // Cria uma nova instância de Livro com as informações recebidas
            const novoLivro = new Livro(
                livroRecebido.titulo,                
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado
            );

            console.log(novoLivro);

            // Chama a função de cadastro e armazena a resposta (true, false)
            const repostaClasse = await Livro.cadastroLivro(novoLivro);

            // Verifica a resposta da função e envia a mensagem para o cliente
            if(repostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro. Entre em contato com o administrador do sistema."})
            } 
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um livro. ${error}`);

            // Retorna uma mensagem de erro para quem chamou a rota
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise <any> {
        try {
            const idLivro = parseInt(req.params.idLivro as string);
            const respostaModelo = await Livro.removerLivro(idLivro);

            if(respostaModelo) {
                return res.status(200).json({mensagem: "O Livro foi removido com sucesso!"});
            } else {
                return res.status(400).json({mensagem: "Erro ao remover o Livro. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            console.log(`Erro ao remover um Livro. ${error}`);

            return res.status(400).json({ mensagem: "Não foi possível remover o livro. Entre em contato com o administrador do sistema." });
        }
    }
}
