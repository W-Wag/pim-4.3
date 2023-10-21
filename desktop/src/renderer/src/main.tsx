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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alunos" element={<Student />} />
        <Route path="/alunos/criar" element={<CreateStudent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
