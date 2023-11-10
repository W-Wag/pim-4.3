import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from './components/loading/Loading';

export function StudentArea() {
  const isStudentLoggedInRa = localStorage.getItem('ra_aluno');
  const isStudentLoggedInCpf = localStorage.getItem('cpf_aluno');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStudentLoggedInRa && !isStudentLoggedInCpf) {
      navigate('/aluno/login');
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isStudentLoggedInRa, isStudentLoggedInCpf, navigate]);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">Área do Aluno</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center space-y-2 w-full mb-12">
          <Link
            to="/aluno/historico"
            className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
          >
            <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
              <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
                Histórico Escolar
              </h1>
              <p className="text-primary-foreground font-bold leading-relaxed text-sm">
                Aqui você visualizará as notas de todas as disciplinas de todos
                os semestre
              </p>
            </div>
          </Link>

          <Link
            to="/aluno/presenca"
            className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
          >
            <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
              <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
                Lista de Presença
              </h1>
              <p className="text-primary-foreground font-bold leading-relaxed text-sm">
                Aqui você visualizará as suas frequência do semestre atual
              </p>
            </div>
          </Link>
          <Link
            to="/aluno/boletim"
            className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
          >
            <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
              <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
                Boletim Escolar
              </h1>
              <p className="text-primary-foreground font-bold leading-relaxed text-sm">
                Aqui você visualizará as notas do semestre atual
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
