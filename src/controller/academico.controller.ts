import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AcademicoService } from '../service/academico.service';
import {
  CriarDisciplinaDto,
  CriarTurmaDto,
  CriarAvaliacaoDto,
  CriarAvaliacaoAlunoDto,
  MatricularAlunoTurmaDto,
  AdicionarDisciplinaTurmaDto,
} from '../DTOs/academico';

@Controller()
export class AcademicoController {
  constructor(private readonly academicoService: AcademicoService) {}

  @Post('disciplinas')
  async cadastrarDisciplina(@Body() disciplina: CriarDisciplinaDto) {
    return await this.academicoService.cadastrarDisciplina(disciplina);
  }

  @Get('disciplinas')
  async buscarTodasDisciplinas() {
    return await this.academicoService.buscarTodasDisciplinas();
  }

  @Get('disciplinas/:id')
  async buscarDisciplinaPorId(@Param('id') id: string) {
    const disciplina = await this.academicoService.buscarDisciplinaPorId(id);
    if (!disciplina) {
      return { message: 'Disciplina não encontrada' };
    }
    return disciplina;
  }

  @Get('disciplinas/codigo/:codigo')
  async buscarDisciplinaPorCodigo(@Param('codigo') codigo: string) {
    const disciplina =
      await this.academicoService.buscarDisciplinaPorCodigo(codigo);
    if (!disciplina) {
      return { message: 'Disciplina não encontrada' };
    }
    return disciplina;
  }

  @Delete('disciplinas/:id')
  async removerDisciplina(@Param('id') id: string) {
    await this.academicoService.removerDisciplinaPorId(id);
    return { message: 'Disciplina removida com sucesso' };
  }

  @Post('turmas')
  async cadastrarTurma(@Body() turma: CriarTurmaDto) {
    return await this.academicoService.cadastrarTurma(turma);
  }

  @Get('turmas')
  async buscarTodasTurmas() {
    return await this.academicoService.buscarTodasTurmas();
  }

  @Get('turmas/:id')
  async buscarTurmaPorId(@Param('id') id: string) {
    const turma = await this.academicoService.buscarTurmaPorId(id);
    if (!turma) {
      return { message: 'Turma não encontrada' };
    }
    return turma;
  }

  @Delete('turmas/:id')
  async removerTurma(@Param('id') id: string) {
    await this.academicoService.removerTurmaPorId(id);
    return { message: 'Turma removida com sucesso' };
  }

  // MATRICULAS EM TURMAS
  @Post('turmas/matricular')
  async matricularAlunoEmTurma(@Body() dados: MatricularAlunoTurmaDto) {
    await this.academicoService.matricularAlunoEmTurma(dados);
    return { message: 'Aluno matriculado na turma com sucesso' };
  }

  @Delete('turmas/desmatricular')
  async removerAlunoTurma(@Body() dados: MatricularAlunoTurmaDto) {
    await this.academicoService.removerAlunoTurma(dados);
    return { message: 'Aluno removido da turma com sucesso' };
  }

  // DISCIPLINAS EM TURMAS
  @Post('turmas/adicionar-disciplina')
  async adicionarDisciplinaTurma(@Body() dados: AdicionarDisciplinaTurmaDto) {
    await this.academicoService.adicionarDisciplinaTurma(dados);
    return { message: 'Disciplina adicionada à turma com sucesso' };
  }

  @Delete('turmas/remover-disciplina')
  async removerDisciplinaTurma(@Body() dados: AdicionarDisciplinaTurmaDto) {
    await this.academicoService.removerDisciplinaTurma(dados);
    return { message: 'Disciplina removida da turma com sucesso' };
  }

  // AVALIAÇÕES
  @Post('avaliacoes')
  async cadastrarAvaliacao(@Body() avaliacao: CriarAvaliacaoDto) {
    return await this.academicoService.cadastrarAvaliacao(avaliacao);
  }

  @Get('avaliacoes')
  async buscarTodasAvaliacoes() {
    return await this.academicoService.buscarTodasAvaliacoes();
  }

  @Get('avaliacoes/:id')
  async buscarAvaliacaoPorId(@Param('id') id: string) {
    const avaliacao = await this.academicoService.buscarAvaliacaoPorId(id);
    if (!avaliacao) {
      return { message: 'Avaliação não encontrada' };
    }
    return avaliacao;
  }

  // NOTAS DOS ALUNOS
  @Post('notas')
  async registrarNotaAluno(@Body() nota: CriarAvaliacaoAlunoDto) {
    return await this.academicoService.registrarNotaAluno(nota);
  }

  @Get('notas/aluno/:alunoId')
  async buscarNotasPorAluno(@Param('alunoId') alunoId: string) {
    return await this.academicoService.buscarNotasPorAluno(alunoId);
  }

  @Get('notas/aluno/:alunoId/disciplina/:disciplinaId')
  async buscarNotasPorAlunoEmDisciplina(
    @Param('alunoId') alunoId: string,
    @Param('disciplinaId') disciplinaId: string,
  ) {
    return await this.academicoService.buscarNotasPorAlunoEmDisciplina(
      alunoId,
      disciplinaId,
    );
  }

  @Get('media/aluno/:alunoId/disciplina/:disciplinaId')
  async calcularMediaAlunoPorDisciplina(
    @Param('alunoId') alunoId: string,
    @Param('disciplinaId') disciplinaId: string,
  ) {
    const media = await this.academicoService.calcularMediaAlunoPorDisciplina(
      alunoId,
      disciplinaId,
    );
    return { media };
  }
}
