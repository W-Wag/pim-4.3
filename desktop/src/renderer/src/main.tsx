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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/return" element={<BackButton />} />
        <Route path="/alunos" element={<Student />} />
        <Route path="/alunos/criar" element={<CreateStudent />} />
        <Route path="/alunos/enderecos" element={<CreateAddress />} />
        <Route path="/professores" element={<Professor />} />
        <Route path="/professor/criar" element={<CreateProfessor />} />
        <Route path="/professores/enderecos" element={<CreateAddress />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
