import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

interface EmprestimoDTO {
    idAluno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: string
}

/**
 * A classe `EmprestimoController` estende a classe `Emprestimo` e é responsável
 * por controlar as requisições relacionadas aos empréstimos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações
 *   relacionadas ao recurso "empréstimo".
 * - Herdando de `Emprestimo`, ela pode acessar métodos e propriedades da classe base.
 */
export class EmprestimoController extends Emprestimo {

    /**
     * Lista todos os empréstimos.
     * 
     * Este método acessa a função de listagem de empréstimos e retorna a lista de empréstimos em formato JSON.
     * Caso ocorra um erro ao acessar a listagem, é enviado um status 400 com uma mensagem de erro.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de empréstimos em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de empréstimos.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os empréstimos e armazena o resultado
            const listaDeEmprestimo = await Emprestimo.listagemEmprestimo();

            // Retorna a lista de empréstimos a quem fez a requisição web
            return res.status(200).json(listaDeEmprestimo);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de emprestimos');

            // Retorna uma mensagem de erro para quem chamou a rota
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de emprestimos" });
        }
    }

    static async atualizar (req:Request, res:Response): Promise<any> {
        try {
            const emprestimoRecebido: EmprestimoDTO = req.body;
            const idEmprestimoRecebido = parseInt(req.params.idAluno as string);
            const emprestimoAtualizado = new Emprestimo(
                emprestimoRecebido.idAluno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            emprestimoAtualizado.setIdEmprestimo(idEmprestimoRecebido);

            const respostaModelo = await Emprestimo.atualizarEmprestimo(emprestimoAtualizado)

            if (respostaModelo) {
                return res.status(200).json({mensagem: "Emprestimo atualizado com sucesso!"});
            } else {
                return res.status(400).json({mensagem: "Não foi possível atualizar o emprestimo. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            console.log(`Erro ao atualizar um emprestimo. ${error}`);

            return res.status(400).json({ mensagem: "Não foi possível atualizar o emprestimo. Entre em contato com o administrador do sistema." });
        }
    }
}
