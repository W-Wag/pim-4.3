import { Router } from 'express';
import { validarAluno } from './validations/ValidarAluno';
import { validarTurma } from './validations/ValidarTurma';
const aluno = require('./routes/aluno');
const curso = require('./routes/curso');
const turma = require('./routes/turma');

const route = Router();

// Rotas do Aluno
route.get('/alunos', aluno.index);
route.post('/alunos', validarAluno, aluno.criarAluno);
route.post('/alunos/endereco', aluno.criarEndereco);
route.put('/alunos/endereco/:cpf', aluno.addEnderecoParaAluno);
route.delete('/alunos', aluno.deletarMuitos);
route.delete('/alunos/:ra', aluno.deletar);
route.delete('/matricula/:ra', aluno.deletarMatricula);

// Rotas de Curso
route.post('/cursos', curso.criarCurso);

// Rotas de Endereço
route.delete('/enderecos/:id', aluno.deletarEndereco);

// Rotas de Turma
route.post('/turmas', validarTurma, turma.criarTurma);
route.put('/turmas/:cpf', turma.addAlunoParaTurma);

module.exports = route;
