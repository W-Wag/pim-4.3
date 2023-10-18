import { Router } from 'express';
import { validate } from './validations/studentsValidation';
const alunos = require('./routes/alunos');

const route = Router();

route.get('/alunos', alunos.index);
route.post('/alunos', validate, alunos.create);
route.post('/alunos/endereco', alunos.createAdress);
route.put('/alunos/endereco/:cpf', alunos.addAddressToStudent);
route.delete('/alunos', alunos.deleteMany);
route.delete('/alunos/:id', alunos.disabled);

module.exports = route;
