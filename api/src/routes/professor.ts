import { Controller } from '../interfaces/ProtocoloController';
import { Professor } from '../interfaces/ProtocoloProfessor';
import { prisma } from '../libs/prisma';

export const criarProfessor: Controller = async (req, res) => {
  const {
    cpf,
    nome,
    email,
    dt_nascimento,
    rg,
    ctps,
    titularidade,
    funcional,
    telefone,
    telefone2,
  }: Professor = req.body;

  try {
    const professor = await prisma.professor.create({
      data: {
        cpf,
        nome,
        email,
        dt_nascimento,
        ctps,
        rg,
        titularidade,
        funcional,
        telefone,
        telefone2,
      },
    });

    res.send(professor);
  } catch (err) {
    console.log(err);
    res.status(400).send('Dados não enviados');
  }
};

export const index: Controller = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany({
      include: { Endereco: true },
    });
    res.json(professores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

export const acharUmProfessor: Controller = async (req, res) => {
  const { cpf } = req.params;
  try {
    const professor = await prisma.professor.findUnique({
      where: { cpf },
      include: { Endereco: true },
    });

    if (!professor) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
    res.json(professor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

export const infoDisciplinaLecionadas: Controller = async (req, res) => {
  const { cpf_professor } = req.params;
  const info:
    | {
        id: number;
        disciplina: string;
        curso: string;
        turma: number;
        quantidade_alunos: number;
      }[]
    | null = [];

  const disciplinas = await prisma.disciplina.findMany({
    where: {
      cpf_professor,
    },
    include: {
      Nota: {
        include: {
          Aluno: {
            include: {
              Turma: true,
            },
          },
        },
      },
      Curso: {
        include: {
          Turma: true,
        },
      },
    },
  });

  if (!disciplinas) {
    res.status(404).json({ error: 'Disciplinas não encontradas' });
    return;
  }

  for (let i = 0; i < disciplinas.length; i++) {
    const disciplina = disciplinas[i];
    const notas = await prisma.nota.findMany({
      where: {
        cod_disciplina: disciplina.cod_disciplina,
      },
      include: {
        Aluno: {
          include: {
            Turma: true,
          },
        },
      },
    });

    const turmas = [...new Set(notas.map((nota) => nota.Aluno.Turma?.cod))];
    const quantidadeTurmas = turmas.length;

    const quantidadeAlunos = notas.reduce(
      (total: number, turma) =>
        total + (turma.Aluno.Turma?.Quantidade_alunos ?? 0),
      0,
    );

    info.push({
      id: disciplina.cod_disciplina,
      disciplina: disciplina.nome,
      curso: disciplina.Curso.nome,
      turma: quantidadeTurmas,
      quantidade_alunos: quantidadeAlunos,
    });
  }

  res.send(info);
};
