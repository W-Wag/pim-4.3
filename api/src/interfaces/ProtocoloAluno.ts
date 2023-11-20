import { Controller } from './ProtocoloController';

export interface Aluno {
  Aluno: {
    cpf: string;
    nome: string;
    email: string;
    dt_nascimento: string;
    rg: string;
    telefone: string;
    telefone2: string;
    genero: 'H' | 'M';
  };

  ra: string;
  situacao: string;
}

export interface AlunoRoutes {
  index: Controller;
  acharUmAluno: Controller;
  criarAluno: Controller;
  atualizarAluno: Controller;
  desativarMatricula: Controller;
  deletarMuitos: Controller;
  deletar: Controller;
  deletarMatricula: Controller;
}
