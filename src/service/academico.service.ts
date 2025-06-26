import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import {
  CriarDisciplinaDto,
  DisciplinaDto,
  CriarTurmaDto,
  TurmaDto,
  CriarAvaliacaoDto,
  AvaliacaoDto,
  CriarAvaliacaoAlunoDto,
  AvaliacaoAlunoDto,
  MatricularAlunoTurmaDto,
  AdicionarDisciplinaTurmaDto,
} from 'src/DTOs/academico';

@Injectable()
export class AcademicoService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async cadastrarDisciplina(
    disciplina: CriarDisciplinaDto,
  ): Promise<DisciplinaDto | null> {
    const id = crypto.randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO Disciplina (id, nome, codigo, professorId)
      VALUES (${id}, ${disciplina.nome}, ${disciplina.codigo}, ${disciplina.professorId})
    `;
    return this.buscarDisciplinaPorId(id);
  }

  async buscarDisciplinaPorId(id: string): Promise<DisciplinaDto | null> {
    const disciplinas = await this.prisma.$queryRaw<DisciplinaDto[]>`
      SELECT * FROM Disciplina WHERE id = ${id}
    `;
    return disciplinas.length > 0 ? disciplinas[0] : null;
  }

  async buscarDisciplinaPorCodigo(
    codigo: string,
  ): Promise<DisciplinaDto | null> {
    const disciplinas = await this.prisma.$queryRaw<DisciplinaDto[]>`
      SELECT * FROM Disciplina WHERE codigo = ${codigo}
    `;
    return disciplinas.length > 0 ? disciplinas[0] : null;
  }

  async buscarTodasDisciplinas(): Promise<DisciplinaDto[]> {
    return this.prisma.$queryRaw<DisciplinaDto[]>`
      SELECT * FROM Disciplina
    `;
  }

  async removerDisciplinaPorId(id: string): Promise<void> {
    await this.prisma.$executeRaw`
      DELETE FROM Disciplina WHERE id = ${id}
    `;
  }

  async cadastrarTurma(turma: CriarTurmaDto): Promise<TurmaDto | null> {
    const id = crypto.randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO Turma (id, nomeTurma, codigo, professorId)
      VALUES (${id}, ${turma.nomeTurma}, ${turma.codigo}, ${turma.professorId})
    `;
    return this.buscarTurmaPorId(id);
  }

  async buscarTurmaPorId(id: string): Promise<TurmaDto | null> {
    const turmas = await this.prisma.$queryRaw<TurmaDto[]>`
      SELECT * FROM Turma WHERE id = ${id}
    `;
    return turmas.length > 0 ? turmas[0] : null;
  }

  async buscarTodasTurmas(): Promise<TurmaDto[]> {
    return this.prisma.$queryRaw<TurmaDto[]>`
      SELECT * FROM Turma
    `;
  }

  async removerTurmaPorId(id: string): Promise<void> {
    await this.prisma.$executeRaw`
      DELETE FROM Turma WHERE id = ${id}
    `;
  }

  // MATRICULAR ALUNO EM TURMA
  async matricularAlunoEmTurma(dados: MatricularAlunoTurmaDto): Promise<void> {
    await this.prisma.$executeRaw`
      INSERT INTO TurmaAluno (turmaId, alunoId)
      VALUES (${dados.turmaId}, ${dados.alunoId})
    `;
  }

  async removerAlunoTurma(dados: MatricularAlunoTurmaDto): Promise<void> {
    await this.prisma.$executeRaw`
      DELETE FROM TurmaAluno 
      WHERE turmaId = ${dados.turmaId} AND alunoId = ${dados.alunoId}
    `;
  }

  async adicionarDisciplinaTurma(
    dados: AdicionarDisciplinaTurmaDto,
  ): Promise<void> {
    await this.prisma.$executeRaw`
      INSERT INTO TurmaDisciplina (turmaId, disciplinaId)
      VALUES (${dados.turmaId}, ${dados.disciplinaId})
    `;
  }

  async removerDisciplinaTurma(
    dados: AdicionarDisciplinaTurmaDto,
  ): Promise<void> {
    await this.prisma.$executeRaw`
      DELETE FROM TurmaDisciplina 
      WHERE turmaId = ${dados.turmaId} AND disciplinaId = ${dados.disciplinaId}
    `;
  }

  // AVALIAÇÕES
  async cadastrarAvaliacao(
    avaliacao: CriarAvaliacaoDto,
  ): Promise<AvaliacaoDto | null> {
    const id = crypto.randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO Avaliacao (id, codigo, nome, notaMaxima, tipo, tipoProva, tipoTrabalho, professorId, disciplinaId)
      VALUES (${id}, ${avaliacao.codigo}, ${avaliacao.nome}, ${avaliacao.notaMaxima}, 
              ${avaliacao.tipo}, ${avaliacao.tipoProva}, ${avaliacao.tipoTrabalho}, 
              ${avaliacao.professorId}, ${avaliacao.disciplinaId})
    `;
    return this.buscarAvaliacaoPorId(id);
  }

  async buscarAvaliacaoPorId(id: string): Promise<AvaliacaoDto | null> {
    const avaliacoes = await this.prisma.$queryRaw<AvaliacaoDto[]>`
      SELECT * FROM Avaliacao WHERE id = ${id}
    `;
    return avaliacoes.length > 0 ? avaliacoes[0] : null;
  }

  async buscarTodasAvaliacoes(): Promise<AvaliacaoDto[]> {
    return this.prisma.$queryRaw<AvaliacaoDto[]>`
      SELECT * FROM Avaliacao
    `;
  }

  // AVALIAÇÕES DE ALUNOS (NOTAS)
  async registrarNotaAluno(
    nota: CriarAvaliacaoAlunoDto,
  ): Promise<AvaliacaoAlunoDto | null> {
    const id = crypto.randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO AvaliacaoAluno (id, alunoId, avaliacaoId, notaObtida)
      VALUES (${id}, ${nota.alunoId}, ${nota.avaliacaoId}, ${nota.notaObtida})
    `;
    return this.buscarNotaAlunoPorId(id);
  }

  async buscarNotaAlunoPorId(id: string): Promise<AvaliacaoAlunoDto | null> {
    const notas = await this.prisma.$queryRaw<AvaliacaoAlunoDto[]>`
      SELECT * FROM AvaliacaoAluno WHERE id = ${id}
    `;
    return notas.length > 0 ? notas[0] : null;
  }

  async buscarNotasPorAluno(alunoId: string): Promise<AvaliacaoAlunoDto[]> {
    return this.prisma.$queryRaw<AvaliacaoAlunoDto[]>`
      SELECT * FROM AvaliacaoAluno WHERE alunoId = ${alunoId}
    `;
  }

  async buscarNotasPorAlunoEmDisciplina(
    alunoId: string,
    disciplinaId: string,
  ): Promise<AvaliacaoAlunoDto[]> {
    return this.prisma.$queryRaw<AvaliacaoAlunoDto[]>`
      SELECT aa.* FROM AvaliacaoAluno aa
      INNER JOIN Avaliacao a ON aa.avaliacaoId = a.id
      WHERE aa.alunoId = ${alunoId} AND a.disciplinaId = ${disciplinaId}
    `;
  }

  async calcularMediaAlunoPorDisciplina(
    alunoId: string,
    disciplinaId: string,
  ): Promise<number> {
    const resultado = await this.prisma.$queryRaw<{ media: number }[]>`
      SELECT AVG(aa.notaObtida) as media FROM AvaliacaoAluno aa
      INNER JOIN Avaliacao a ON aa.avaliacaoId = a.id
      WHERE aa.alunoId = ${alunoId} AND a.disciplinaId = ${disciplinaId}
    `;
    return resultado[0]?.media || 0;
  }
}
