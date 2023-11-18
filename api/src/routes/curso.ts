import { Controller } from '../interfaces/ProtocoloController';
import { prisma } from '../libs/prisma';

export const criarCurso: Controller = async (req, res) => {
  const { cod, nome, carga_horaria } = req.body;

  try {
    const curso = await prisma.curso.create({
      data: {
        cod,
        nome,
        carga_horaria,
      },
    });

    res.send(curso);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }
};

export const acharUmCurso: Controller = async (req, res) => {
  const { cod } = req.params;

  try {
    const curso = await prisma.curso.findUnique({
      where: {
        cod: cod,
      },
    });

    if (!curso) {
      res.status(404).json({ error: 'curso não encontrado' });
      return;
    }

    res.send(curso);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
    return;
  }
};

export const index: Controller = async (req, res) => {
  try {
    const curso = await prisma.curso.findMany({
      orderBy: {
        nome: 'asc',
      },
    });

    if (!curso) {
      res.status(404).json({ error: 'curso não encontrado' });
      return;
    }

    res.send(curso);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
    return;
  }
};

export const atualizarCurso: Controller = async (req, res) => {
  const { cod } = req.params;
  const { nome, carga_horaria } = req.body;

  try {
    const curso = await prisma.curso.update({
      where: {
        cod: cod,
      },
      data: {
        nome,
        carga_horaria,
      },
    });

    if (!curso) {
      res.status(404).json({ error: 'curso não encontrado' });
      return;
    }

    res.send(curso);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
    return;
  }
};

export const destroy: Controller = async (req, res) => {
  const { cod } = req.params;

  if (!cod) {
    res.status(404).json({ error: 'Código do curso não encontrado' });
    return;
  }

  try {
    const curso = await prisma.curso.delete({
      where: {
        cod: cod,
      },
    });

    res.send(curso);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
    return;
  }
};
