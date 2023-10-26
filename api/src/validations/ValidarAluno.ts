import validator from 'validator';
import { Aluno } from '../interfaces/ProtocoloAluno';

export function validarAluno(req, res, next) {
  const {
    Aluno: { cpf, nome, email, dt_nascimento, rg, telefone, genero },
  }: Aluno = req.body;
  if (
    !cpf ||
    !nome ||
    !email ||
    !dt_nascimento ||
    !rg ||
    !telefone ||
    !genero
  ) {
    return res.status(400).json({
      errors: ['Dados inválidos, verifique!'],
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      errors: ['Email inválido, verifique!'],
    });
  }
  if (!validator.isISO8601(dt_nascimento, { strict: true })) {
    return res.status(400).json({
      errors: ['Data de nascimento inválida, verifique!'],
    });
  }
  if (!validator.isMobilePhone(telefone, ['pt-BR'])) {
    return res.status(400).json({
      errors: ['Telefone inválido, verifique!'],
    });
  }
  if (!/[\d]{4}-[\d]{3}/.test(rg)) {
    return res.status(400).json({
      errors: ['RG inválido, verifique!'],
    });
  }
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return res.status(400).json({
      errors: ['CPF inválido, verifique!'],
    });
  }
  if (!['H', 'M'].includes(genero)) {
    return res.status(400).json({
      errors: ['Gênero inválido, verifique!'],
    });
  }

  next();
}
