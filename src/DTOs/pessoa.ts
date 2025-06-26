export interface CriarPessoaDto {
  name: string;
  email?: string;
  matricula: string;
}

export interface PessoaDto extends CriarPessoaDto {
  id: string;
}
