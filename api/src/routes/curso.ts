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
  }
};
