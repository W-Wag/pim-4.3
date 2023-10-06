import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App.tsx';
import './index.css';
import { Login } from './Login.tsx';
import { Courses } from './Courses.tsx';
import { Header } from './components/header/header.tsx';
import { Footer } from './components/footer/footer.tsx';
import { Services } from './Services.tsx';
import { Contacts } from './Contacts.tsx';
import { StudentArea } from './StudentArea.tsx';
import { SchoolRecords } from './components/school-records/schoolRecords.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        // Páginas
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/contatos" element={<Contacts />} />
        <Route path="/aluno" element={<StudentArea />} />
        // Componentes
        <Route path="/historico" element={<SchoolRecords />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
);
