import { Controller } from '../interfaces/ProtocoloController';
import { Professor } from '../interfaces/ProtocoloProfessor';
import { prisma } from '../libs/prisma';

export const criarProfessor: Controller = async (req, res) => {
  const {
    cpf,
    nome,
    email,
    dt_nascimento,
    rg,
    ctps,
    titularidade,
    funcional,
    telefone,
    telefone2,
  }: Professor = req.body;

  try {
    const professor = await prisma.professor.create({
      data: {
        cpf,
        nome,
        email,
        dt_nascimento,
        ctps,
        rg,
        titularidade,
        funcional,
        telefone,
        telefone2,
      },
    });

    res.send(professor);
  } catch (err) {
    console.log(err);
    res.status(400).send('Dados não enviados');
  }
};

export const index: Controller = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany({
      include: { Endereco: true },
    });
    res.json(professores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

export const acharUmProfessor: Controller = async (req, res) => {
  const { cpf } = req.params;
  try {
    const professor = await prisma.professor.findUnique({
      where: { cpf },
      include: { Endereco: true },
    });

    if (!professor) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
    res.json(professor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};
