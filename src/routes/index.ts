import { Router, Request, Response } from "express";

import { default as UsuarioRoutes } from "./UsuarioRoutes";
import { default as ChamadosRoutes } from "./ChamadosRoutes";
import { LoginController } from "../controllers/LoginController";
const router = Router();

router.use("/usuario", UsuarioRoutes);
router.use("/chamados", ChamadosRoutes);
router.post("/login", (req: Request, res: Response, next) => {
	Promise.resolve(LoginController.login(req, res))
		.catch(next);
});

export default router;