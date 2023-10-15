import { Router } from 'express';
const alunos = require('./routes/alunos');

const route = Router();

route.get('/alunos', alunos.index);
route.post('/alunos', alunos.create);
route.delete('/alunos', alunos.deleteMany);
route.delete('/alunos/:id', alunos.disabled);

module.exports = route;
