import { prisma } from '../libs/prisma';

export const criarCurso = async (req, res) => {
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

export const acharUmCurso = async (req, res) => {
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

export const index = async (req, res) => {
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
