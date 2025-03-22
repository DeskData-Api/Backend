import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChamadosService {
  async getOpenChamados() {
    try {
      return await prisma.chamados.findMany({
        where: {
          status: 'Aberto'
        },
        orderBy: {
          data_abertura: 'desc'
        },
        select: {
          id: true,
          titulo: true,
          entidade: true,
          categoria: true,
          localizacao: true,
          data_abertura: true,
          status: true,
          tecnico_atribuido: true,
          descricao: true
        }
      });
    } catch (error) {
      throw new Error('Erro ao buscar chamados abertos');
    }
  }

  async getChamadoById(id: number) {
    try {
      return await prisma.chamados.findUnique({
        where: { id },
        include: {
          simplificado: {
            select: {
              resumo: true,
              tipo_do_ticket: true,
              nome_do_projeto: true,
              anexos: true
            }
          }
        }
      });
    } catch (error) {
      throw new Error('Erro ao buscar detalhes do chamado');
    }
  }
}