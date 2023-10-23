import { prisma } from '../libs/prisma';

export const criarDisciplina = async (req, res) => {
  const { cod_disciplina, nome, carga_horaria, cod_curso } = req.body;

  try {
    const curso = await prisma.disciplina.create({
      data: {
        cod_disciplina,
        nome,
        carga_horaria,
        Curso: {
          connect: {
            cod: cod_curso,
          },
        },
      },
    });

    res.send(curso);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};
