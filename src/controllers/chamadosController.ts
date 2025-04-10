import { Request, Response } from 'express';
import { ChamadosService } from '../services/chamadosService';

const chamadosService = new ChamadosService();

// Interface para tipar o retorno do ChamadosService.listar()
interface Chamado {
  id: number;
  titulo: string;
  entidade: string | null;
  categoria: string | null;
  localizacao: string | null;
  data_abertura: Date | null;
  data_fechamento: Date | null;
  status: string | null;
  descricao: string | null;
  elementos_associados: string | null;
  tecnico_atribuido: string | null;
}

// Type guard para garantir que as datas não são null
function hasValidDates(chamado: Chamado): chamado is Chamado & { data_abertura: Date; data_fechamento: Date } {
  return chamado.data_abertura !== null && chamado.data_fechamento !== null;
}

export class ChamadosController {
  async dashboard(req: Request, res: Response) {
    try {
      const chamados = await chamadosService.listar();

      // Total de Chamados
      const total = chamados.length;

      // Chamados Abertos
      const abertos = chamados.filter(chamado => chamado.status === 'Processando').length;

      // Chamados Fechados
      const fechados = chamados.filter(chamado => chamado.status === 'Fechado').length;

      // Chamados Resolvidos
      const resolvidos = chamados.filter(chamado => chamado.status === 'RESOLVIDO').length;

      // Tempo Médio de Resposta
      const chamadosComResolucao = chamados.filter(chamado =>
        chamado.status === 'RESOLVIDO' || chamado.status === 'Fechado'
      );

      let tempoMedio = 0;
      if (chamadosComResolucao.length > 0) {
        const tempos = chamadosComResolucao
          .filter(hasValidDates) // Aplica o type guard
          .filter(chamado => chamado.data_fechamento) // Filtra casos onde fechamento é null
          .map(chamado => {
            const abertura = new Date(chamado.data_abertura); // Seguro após o type guard
            const fechamento = new Date(chamado.data_fechamento!); // Seguro após o type guard
            return (fechamento.getTime() - abertura.getTime()) / (1000 * 60 * 60);
          });

        if (tempos.length > 0) {
          tempoMedio = tempos.reduce((acc, curr) => acc + curr, 0) / tempos.length;
        }
      }

      // Agrupar por categoria e contar (Top 5)
      const categoriasCount = chamados.reduce((acc, chamado) => {
        const parts = (chamado.categoria || 'Sem Categoria').split(' > ');
        const simplifiedCategory = parts.length > 2 ? parts[2] : parts[1] || parts[0];
        acc[simplifiedCategory] = (acc[simplifiedCategory] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const top5Categorias = Object.entries(categoriasCount)
        .map(([name, qtd]) => ({ name, qtd }))
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 3);

      // Conta a frequência de cada elemento
      const contagem: { [key: string]: number } = {};
      chamados.forEach((item) => {
        const elemento = item.elementos_associados;
        if (elemento) {
          contagem[elemento] = (contagem[elemento] || 0) + 1;
        }
      });

      // Converte para array e ordena pelo valor (contagem)
      const top5Elementos = Object.entries(contagem)
        .map(([categoria, qtd]) => ({ categoria, qtd }))
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 3);
      // Resposta consolidada

      const contagemColaborador: { [key: string]: number } = {};
      chamados.forEach((item) => {
        const elemento = item.tecnico_atribuido;
        if (elemento) {
          contagemColaborador[elemento] = (contagemColaborador[elemento] || 0) + 1;
        }
      });

      const colaboradores = Object.entries(contagemColaborador)
        .map(([name, qtd]) => ({ name, qtd }))
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 5);

      const chamadosPorMes = await chamadosService.getChamadosPorMes();

      res.json({
        total,
        abertos,
        fechados,
        resolvidos,
        tempoMedio: Number(tempoMedio.toFixed(2)), // Descomentei, mas pode manter comentado se preferir
        top5Categorias,
        top5Elementos,
        chamadosPorMes,
        colaboradores
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
  }

  async listar(req: Request, res: Response) {
    const chamados = await chamadosService.listar();
    res.status(200).json(chamados);
  }

  async listarId(req: Request, res: Response) {
    const { id } = req.params;
    const chamado = await chamadosService.listarId(Number(id));
    if (chamado) {
      res.status(200).json(chamado);
    } else {
      res.status(404).json({ error: 'Chamado não encontrado' });
    }
  }


}

export default new ChamadosController();