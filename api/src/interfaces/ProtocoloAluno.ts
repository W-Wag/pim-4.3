import { Request, Response } from 'express';

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
  index: (req: Request, res: Response) => void;
  acharUmAluno: (req: Request, res: Response) => void;
  criarAluno: (req: Request, res: Response) => void;
  deletarMuitos: (req: Request, res: Response) => void;
  deletar: (req: Request, res: Response) => void;
  deletarMatricula: (req: Request, res: Response) => void;
}
