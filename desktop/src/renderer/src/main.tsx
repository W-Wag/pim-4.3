import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/header'
import { Home } from './Home'
import { Footer } from './components/footer/footer'
import { Student } from './Student'
import { CreateStudent } from './components/CreateStudent'
import { CreateProfessor } from './components/CreateProfessor'
import { Professor } from './Professor'
import { CreateAddress } from './components/CreateAddress'
import { BackButton } from './components/back-button/BackButton'
import { School } from './School'
import { Course } from './Course'
import { CreateCourse } from './components/CreateCourse'
import { Subject } from './Subject'
import { Grade } from './Grade'
import { Class } from './Class'
import { CreateClass } from './components/CreateClass'
import { AddStudentToClass } from './components/AddStudentToClass'
import { CreateSubject } from './components/CreateSubject'
import { AddProfessorToSubject } from './components/AddProfessorToSubject'
import { CreateGrade } from './components/CreateGrade'
import { DeleteCourse } from './components/DeleteCourse'
import { DeleteSubject } from './components/DeleteSubject'
import { DeleteClass } from './components/DeleteClass'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/return" element={<BackButton />} />
        <Route path="/alunos" element={<Student />} />
        <Route path="/professores" element={<Professor />} />
        <Route path="/escola" element={<School />} />
        <Route path="/escola/curso" element={<Course />} />
        <Route path="/escola/disciplina" element={<Subject />} />
        <Route path="/escola/notas" element={<Grade />} />
        <Route path="/escola/turma" element={<Class />} />
        <Route path="/criar/curso" element={<CreateCourse />} />
        <Route path="/criar/aluno" element={<CreateStudent />} />
        <Route path="/criar/professor" element={<CreateProfessor />} />
        <Route path="/criar/turma" element={<CreateClass />} />
        <Route path="/criar/disciplina" element={<CreateSubject />} />
        <Route path="/gerar/notas" element={<CreateGrade />} />
        <Route path="/alunos/enderecos" element={<CreateAddress />} />
        <Route path="/professores/enderecos" element={<CreateAddress />} />
        <Route path="/turma/adicionar/aluno/:cpf" element={<AddStudentToClass />} />
        <Route path="/disciplina/adicionar/professor/:cpf" element={<AddProfessorToSubject />} />
        <Route path="/deletar/curso" element={<DeleteCourse />} />
        <Route path="/deletar/disciplina" element={<DeleteSubject />} />
        <Route path="/deletar/turma" element={<DeleteClass />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
