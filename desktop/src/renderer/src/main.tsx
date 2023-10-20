import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/header'
import { Home } from './Home'
import { Footer } from './components/footer/footer'
import { Aluno } from './Aluno'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alunos" element={<Aluno />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
