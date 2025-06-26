import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PessoaService } from '../service/pessoa.service';

interface PessoaDto {
  name: string;
  email?: string;
  matricula: string;
}

@Controller()
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post('alunos')
  async cadastrarAluno(@Body() aluno: PessoaDto) {
    return await this.pessoaService.cadastrarAluno(aluno);
  }

  @Get('alunos')
  async buscarTodosAlunos() {
    return await this.pessoaService.buscarTodosAlunos();
  }

  @Get('alunos/:id')
  async buscarAlunoPorId(@Param('id') id: string) {
    const aluno = await this.pessoaService.buscarAlunoPorId(id);
    if (!aluno) {
      return { message: 'Aluno não encontrado' };
    }
    return aluno;
  }

  @Delete('alunos/:id')
  async removerAluno(@Param('id') id: string) {
    await this.pessoaService.removerAlunoPorId(id);
    return { message: 'Aluno removido com sucesso' };
  }

  @Post('professores')
  async cadastrarProfessor(@Body() professor: PessoaDto) {
    return await this.pessoaService.cadastrarProfessor(professor);
  }

  @Get('professores')
  async buscarTodosProfessores() {
    return await this.pessoaService.buscarTodosProfessores();
  }

  @Get('professores/:id')
  async buscarProfessorPorId(@Param('id') id: string) {
    const professor = await this.pessoaService.buscarProfessorPorId(id);
    if (!professor) {
      return { message: 'Professor não encontrado' };
    }
    return professor;
  }
  @Delete('professores/:id')
  async removerProfessor(@Param('id') id: string) {
    await this.pessoaService.removerProfessorPorId(id);
    return { message: 'Professor removido com sucesso' };
  }
}
