// import validator from 'validator';
import { prisma } from '../libs/prisma';

interface Aluno {
  Aluno: {
    cpf: string;
    nome: string;
    email: string;
    dt_nascimento: string;
    rg: string;
    telefone: string;
    telefone2: string;
    genero: 'H' | 'M';
    id_endereco: number;
  };

  ra: string;
  situacao: string;
}

export const create = async (req, res) => {
  const {
    Aluno: {
      cpf,
      nome,
      email,
      dt_nascimento,
      rg,
      telefone,
      telefone2,
      genero,
      id_endereco,
    },
    ra,
    situacao,
  }: Aluno = req.body;
  // if (!cpf || !nome || !email || !dt_nascimento || !rg || !telefone) {
  //   return res.status(400).send('Dados inválidos');
  // }
  // if (!validator.isEmail(email)) {
  //   return res.status(400).json({
  //     errors: ['Email inválido, verifique!'],
  //   });
  // }
  // if (!validator.isISO8601(dt_nascimento)) {
  //   return res.status(400).json({
  //     errors: ['Data de nascimento inválida, verifique!'],
  //   });
  // }
  // if (!validator.isMobilePhone(telefone, ['pt-BR'])) {
  //   return res.status(400).json({
  //     errors: ['Telefone inválido, verifique!'],
  //   });
  // }
  // if (!/^\d{7}$/.test(rg)) {
  //   return res.status(400).json({
  //     errors: ['RG inválido, verifique!'],
  //   });
  // }
  // if (!/^\d{11}$/.test(cpf)) {
  //   return res.status(400).json({
  //     errors: ['CPF inválido, verifique!'],
  //   });
  // }
  const matriculaExists = await prisma.matricula.findFirst({
    where: {
      ra,
    },
  });

  if (matriculaExists) {
    return res.status(400).json({
      errors: ['Matricula ja existe, verifique!'],
    });
  }

  try {
    const matricula = await prisma.matricula.create({
      data: {
        ra,
        situacao,
        Aluno: {
          create: {
            cpf,
            nome,
            email,
            dt_nascimento,
            rg,
            telefone,
            telefone2,
            genero,
            id_endereco,
          },
        },
      },
    });

    res.send(matricula);
  } catch (err) {
    console.log(err);
    res.status(400).send('Dados não enviados');
  }
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
