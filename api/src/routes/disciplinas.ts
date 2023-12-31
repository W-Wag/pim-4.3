import { Disciplina } from '@prisma/client';
import { Controller } from '../interfaces/ProtocoloController';
import { prisma } from '../libs/prisma';

export const criarDisciplina: Controller = async (req, res) => {
  const { nome, carga_horaria, cod_curso }: Disciplina = req.body;

  try {
    const disciplina = await prisma.disciplina.create({
      data: {
        nome,
        carga_horaria,
        Curso: {
          connect: {
            cod: cod_curso,
          },
        },
      },
    });

    res.send(disciplina);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const index: Controller = async (req, res) => {
  try {
    const disciplinas = await prisma.disciplina.findMany();
    res.send(disciplinas);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
  }
};

export const addProfessorParaDisciplina: Controller = async (req, res) => {
  const { cpf } = req.params;
  const { cod_disciplina } = req.body;

  const disciplinaExiste = await prisma.disciplina.findUnique({
    where: {
      cod_disciplina: parseInt(cod_disciplina),
    },
  });
  const cpfExiste = await prisma.professor.findUnique({
    where: {
      cpf: cpf,
    },
  });

  if (!cod_disciplina || !disciplinaExiste || !cpfExiste) {
    res.status(404).json({
      error: 'Código da disciplina ou cpf do professor não encontrado',
    });
    return;
  }

  try {
    const professor = await prisma.professor.update({
      where: { cpf },
      data: {
        Disciplina: {
          connect: {
            cod_disciplina: cod_disciplina,
          },
        },
      },
      include: { Disciplina: true },
    });

    res.send(professor);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const deletarDisciplina: Controller = async (req, res) => {
  const { cod_disciplina } = req.params;

  const codigoExiste = await prisma.disciplina.findUnique({
    where: {
      cod_disciplina: parseInt(cod_disciplina),
    },
  });
  if (!cod_disciplina || !codigoExiste) {
    res.status(404).json({ error: 'Código da disciplina não encontrado' });
    return;
  }

  try {
    const disciplina = await prisma.disciplina.delete({
      where: { cod_disciplina: parseInt(cod_disciplina) },
    });

    res.json(disciplina);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};
