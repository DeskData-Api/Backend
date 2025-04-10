-- CreateTable
CREATE TABLE "chamados" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "entidade" TEXT,
    "categoria" TEXT,
    "localizacao" TEXT,
    "elementos_associados" TEXT NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL,
    "data_fechamento" TIMESTAMP(3),
    "tempo_interno_excedido" BOOLEAN,
    "tempo_resposta" TIMESTAMP(3),
    "tempo_interno_resposta" TIMESTAMP(3),
    "descricao" TEXT,
    "plugins" TEXT,
    "solucao" TEXT,
    "status" TEXT,
    "tipo" TEXT,
    "tecnico_atribuido" TEXT,
    "fornecedor_atribuido" TEXT,
    "ultima_atualizacao" TIMESTAMP(3),

    CONSTRAINT "chamados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chamados_simplificados" (
    "id_da_item" INTEGER NOT NULL,
    "resumo" TEXT NOT NULL,
    "tipo" TEXT,
    "status" TEXT,
    "nome_do_projeto" TEXT,
    "responsavel" TEXT,
    "criado" TIMESTAMP(3),
    "atualizado" TIMESTAMP(3),
    "resolvido" TIMESTAMP(3),
    "descricao" TEXT,
    "anexos" TEXT,

    CONSTRAINT "chamados_simplificados_pkey" PRIMARY KEY ("id_da_item")
);

-- CreateIndex
CREATE INDEX "chamados_status_idx" ON "chamados"("status");

-- CreateIndex
CREATE INDEX "chamados_data_abertura_idx" ON "chamados"("data_abertura");

-- CreateIndex
CREATE INDEX "chamados_simplificados_status_idx" ON "chamados_simplificados"("status");

-- CreateIndex
CREATE INDEX "chamados_simplificados_criado_idx" ON "chamados_simplificados"("criado");
