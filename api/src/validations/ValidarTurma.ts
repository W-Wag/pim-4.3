import { prisma } from '../libs/prisma';

export const validarTurma = async (req, res, next) => {
  const { cod, Curso_cod } = req.body;
  const turma = await prisma.turma.findUnique({
    where: {
      cod,
    },
  });
  const curso = await prisma.curso.findUnique({
    where: {
      cod: Curso_cod,
    },
  });
  if (turma) {
    console.log(turma);
    return res.status(400).json({
      error: ['Turma já existe'],
    });
  }
  if (!curso) {
    return res.status(400).json({
      error: ['Curso não encontrado'],
    });
  }

  next();
};
