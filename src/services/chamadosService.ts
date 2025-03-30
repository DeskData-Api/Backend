import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChamadosService {
  async listar() {
    return await prisma.chamados.findMany(
      {
        select: {
          id: true,
          titulo: true,
          entidade: true,
          categoria: true,
          localizacao: true,
          data_abertura: true,
          data_fechamento: true,
          status: true,
          descricao: true,
          elementos_associados: true,
          tecnico_atribuido:true,
        }
      }
    );
  }
  
  async listarId(id: number) {
    return await prisma.chamados.findUnique({
      where: { id },
      select: {
        id: true,
        titulo: true,
        entidade: true,
        categoria: true,
        localizacao: true,
        data_abertura: true,
        data_fechamento: true,
        status: true,
        descricao: true
      }
    });
  }

  async getChamadosPorMes() {
    const chamados = await prisma.chamados.groupBy({
      by: ['data_abertura'],
      _count: {
        id: true, // Conta o número de chamados
      },
      where: {
        data_abertura: { not: null }, // Exclui chamados sem data de abertura
      },
      orderBy: {
        data_abertura: 'asc', // Ordena por data crescente
      },
    });

    // Agrupar por mês
    const contagemPorMes: { [key: string]: number } = {};
    chamados.forEach((item) => {
      if (item.data_abertura) {
        const data = new Date(item.data_abertura);
        const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`; // Formato YYYY-MM
        contagemPorMes[mesAno] = (contagemPorMes[mesAno] || 0) + item._count.id;
      }
    });

    // Converter para o formato { name, qtd }
    const resultado = Object.entries(contagemPorMes).map(([name, qtd]) => ({
      name, // Ex: "2023-09"
      qtd,
    }));

    return resultado;
  }
}