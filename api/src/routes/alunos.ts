// import validator from 'validator';
import { Aluno } from '../interfaces/studentProtocol';
import { prisma } from '../libs/prisma';

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
  }: Aluno = req.body;

  function gerarRa() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const regex = /[a-z0-9]/;
    let sequencia = '';

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      const char = caracteres[randomIndex];

      if (regex.test(char)) {
        sequencia += char;
      } else {
        i--;
      }
    }

    return sequencia;
  }

  try {
    const matricula = await prisma.matricula.create({
      data: {
        ra: gerarRa(),
        situacao: 'Ativo',
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
      include: { Aluno: true },
    });

    res.send(matricula);
  } catch (err) {
    console.log(err);
    res.status(400).send('Dados não enviados');
  }
};

export const createAdress = async (req, res) => {
  const {
    uf,
    nome,
    Cidade: {
      nomeCidade,
      Endereco: { cep, logradouro, estado, numero, complemento, bairro },
    },
  } = req.body;

  try {
    const address = await prisma.estado.create({
      data: {
        uf,
        nome,
        Cidade: {
          create: {
            nome: nomeCidade,
            Endereco: {
              create: {
                cep,
                logradouro,
                estado,
                numero,
                complemento,
                bairro,
              },
            },
          },
        },
      },
      include: { Cidade: true },
    });
    res.send(address);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const addAddressToStudent = async (req, res) => {
  const { cpf } = req.params;
  const { id } = req.body;
  try {
    const student = await prisma.aluno.update({
      where: { cpf },
      data: {
        Endereco: {
          connect: { id },
        },
      },
    });

    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
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
