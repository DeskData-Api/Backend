import { Router, Request, Response } from "express";
import { ChamadosController } from '../controllers';

const routes = Router();

routes.get('/dashboard', ChamadosController.dashboard);
routes.get('/abertos', ChamadosController.listar);
routes.get('/similaridade', ChamadosController.similaridadeChamados);
routes.get('/:id', ChamadosController.listarId);

export default routes;