import { Controller } from './ProtocoloController';

export interface Disciplina {
  cod_disciplina: number;
  nome: string;
  carga_horaria: number;
  cod_curso: number;
}

export interface DisciplinaRoutes {
  index: Controller;
  criarDisciplina: Controller;
  deletarDisciplina: Controller;
  addProfessorParaDisciplina: Controller;
}
