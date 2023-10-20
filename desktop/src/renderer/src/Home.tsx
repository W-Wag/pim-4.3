import { Link } from 'react-router-dom';

export function Home(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Bem-vindo ao sistema, USUÁRIO</h1>
      <div className="flex flex-wrap space-x-2">

        <div className="w-80 h-32 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
        <Link to="/alunos">
          <h2 className="text-xl font-semibold text-primary-foreground text-center py-8">Gerenciar Alunos</h2>
          </Link>
        </div>

        <div className="w-80 h-32 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
        <Link to="/alunos">
          <h2 className="text-xl font-semibold text-primary-foreground text-center py-8">Gerenciar Professores</h2>
          </Link>
        </div>

        <div className="w-80 h-32 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">Gerenciar <br/> Cursos, Disciplinas e Turmas</h2>
        </div>

      </div>
    </div>
  )
}
