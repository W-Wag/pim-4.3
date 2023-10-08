import { Link } from 'react-router-dom';

export function ProfessorArea() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Área do Professor
      </h1>

      <div className="flex flex-col items-center space-y-2 w-full mb-12">
        <Link
          to="/professor/presenca"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Lista de Presença
            </h1>
          </div>
        </Link>

        <Link
          to="/presenca"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Turmas
            </h1>
          </div>
        </Link>
        <Link
          to="/boletim"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Gerenciar Notas
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
