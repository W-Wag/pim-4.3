import { Link } from 'react-router-dom';

export function Grades() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Gerencie a nota de seus alunos
      </h1>

      <div className="flex flex-col items-center space-y-2 w-full mb-12">
        <Link
          to="/professor/notas/atualizar"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Lançar Notas
            </h1>
            <p className="text-primary-foreground font-bold leading-relaxed text-sm">
              Aqui você poderá lançar e alterar as notas de seus alunos nas
              turmas que leciona
            </p>
          </div>
        </Link>

        <Link
          to="/professor/notas/mapa"
          className=" bg-primary w-2/4 h-36 rounded hover:bg-slate-300 hover:cursor-pointer"
        >
          <div className=" space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
              Mapa de Notas
            </h1>
            <p className="text-primary-foreground font-bold leading-relaxed text-sm">
              Aqui está o mapa de notas com base na turma e disciplina
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
