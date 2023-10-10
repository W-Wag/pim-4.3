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
            <p className="text-primary-foreground font-bold leading-relaxed text-sm">
              Aqui você irá poder lançar as frequência de seus alunos com base
              na disciplinas
            </p>
          </div>
        </Link>

        <Link
          to="/professor/turmas"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Turmas
            </h1>
            <p className="text-primary-foreground font-bold leading-relaxed text-sm">
              Aqui você visualizará as turmas que você esta lecionando
              atualmente
            </p>
          </div>
        </Link>
        <Link
          to="/professor/notas"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Gerenciar Notas
            </h1>
            <p className="text-primary-foreground font-bold leading-relaxed text-sm">
              Aqui você irá ver as opções para gerenciamento das notas
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
