import { Router } from 'express';
import { validate } from './validations/ValidarAluno';
const aluno = require('./routes/aluno');
const curso = require('./routes/curso');

const route = Router();

// Rotas do Aluno
route.get('/alunos', aluno.index);
route.post('/alunos', validate, aluno.criarAluno);
route.post('/alunos/endereco', aluno.criarEndereco);
route.put('/alunos/endereco/:cpf', aluno.addEnderecoParaAluno);
route.delete('/alunos', aluno.deletarMuitos);
route.delete('/alunos/:cpf', aluno.deletar);
route.delete('/matricula/:ra', aluno.deletarMatricula);

// Rotas de Curso
route.post('/cursos', curso.criarCurso);

// Rotas de Endereço
route.delete('/enderecos/:id', aluno.deletarEndereco);

module.exports = route;
