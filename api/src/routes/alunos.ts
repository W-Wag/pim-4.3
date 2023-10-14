import { prisma } from '../libs/prisma';

export const create = async (req, res) => {
  const { cpf, nome, email, data_nascimento, rg, telefone, endereco } =
    req.body;
  if (!cpf || !nome || !email || !data_nascimento || !rg || !telefone) {
    res.status(400).send('Dados inválidos');
  }

  // Cria o aluno
  const aluno = await prisma.aluno.create({
    data: {
      cpf,
      nome,
      email,
      data_nascimento,
      rg,
      telefone,
      Endereco: {
        create: endereco,
      },
    },
    include: {
      Endereco: true,
    },
  });

  res.send(aluno);
};

export const index = async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: { Endereco: true },
    });
    res.json(alunos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

export const disabled = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ error: 'ID não encontrado' });
    return;
  }

  try {
    const aluno = await prisma.aluno.delete({
      where: { id: parseInt(id) },
      include: { Endereco: true },
    });

    res.json(aluno);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao deletar o aluno' });
  }
};
