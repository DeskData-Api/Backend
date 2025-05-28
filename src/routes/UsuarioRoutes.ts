import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers";
import { auth } from "../auth";

const routes = Router();

function asyncHandler(
	fn: (req: Request, res: Response, next: (err?: any) => void) => Promise<any>
) {
	return function (req: Request, res: Response, next: (err?: any) => void): void {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

routes.post('/criar', asyncHandler(UsuarioController.criarUsuario));
routes.get('/listar', asyncHandler(UsuarioController.listarUsuarios));
routes.get('/listar/:id',  asyncHandler(UsuarioController.obterUsuarioPorId));
routes.put('/atualizar/:id',  asyncHandler(UsuarioController.atualizarUsuario));
routes.delete('/deletar/:id',  asyncHandler(UsuarioController.excluirUsuario));
routes.get('/usuario-logado',  asyncHandler(UsuarioController.obterUsuarioLogado));

// routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));
export default routes;