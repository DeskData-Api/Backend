/*
  Warnings:

  - You are about to alter the column `titulo` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `entidade` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `categoria` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `localizacao` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `elementos_associados` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `plugins` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `status` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `tipo` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `tecnico_atribuido` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fornecedor_atribuido` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `resumo` on the `chamados_simplificados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tipo` on the `chamados_simplificados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `status` on the `chamados_simplificados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `nome_do_projeto` on the `chamados_simplificados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `responsavel` on the `chamados_simplificados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "chamados" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "titulo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "entidade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "categoria" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "localizacao" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "elementos_associados" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "data_abertura" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "data_fechamento" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "tempo_resposta" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "tempo_interno_resposta" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "plugins" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "tipo" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "tecnico_atribuido" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fornecedor_atribuido" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "ultima_atualizacao" SET DATA TYPE TIMESTAMP(6);
DROP SEQUENCE "chamados_id_seq";

-- AlterTable
ALTER TABLE "chamados_simplificados" ALTER COLUMN "resumo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tipo" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "nome_do_projeto" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "responsavel" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "criado" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "atualizado" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "resolvido" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "similaridade_chamados" (
    "id" SERIAL NOT NULL,
    "chamado_1" INTEGER NOT NULL,
    "chamado_2" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "score" DECIMAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "similaridade_chamados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analise_pln_chamados" (
    "id" SERIAL NOT NULL,
    "frequentes_problema" JSONB NOT NULL,
    "agrupamento_categorias" JSONB NOT NULL,
    "frequencia_categorias" JSONB NOT NULL,
    "distribuicao_temporal" JSONB NOT NULL,
    "data_analise" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insights_temporais" TEXT[],

    CONSTRAINT "analise_pln_chamados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topicos_lda" (
    "id" SERIAL NOT NULL,
    "data_analise" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topicos" JSONB NOT NULL,

    CONSTRAINT "topicos_lda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- RenameIndex
ALTER INDEX "chamados_data_abertura_idx" RENAME TO "idx_chamados_data_abertura";

-- RenameIndex
ALTER INDEX "chamados_status_idx" RENAME TO "idx_chamados_status";

-- RenameIndex
ALTER INDEX "chamados_simplificados_criado_idx" RENAME TO "idx_chamados_simplificados_criado";

-- RenameIndex
ALTER INDEX "chamados_simplificados_status_idx" RENAME TO "idx_chamados_simplificados_status";
