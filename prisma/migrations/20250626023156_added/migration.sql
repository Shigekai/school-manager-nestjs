-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "notaMaxima" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "tipoProva" TEXT,
    "tipoTrabalho" TEXT,
    "professorId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    CONSTRAINT "Avaliacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AvaliacaoAluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alunoId" TEXT NOT NULL,
    "avaliacaoId" TEXT NOT NULL,
    "notaObtida" REAL NOT NULL,
    CONSTRAINT "AvaliacaoAluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AvaliacaoAluno_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_codigo_key" ON "Avaliacao"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "AvaliacaoAluno_alunoId_avaliacaoId_key" ON "AvaliacaoAluno"("alunoId", "avaliacaoId");
