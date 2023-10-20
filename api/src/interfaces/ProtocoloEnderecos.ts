import { Request, Response } from 'express';

export interface EnderecoRoutes {
  criarEndereco: (req: Request, res: Response) => void;
  addEnderecoParaAluno: (req: Request, res: Response) => void;
  addEnderecoParaProfessor: (req: Request, res: Response) => void;
  deletarEndereco: (req: Request, res: Response) => void;
}
