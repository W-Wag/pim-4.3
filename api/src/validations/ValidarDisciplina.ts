import { Disciplina } from '@prisma/client';
import { Middleware } from '../interfaces/ProtocoloMiddleware';
import { prisma } from '../libs/prisma';

export const validarDisciplina: Middleware = async (req, res, next) => {
  const { nome, carga_horaria, cod_curso }: Disciplina = req.body;

  if (!nome || !carga_horaria || !cod_curso) {
    res
      .status(400)
      .json({ error: 'Alguma informação esta faltando, verifique!' });
    return;
  }

  const curso = await prisma.curso.findUnique({
    where: {
      cod: cod_curso,
    },
  });

  if (!curso) {
    res.status(400).json({ error: ['Curso inexistente'] });
    return;
  }

  next();
};
