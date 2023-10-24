import { Controller } from '../interfaces/ProtocoloController';
import { prisma } from '../libs/prisma';

function mediaFinal(np1: number, np2: number, pim: number) {
  if (!np1 || !np2 || !pim) return 0;
  const result = (+np1 * 4 + np2 * 4 + pim * 2) / 10;
  if (result >= 4.7 && result <= 5) return 5;
  return result.toPrecision(2);
}

export const criarNotas: Controller = async (req, res) => {
  const { Semestre, cpf_aluno, cod_disciplina } = req.body;

  try {
    const notas = await prisma.nota.create({
      data: {
        Semestre,
        mf: mediaFinal(req.body.np1, req.body.np2, req.body.pim),
        Disciplina: {
          connect: {
            cod_disciplina: cod_disciplina,
          },
        },
        Aluno: {
          connect: {
            cpf: cpf_aluno,
          },
        },
      },
    });

    res.send(notas);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const atualizarNota: Controller = async (req, res) => {
  const { id } = req.params;
  const { np1, np2, pim } = req.body;

  const idExiste = await prisma.nota.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!id || !idExiste) {
    res.status(404).json({ error: 'id da nota não encontrado' });
    return;
  }
  try {
    const notas = await prisma.nota.update({
      where: { id: parseInt(id) },
      data: {
        np1,
        np2,
        pim,
        mf: mediaFinal(np1, np2, pim),
      },
    });

    res.json(notas);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const deletarNota: Controller = async (req, res) => {
  const { id } = req.params;

  const idExiste = await prisma.nota.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!id || !idExiste) {
    res.status(404).json({ error: 'id da nota não encontrado' });
    return;
  }

  try {
    const notas = await prisma.nota.delete({
      where: { id: parseInt(id) },
    });

    res.json(notas);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};
