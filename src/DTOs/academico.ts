// Disciplina DTOs
export interface CriarDisciplinaDto {
  nome: string;
  codigo: string;
  professorId: string;
}

export interface DisciplinaDto extends CriarDisciplinaDto {
  id: string;
}

export interface CriarTurmaDto {
  nomeTurma: string;
  codigo: string;
  professorId: string;
}

export interface TurmaDto extends CriarTurmaDto {
  id: string;
}

export interface CriarAvaliacaoDto {
  codigo: string;
  nome: string;
  notaMaxima: number;
  tipo: 'PROVA' | 'TRABALHO';
  tipoProva?: 'FINAL' | 'PARCIAL' | 'RECUPERACAO';
  tipoTrabalho?: 'PROJETO' | 'PESQUISA';
  professorId: string;
  disciplinaId: string;
}

export interface AvaliacaoDto extends CriarAvaliacaoDto {
  id: string;
}

export interface CriarAvaliacaoAlunoDto {
  alunoId: string;
  avaliacaoId: string;
  notaObtida: number;
}

export interface AvaliacaoAlunoDto extends CriarAvaliacaoAlunoDto {
  id: string;
}

export interface MatricularAlunoTurmaDto {
  alunoId: string;
  turmaId: string;
}

export interface AdicionarDisciplinaTurmaDto {
  disciplinaId: string;
  turmaId: string;
}
