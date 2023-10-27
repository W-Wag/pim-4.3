import { Controller } from '../interfaces/ProtocoloController';
import { prisma } from '../libs/prisma';

export const criarEndereco: Controller = async (req, res) => {
  const {
    uf,
    nome,
    Cidade: {
      nomeCidade,
      Endereco: { cep, logradouro, complemento, bairro },
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
                complemento,
                bairro,
              },
            },
          },
        },
      },
      include: { Cidade: { include: { Endereco: true } } },
    });
    res.send(address);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};

export const addEnderecoParaAluno: Controller = async (req, res) => {
  const { cpf } = req.params;
  const { id } = req.body;

  const cpfExiste = await prisma.aluno.findUnique({
    where: {
      cpf,
    },
  });

  if (!cpfExiste) {
    res.status(404).json({ error: 'CPF do aluno não encontrado' });
    return;
  }
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

export const addEnderecoParaProfessor: Controller = async (req, res) => {
  const { cpf } = req.params;
  const { id } = req.body;
  try {
    const student = await prisma.professor.update({
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
export const deletarEndereco: Controller = async (req, res) => {
  const { id } = req.params;

  try {
    const endereco = await prisma.endereco.delete({
      where: { id: parseInt(id) },
    });

    if (endereco.id_cidade === null) return;
    const cidade = await prisma.cidade.delete({
      where: { id: endereco.id_cidade },
    });
    if (cidade.id_estado === null) return;
    await prisma.estado.delete({
      where: { id: cidade.id_estado },
    });

    res.json(endereco);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Dados inválidos' });
  }
};
