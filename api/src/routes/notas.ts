import { Decimal } from '@prisma/client/runtime/library';
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

  const cpf = await prisma.aluno.findUnique({
    where: {
      cpf: cpf_aluno,
    },
  });
  const disciplina = await prisma.disciplina.findUnique({
    where: {
      cod_disciplina: cod_disciplina,
    },
  });

  if (!cpf || !disciplina) {
    res
      .status(404)
      .json({ error: 'CPF ou código da disciplina não encontrado' });
    return;
  }

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
        np1: np1.toFixed(2),
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

export const listarHistoricoDoAluno: Controller = async (req, res) => {
  let { cpf, ra } = req.params;
  let aluno;

  if (!cpf && !ra) {
    res.status(404).json({ error: 'Identificador do aluno não encontrado' });
    return;
  }

  if (/cpf/.test(cpf)) cpf = '';
  if (/ra/.test(ra)) ra = '';

  if (cpf) {
    aluno = await prisma.aluno.findUnique({
      where: {
        cpf,
      },
    });

    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
  } else {
    aluno = await prisma.aluno.findUnique({
      where: {
        ra,
      },
    });

    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
  }

  const acharCpf = await prisma.nota.findMany({
    where: {
      cpf_aluno: aluno.cpf,
    },
  });

  if (!acharCpf) {
    res.status(404).json({ error: 'CPF não encontrado' });
    return;
  }

  const notas: {
    nota: { np1: Decimal; np2: Decimal; pim: Decimal; mf: Decimal };
    disciplina: string;
    Semestre: number;
    id: number;
  }[] = [];

  for (let i = 0; i < acharCpf.length; i++) {
    try {
      const disciplina = await prisma.disciplina.findUnique({
        where: {
          cod_disciplina: acharCpf[i].cod_disciplina,
        },
      });

      if (!disciplina) {
        res.status(404).json({ error: 'Disciplina não encontrada' });
        return;
      }

      notas.push({
        nota: {
          np1: acharCpf[i].np1,
          np2: acharCpf[i].np2,
          pim: acharCpf[i].pim,
          mf: acharCpf[i].mf,
        },
        disciplina: disciplina.nome,
        Semestre: acharCpf[i].Semestre,
        id: acharCpf[i].id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
      return;
    }
  }

  res.send(notas);
};

export const listarBoletimDoAluno: Controller = async (req, res) => {
  let { cpf, ra } = req.params;
  let aluno;

  if (!cpf && !ra) {
    res.status(404).json({ error: 'Identificador do aluno não encontrado' });
    return;
  }

  if (/cpf/.test(cpf)) cpf = '';
  if (/ra/.test(ra)) ra = '';

  if (cpf) {
    aluno = await prisma.aluno.findUnique({
      where: {
        cpf,
      },
    });

    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
  } else {
    aluno = await prisma.aluno.findUnique({
      where: {
        ra,
      },
    });

    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
  }
  const acharCpf = await prisma.nota.findMany({
    where: {
      cpf_aluno: aluno.cpf,
    },
    orderBy: {
      Semestre: 'desc',
    },
  });

  if (!acharCpf) {
    res.status(404).json({ error: 'CPF não encontrado' });
    return;
  }

  const notas: {
    nota: { np1: Decimal; np2: Decimal; pim: Decimal; mf: Decimal };
    disciplina: string;
    Semestre: number;
    id: number;
  }[] = [];

  for (let i = 0; i < acharCpf.length; i++) {
    try {
      const disciplina = await prisma.disciplina.findUnique({
        where: {
          cod_disciplina: acharCpf[i].cod_disciplina,
        },
      });

      if (!disciplina) {
        res.status(404).json({ error: 'Disciplina não encontrada' });
        return;
      }

      notas.push({
        nota: {
          np1: acharCpf[i].np1,
          np2: acharCpf[i].np2,
          pim: acharCpf[i].pim,
          mf: acharCpf[i].mf,
        },
        disciplina: disciplina.nome,
        Semestre: acharCpf[i].Semestre,
        id: acharCpf[i].id,
      });

      if (acharCpf[i].Semestre !== notas[0].Semestre) {
        notas.pop();
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
      return;
    }
  }

  res.send(notas);
};

export const listarFrequencia: Controller = async (req, res) => {
  let { cpf, ra } = req.params;
  let aluno;

  if (!cpf && !ra) {
    res.status(404).json({ error: 'Identificador do aluno não encontrado' });
    return;
  }

  if (/cpf/.test(cpf)) cpf = '';
  if (/ra/.test(ra)) ra = '';

  if (cpf) {
    aluno = await prisma.aluno.findUnique({
      where: {
        cpf,
      },
    });

    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
  } else {
    aluno = await prisma.aluno.findUnique({
      where: {
        ra,
      },
    });

    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
  }
  const acharCpf = await prisma.nota.findMany({
    where: {
      cpf_aluno: aluno.cpf,
    },
  });

  if (!acharCpf) {
    res.status(404).json({ error: 'CPF não encontrado' });
    return;
  }

  const frequencias: { presenca: number; disciplina: string; id: number }[] =
    [];

  for (let i = 0; i < acharCpf.length; i++) {
    try {
      const disciplina = await prisma.disciplina.findUnique({
        where: {
          cod_disciplina: acharCpf[i].cod_disciplina,
        },
      });

      if (!disciplina) {
        res.status(404).json({ error: 'Disciplina não encontrada' });
        return;
      }
      const frequencia = await prisma.nota.findMany({
        where: {
          cpf_aluno: aluno.cpf,
        },
      });
      frequencias.push({
        presenca: frequencia[i].frequencia,
        disciplina: disciplina.nome,
        id: frequencia[i].id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
      return;
    }
  }

  res.send(frequencias);
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
