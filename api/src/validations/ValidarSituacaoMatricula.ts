import { Middleware } from '../interfaces/ProtocoloMiddleware';
import { prisma } from '../libs/prisma';

export const validarSituacaoMatricula: Middleware = async (req, res, next) => {
  let { cpf, ra } = req.params;

  if (!cpf && !ra) {
    res
      .status(400)
      .json({ error: 'Alguma informação esta faltando, verifique!' });
    return;
  }

  if (/cpf/.test(cpf)) cpf = '';
  if (/ra/.test(ra)) ra = '';

  let situacao;

  if (cpf) {
    situacao = await prisma.aluno.findUnique({
      where: {
        cpf: cpf,
      },
      include: {
        Matricula: true,
      },
    });
  } else if (ra) {
    situacao = await prisma.aluno.findUnique({
      where: {
        ra: ra,
      },
      include: {
        Matricula: true,
      },
    });
  }

  if (!situacao) {
    res.status(400).json({ error: 'Aluno inexistente' });
    return;
  }

  if (situacao.Matricula.situacao === 'Inativo') {
    res.status(401).json({ error: 'Aluno inativo' });
    return;
  }

  next();
};
