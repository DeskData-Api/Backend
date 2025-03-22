import { Request, Response } from 'express';
import { ChamadosService } from '../services/chamadosService';

const chamadosService = new ChamadosService();

export class ChamadosController {
  async getOpenChamados(req: Request, res: Response) {
    try {
      const chamados = await chamadosService.getOpenChamados();
      return res.status(200).json({
        success: true,
        count: chamados.length,
        data: chamados
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição'
      });
    }
  }

  async getChamadoById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const chamado = await chamadosService.getChamadoById(id);
      
      if (!chamado) {
        return res.status(404).json({
          success: false,
          message: 'Chamado não encontrado'
        });
      }

      return res.status(200).json({
        success: true,
        data: chamado
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição'
      });
    }
  }
}