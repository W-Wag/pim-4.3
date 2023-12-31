import { Router } from 'express';
import { validarAluno } from './validations/ValidarAluno';
import { validarTurma } from './validations/ValidarTurma';
import { AlunoRoutes } from './interfaces/ProtocoloAluno';
import { EnderecoRoutes } from './interfaces/ProtocoloEnderecos';
import { DisciplinaRoutes } from './interfaces/ProtocoloDisciplina';
import { validarDisciplina } from './validations/ValidarDisciplina';
import { validarSituacaoMatricula } from './validations/ValidarSituacaoMatricula';

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
route.get('/aluno/:cpf/:ra', validarSituacaoMatricula, aluno.acharUmAluno);
route.post('/alunos', validarAluno, aluno.criarAluno);
route.put('/alunos/atualizar/:cpf', aluno.atualizarAluno);
route.put('/alunos/desativar/:ra', aluno.desativarMatricula);
route.delete('/alunos', aluno.deletarMuitos);
route.delete('/alunos/deletar/:cpf', aluno.deletar);
route.delete('/matricula/:ra', aluno.deletarMatricula);

// Rotas do Professor
route.post('/professores', professor.criarProfessor);
route.get('/professores', professor.index);
route.get('/professores/:cpf', professor.acharUmProfessor);
route.get(
  '/info/disciplina/professor/:cpf_professor',
  professor.infoDisciplinaLecionadas,
);
route.put('/professores/atualizar/:cpf', professor.atualizarProfessor);
route.delete('/professores/desativar/:cpf', professor.desativarProfessor);

// Rotas de Curso
route.post('/cursos', curso.criarCurso);
route.get('/cursos/:cod', curso.acharUmCurso);
route.get('/cursos/', curso.index);
route.put('/cursos/atualizar/:cod', curso.atualizarCurso);
route.delete('/cursos/deletar/:cod', curso.destroy);

// Rotas de Endereço
route.post('/enderecos', endereco.criarEndereco);
route.delete('/enderecos/:id', endereco.deletarEndereco);
route.put('/enderecos/aluno/:cpf', endereco.addEnderecoParaAluno);
route.put('/enderecos/professor/:cpf', endereco.addEnderecoParaProfessor);

// Rotas de Disciplina
route.post('/disciplinas', validarDisciplina, disciplina.criarDisciplina);
route.get('/disciplinas', disciplina.index);
route.put('/disciplinas/professor/:cpf', disciplina.addProfessorParaDisciplina);
route.delete(
  '/disciplinas/deletar/:cod_disciplina',
  disciplina.deletarDisciplina,
);

// Rotas de Turma
route.post('/turmas', validarTurma, turma.criarTurma);
route.get('/turmas', turma.index);
route.put('/turmas/:cpf', turma.addAlunoParaTurma);
route.delete('/turmas/deletar/:cod', turma.destroy);

// Rotas de Nota
route.post('/notas', nota.criarNotas);
route.get('/notas', nota.index);
route.get('/notas/presenca/:cpf/:ra', nota.listarFrequencia);
route.get(
  '/notas/presenca/:cpf_professor',
  nota.listaDeFrequenciaPorDisciplinaDoProfessor,
);
route.get('/notas/mapa/:cpf_professor', nota.mapaDeNotas);
route.get('/notas/historico/:cpf/:ra', nota.listarHistoricoDoAluno);
route.get('/notas/boletim/:cpf/:ra', nota.listarBoletimDoAluno);
route.put('/notas/:cpf_professor/', nota.atualizarNota);
route.put('/notas/frequencia/:cpf', nota.manterFrequencia);
route.delete('/notas/deletar/:id', nota.deletarNota);

module.exports = route;
