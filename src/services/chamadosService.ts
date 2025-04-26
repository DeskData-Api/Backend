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
          tecnico_atribuido: true,
        }
      }
    );
  }

  async pln() {
    return await prisma.analisePlnChamados.findMany(
      {
        select: {
          id: true,
          frequentes_problema:true,
          frequencia_categorias:true,
          distribuicao_temporal:true,
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
        data_abertura: { not: undefined }, // Exclui chamados sem data de abertura
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

  async getSimilaridadeChamados() {
    const resultados = await prisma.similaridade_chamados.findMany({
      where: {
        score: {
          gte: 50,
          lte: 85,
        },
      },
      orderBy: {
        score: 'desc',
      },
      take: 200, // pega um conjunto maior para filtrar depois
    });
  
    const vistos = new Set<string>();
    const unicos = [];
  
    for (const item of resultados) {
      const [parte1, parte2] = item.label
        .toLowerCase()
        .split('≈')
        .map(str => str.trim().replace(/\s+/g, ''));
  
      const chave = parte1 < parte2 ? `${parte1}|${parte2}` : `${parte2}|${parte1}`;
  
      if (!vistos.has(chave) && parte1 !== parte2) {
        vistos.add(chave);
        unicos.push({
          name: item.label,
          qtd: Number(item.score.toFixed(2)),
        });
      }
  
      if (unicos.length >= 5) break; // ou aumente se quiser mais
    }
  
    return unicos;
  }

}