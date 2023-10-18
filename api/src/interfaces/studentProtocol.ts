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
    id_endereco: number;
  };

  ra: string;
  situacao: string;
}
