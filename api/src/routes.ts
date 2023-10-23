import { Router } from 'express';
import { validarAluno } from './validations/ValidarAluno';
import { validarTurma } from './validations/ValidarTurma';
import { AlunoRoutes } from './interfaces/ProtocoloAluno';
import { EnderecoRoutes } from './interfaces/ProtocoloEnderecos';

const aluno: AlunoRoutes = require('./routes/aluno');
const professor = require('./routes/professor');
const endereco: EnderecoRoutes = require('./routes/enderecos');
const curso = require('./routes/curso');
const turma = require('./routes/turma');
const disciplina = require('./routes/disciplinas');

const route = Router();

// Rotas do Aluno
route.get('/alunos', aluno.index);
route.post('/alunos', validarAluno, aluno.criarAluno);
route.delete('/alunos', aluno.deletarMuitos);
route.delete('/alunos/:ra', aluno.deletar);
route.delete('/matricula/:ra', aluno.deletarMatricula);

// Rotas do Professor
route.post('/professores', professor.criarProfessor);
route.get('/professores', professor.index);

// Rotas de Curso
route.post('/cursos', curso.criarCurso);

// Rotas de Endereço
route.post('/enderecos', endereco.criarEndereco);
route.delete('/enderecos/:id', endereco.deletarEndereco);
route.put('/enderecos/aluno/:cpf', endereco.addEnderecoParaAluno);
route.put('/enderecos/professor/:cpf', endereco.addEnderecoParaProfessor);

// Rotas de Disciplina
route.post('/disciplinas', disciplina.criarDisciplina);

// Rotas de Turma
route.post('/turmas', validarTurma, turma.criarTurma);
route.put('/turmas/:cpf', turma.addAlunoParaTurma);

module.exports = route;
