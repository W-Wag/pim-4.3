import { prisma } from '../libs/prisma';
import { Controller } from '../interfaces/ProtocoloController';

export const criarTurma: Controller = async (req, res) => {
  const { cod, Curso_cod } = req.body;

  try {
    const turma = await prisma.turma.create({
      data: {
        cod,
        Quantidade_alunos: 0,
        Curso: {
          connect: {
            cod: Curso_cod,
          },
        },
      },
    });

    res.send(turma);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const index = async (req, res) => {
  try {
    const turma = await prisma.turma.findMany({
      orderBy: {
        cod: 'asc',
      },
    });
    res.send(turma);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
  }
};

export const addAlunoParaTurma = async (req, res) => {
  const { cpf } = req.params;
  const { cod_turma } = req.body;

  if (!cpf) {
    res.status(404).json({ error: 'CPF não encontrado' });
  }
  const turmaExiste = await prisma.turma.findUnique({
    where: {
      cod: cod_turma,
    },
  });

  if (!turmaExiste) {
    res.status(404).json({ error: 'Turma não encontrada' });
    return;
  }

  if (turmaExiste.Quantidade_alunos >= 50) {
    res.status(400).json({ error: 'Limite de alunos na turma excedido' });
    return;
  }

  try {
    const aluno = await prisma.aluno.update({
      where: { cpf },
      data: {
        Turma: {
          connect: {
            cod: cod_turma,
          },
        },
      },
    });

    await prisma.turma.update({
      where: { cod: cod_turma },
      data: {
        Quantidade_alunos: {
          increment: 1,
        },
      },
    });

    res.send(aluno);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const destroy = async (req, res) => {
  const { cod } = req.params;
  try {
    const turma = await prisma.turma.delete({
      where: {
        cod: cod,
      },
    });

    res.send(turma);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
  }
};
