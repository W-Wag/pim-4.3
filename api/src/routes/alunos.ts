import validator from 'validator';
import { prisma } from '../libs/prisma';

export const create = async (req, res) => {
  const { cpf, nome, email, data_nascimento, rg, telefone, endereco } =
    req.body;
  if (!cpf || !nome || !email || !data_nascimento || !rg || !telefone) {
    return res.status(400).send('Dados inválidos');
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      errors: ['Email inválido, verifique!'],
    });
  }
  if (!validator.isISO8601(data_nascimento)) {
    return res.status(400).json({
      errors: ['Data de nascimento inválida, verifique!'],
    });
  }
  if (!validator.isMobilePhone(telefone, ['pt-BR'])) {
    return res.status(400).json({
      errors: ['Telefone inválido, verifique!'],
    });
  }
  if (!/^\d{7}$/.test(rg)) {
    return res.status(400).json({
      errors: ['RG inválido, verifique!'],
    });
  }
  if (!/^\d{11}$/.test(cpf)) {
    return res.status(400).json({
      errors: ['CPF inválido, verifique!'],
    });
  }

  if (endereco === undefined) {
    return res.status(400).json({
      errors: ['Endereço inválido, verifique!'],
    });
  }

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

export const deleteMany = async (req, res) => {
  try {
    await prisma.aluno.deleteMany();
    res.send('Deletado com sucesso');
  } catch (err) {
    console.log('Ocorreu um erro');
  }
};
