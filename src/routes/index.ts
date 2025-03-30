import { Router, Request, Response } from "express";

import { default as ChamadosController } from './chamadosRoutes';

const router = Router();

router.use("/chamados", ChamadosController);

export default router;