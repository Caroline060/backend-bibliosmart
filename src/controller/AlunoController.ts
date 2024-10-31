import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

// Define a interface para AlunoDTO, usada para tipar os dados recebidos na criação de um novo aluno
interface AlunoDTO {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
    endereco: string,
    email: string,
    celular: string
}

/**
 * A classe `AlunoController` estende a classe `Aluno` e controla as requisições HTTP relacionadas a alunos.
 *
 * - Esta classe age como um controlador em uma API REST, manipulando operações associadas ao recurso "aluno".
 * - Herdando de `Aluno`, permite o uso de métodos e propriedades da classe base.
 */
export class AlunoController extends Aluno {

    /**
     * Método para listar todos os alunos.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Uma lista de alunos em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama a função de listagem de alunos e armazena o resultado
            const listaDeAlunos = await Aluno.listagemAlunos();

            // Retorna a lista de alunos em resposta à requisição HTTP
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            // Log de erro no console
            console.log('Erro ao acessar listagem de alunos');

            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de alunos" });
        }
    }

    /**
     * Método para cadastrar um novo aluno.
     * 
     * Este método recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
     * e tenta cadastrar esse aluno no banco de dados usando o método `cadastroAluno`. Em caso de sucesso, 
     * retorna uma resposta HTTP 200 com uma mensagem de confirmação; caso contrário, uma resposta HTTP 400.
     * 
     * @param req - Objeto de requisição HTTP, contendo os dados do aluno no corpo da requisição no formato `AlunoDTO`.
     * @param res - Objeto de resposta HTTP utilizado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com status 200 em caso de sucesso ou 400 em caso de erro.
     * 
     * @throws {Error} - Caso ocorra um erro durante o cadastro, exibe uma mensagem no console e responde com status 400.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Extrai os dados do corpo da requisição e os atribui a um objeto conforme a interface AlunoDTO
            const alunoRecebido: AlunoDTO = req.body;

            // Cria uma nova instância de Aluno com os dados recebidos
            const novoAluno = new Aluno(alunoRecebido.nome,                
                                        alunoRecebido.sobrenome,
                                        alunoRecebido.dataNascimento,
                                        alunoRecebido.endereco,
                                        alunoRecebido.email,
                                        alunoRecebido.celular);

            // Chama o método de cadastro e armazena o resultado (verdadeiro/falso)
            const repostaClasse = await Aluno.cadastroAluno(novoAluno);

            // Verifica a resposta do método e retorna a mensagem correspondente ao cliente
            if(repostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro em caso de falha
                return res.status(400).json({ mensagem: "Erro ao cadastrar o aluno. Entre em contato com o administrador do sistema."});
            } 
        } catch (error) {
            // Loga o erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }
}
