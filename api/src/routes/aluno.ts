import { Aluno } from '../interfaces/ProtocoloAluno';
import { prisma } from '../libs/prisma';

export const criarAluno = async (req, res) => {
  const {
    Aluno: { cpf, nome, email, dt_nascimento, rg, telefone, telefone2, genero },
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

export const acharUmAluno = async (req, res) => {
  let { cpf, ra } = req.params;

  if (!cpf && !ra) {
    res.status(404).json({ error: 'Identificador do aluno não encontrado' });
    return;
  }

  if (/cpf/.test(cpf)) cpf = '';
  if (/ra/.test(ra)) ra = '';

  try {
    if (cpf) {
      const alunos = await prisma.aluno.findUnique({
        where: { cpf },
        include: { Endereco: true },
      });

      if (!alunos) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
      res.json(alunos);
    } else {
      const alunos = await prisma.aluno.findUnique({
        where: { ra },
        include: { Endereco: true },
      });

      if (!alunos) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
      res.json(alunos);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

export const deletar = async (req, res) => {
  const { ra } = req.params;

  if (!ra) {
    res.status(404).json({ error: 'CPF não encontrado' });
    return;
  }

  try {
    const aluno = await prisma.aluno.delete({
      where: { ra },
    });

    await prisma.matricula.delete({
      where: { ra },
    });

    if (aluno.cod_turma === null) return;

    await prisma.turma.update({
      where: { cod: aluno.cod_turma },
      data: {
        Quantidade_alunos: {
          decrement: 1,
        },
      },
    });

    res.json(aluno);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao deletar o aluno' });
  }
};

export const deletarMatricula = async (req, res) => {
  const { ra } = req.params;

  if (!ra) {
    res.status(404).json({ error: 'RA não encontrado' });
    return;
  }

  try {
    const matricula = await prisma.matricula.delete({
      where: { ra },
    });

    res.json(matricula);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao deletar o aluno' });
  }
};

export const deletarMuitos = async (req, res) => {
  try {
    await prisma.aluno.deleteMany();
    res.send('Deletado com sucesso');
  } catch (err) {
    console.log('Ocorreu um erro');
  }
};
