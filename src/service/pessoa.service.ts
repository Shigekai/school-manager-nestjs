import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { CriarPessoaDto, PessoaDto } from 'src/DTOs/pessoa';

@Injectable()
export class PessoaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async cadastrarAluno(aluno: CriarPessoaDto): Promise<PessoaDto | null> {
    const id = crypto.randomUUID();
    await this.prisma.$executeRaw`
    INSERT INTO Aluno (id, name, email, matricula)
    VALUES (${id}, ${aluno.name}, ${aluno.email}, ${aluno.matricula})
  `;
    return this.buscarAlunoPorId(id);
  }

  async buscarAlunoPorId(id: string): Promise<PessoaDto | null> {
    const aluno = await this.prisma.$queryRaw<PessoaDto[]>`
      SELECT * FROM Aluno WHERE id = ${id}
    `;

    return aluno.length > 0 ? aluno[0] : null;
  }

  async buscarTodosAlunos(): Promise<PessoaDto[]> {
    return this.prisma.$queryRaw<PessoaDto[]>`
      SELECT * FROM Aluno
    `;
  }

  async removerAlunoPorId(id: string): Promise<void> {
    await this.prisma.$executeRaw`
      DELETE FROM Aluno WHERE id = ${id}
    `;
  }

  async cadastrarProfessor(
    professor: CriarPessoaDto,
  ): Promise<PessoaDto | null> {
    await this.prisma.$executeRaw<PessoaDto[]>`
      INSERT INTO Professor (id, name, email, matricula) 
      VALUES (${crypto.randomUUID()}, ${professor.name}, ${professor.email}, ${professor.matricula})
    `;

    return this.buscarProfessorPorId(professor.matricula);
  }

  async buscarProfessorPorId(id: string): Promise<PessoaDto | null> {
    const professores = await this.prisma.$queryRaw<PessoaDto[]>`
      SELECT * FROM Professor WHERE id = ${id}
    `;

    return professores.length > 0 ? professores[0] : null;
  }

  async buscarTodosProfessores(): Promise<PessoaDto[]> {
    return this.prisma.$queryRaw<PessoaDto[]>`
      SELECT * FROM Professor
    `;
  }

  async removerProfessorPorId(id: string) {
    await this.prisma.$executeRaw`
      DELETE FROM Professor WHERE id = ${id}
    `;
  }
}
