import { Router } from 'express';
import { ChamadosController } from '../controllers/chamadosController';

const router = Router();
const controller = new ChamadosController();

router.get('/chamados/abertos', controller.getOpenChamados);
router.get('/chamados/:id', controller.getChamadoById);

export default router;