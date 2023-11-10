import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App.tsx';
import './index.css';
import { Login } from './Login.tsx';
import { Courses } from './components/courses/courses.tsx';
import { Header } from './components/header/header.tsx';
import { Footer } from './components/footer/footer.tsx';
import { Services } from './Services.tsx';
import { Contacts } from './Contacts.tsx';
import { StudentArea } from './StudentArea.tsx';
import { SchoolRecords } from './components/school-records/schoolRecords.tsx';
import { Attendance } from './components/attendance-list/attendance.tsx';
import { SchoolReport } from './components/school-report/schoolReport.tsx';
import { ProfessorArea } from './ProfessorArea.tsx';
import { AttendanceProf } from './components/attendance-list/attendaceProf.tsx';
import { Classes } from './components/classes/classes.tsx';
import { Grades } from './components/grades/grades.tsx';
import { UpdateGrades } from './components/grades/updateGrades.tsx';
import { GradesMap } from './components/grades/gradesMap.tsx';
import { CheckRegistration } from './components/check-registration/checkRegistration.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        // Páginas
        <Route path="/" element={<App />} />
        <Route path="/aluno/login" element={<Login />} />
        <Route path="/professor/login" element={<Login />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/contatos" element={<Contacts />} />
        <Route path="/aluno" element={<StudentArea />} />
        <Route path="/professor" element={<ProfessorArea />} />
        // Componentes
        <Route path="/servicos/cursos" element={<Courses />} />
        <Route
          path="/servicos/consultar-matricula"
          element={<CheckRegistration />}
        />
        <Route path="/aluno/historico" element={<SchoolRecords />} />
        <Route path="/aluno/boletim" element={<SchoolReport />} />
        <Route path="/aluno/presenca" element={<Attendance />} />
        <Route path="/professor/presenca" element={<AttendanceProf />} />
        <Route path="/professor/turmas" element={<Classes />} />
        <Route path="/professor/notas" element={<Grades />} />
        <Route path="/professor/notas/atualizar" element={<UpdateGrades />} />
        <Route path="/professor/notas/mapa" element={<GradesMap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
);
