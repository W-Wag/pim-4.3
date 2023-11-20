import { Aluno } from '../interfaces/ProtocoloAluno';
import { Controller } from '../interfaces/ProtocoloController';
import { prisma } from '../libs/prisma';

export const criarAluno: Controller = async (req, res) => {
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

export const index: Controller = async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: { Endereco: true, Matricula: true },
    });
    res.json(alunos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

export const acharUmAluno: Controller = async (req, res) => {
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
        include: { Endereco: true, Matricula: true },
      });

      if (!alunos) {
        res.status(404).json({ error: 'Aluno não encontrado' });
        return;
      }
      res.json(alunos);
    } else {
      const alunos = await prisma.aluno.findUnique({
        where: { ra },
        include: {
          Endereco: true,
          Nota: true,
          Turma: { include: { Curso: true } },
        },
      });

      if (!alunos) {
        res.status(404).json({ error: 'Aluno não encontrado' });
        return;
      }
      res.json(alunos);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

export const atualizarAluno: Controller = async (req, res) => {
  const { cpf } = req.params;
  const {
    Aluno: { nome, email, dt_nascimento, rg, telefone, telefone2, genero },
  }: Aluno = req.body;

  try {
    const alunos = await prisma.aluno.update({
      where: { cpf },
      data: {
        nome,
        email,
        dt_nascimento,
        rg,
        telefone,
        telefone2,
        genero,
      },
    });
    res.send(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

export const desativarMatricula: Controller = async (req, res) => {
  const { ra } = req.params;
  const { situacao } = req.body;

  if (!ra) {
    res.status(404).json({ error: 'RA não encontrado' });
    return;
  }

  try {
    const matricula = await prisma.matricula.update({
      where: { ra: ra },
      data: {
        situacao,
      },
    });

    if (!matricula) {
      res.status(404).json({ error: 'Matricula não encontrada' });
      return;
    }
    res.json(matricula);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao desativar a matricula' });
  }
};

export const deletar: Controller = async (req, res) => {
  const { cpf } = req.params;

  if (!cpf) {
    res.status(404).json({ error: 'CPF não encontcpfdo' });
    return;
  }

  try {
    const aluno = await prisma.aluno.delete({
      where: { cpf },
    });

    await prisma.matricula.delete({
      where: { ra: aluno.ra },
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

export const deletarMatricula: Controller = async (req, res) => {
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

export const deletarMuitos: Controller = async (req, res) => {
  try {
    await prisma.aluno.deleteMany();
    res.send('Deletado com sucesso');
  } catch (err) {
    console.log('Ocorreu um erro');
  }
};
