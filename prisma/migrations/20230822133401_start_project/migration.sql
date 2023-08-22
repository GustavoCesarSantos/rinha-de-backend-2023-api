-- CreateTable
CREATE TABLE "Pessoas" (
    "id" SERIAL NOT NULL,
    "pessoaID" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "stack" TEXT NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_pessoaID_key" ON "Pessoas"("pessoaID");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_apelido_key" ON "Pessoas"("apelido");
