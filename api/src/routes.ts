import { Router } from 'express';
import { validarAluno } from './validations/ValidarAluno';
import { validarTurma } from './validations/ValidarTurma';
import { AlunoRoutes } from './interfaces/ProtocoloAluno';
import { EnderecoRoutes } from './interfaces/ProtocoloEnderecos';
import { DisciplinaRoutes } from './interfaces/ProtocoloDisciplina';
import { validarDisciplina } from './validations/ValidarDisciplina';

const aluno: AlunoRoutes = require('./routes/aluno');
const professor = require('./routes/professor');
const endereco: EnderecoRoutes = require('./routes/enderecos');
const curso = require('./routes/curso');
const turma = require('./routes/turma');
const disciplina: DisciplinaRoutes = require('./routes/disciplinas');
const nota = require('./routes/notas');

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
route.post('/disciplinas', validarDisciplina, disciplina.criarDisciplina);
route.put('/disciplinas/professor/:cpf', disciplina.addProfessorParaDisciplina);
route.delete('/disciplinas/:cod_disciplina', disciplina.deletarDisciplina);

// Rotas de Turma
route.post('/turmas', validarTurma, turma.criarTurma);
route.put('/turmas/:cpf', turma.addAlunoParaTurma);

// Rotas de Nota
route.post('/notas', nota.criarNotas);
route.put('/notas/:id', nota.atualizarNota);
route.delete('/notas/:id', nota.deletarNota);

module.exports = route;
