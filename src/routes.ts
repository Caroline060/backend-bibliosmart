import { Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";

// Cria um roteador
const router = Router();

// Rota principal da aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA ALUNOS
*/ 
// Rota para listar os alunos
router.get("/lista/alunos", AlunoController.todos);
// Rota para cadastrar um novo aluno
router.post("/novo/aluno", AlunoController.novo);
// Rota para remover aluno
router.delete("/remover/aluno/:idAluno", AlunoController.remover);

/* 
* ROTAS PARA LIVROS
*/ 
// Rota para listar os livros
router.get("/lista/livros", LivroController.todos);
// Rota para cadastrar um novo livro
router.post("/novo/livro", LivroController.novo);
// Rota para remover livro
router.delete("/remover/livro/:idLivro", LivroController.remover)

/* 
* ROTAS PARA EMPRÉSTIMOS
*/ 
// Rota para listar os empréstimos
router.get("/lista/emprestimos", EmprestimoController.todos);

export { router };
