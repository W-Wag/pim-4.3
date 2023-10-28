import { Link } from 'react-router-dom'

export function School(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Escolha a área para gerenciar</h1>

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/escola/disciplina">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Disciplina
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para gerenciar tudo sobre Disciplinas
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/escola/turma">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Turma
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para gerenciar tudo sobre Turma
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/escola/curso">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Curso
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para gerenciar tudo sobre Cursos
            </p>
          </Link>
        </div>
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/escola/notas">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Notas
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para gerenciar tudo sobre Notas
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
