import { Link } from 'react-router-dom';

export function Services() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">Serviços</h1>

      <div className="flex flex-row justify-between">
        <Link to="/cursos" className="px-1">
          <div className="bg-primary w-36 h-36 rounded space-y-2 py-4 text-center hover:bg-slate-300">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:text-primary">
              Cursos Disponíveis
            </h1>
          </div>
        </Link>
        <Link to="/cursos" className="px-1">
          <div className="bg-primary w-36 h-36 rounded space-y-2 py-4 text-center hover:bg-slate-300">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:text-primary">
              Consultar Matricula
            </h1>
          </div>
        </Link>
        <Link to="/contatos" className="px-1">
          <div className="bg-primary w-36 h-36 rounded space-y-2 py-4 text-center hover:bg-slate-300">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:text-primary">
              Contatos
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
