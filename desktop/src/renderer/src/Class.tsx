import { Link } from 'react-router-dom'

export function Class(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Turmas</h1>

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/criar/turma">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Criar Turma
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para criar uma turma
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
            Adicionar Aluno a Turma
          </h2>
          <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
            Abra essa aba para adicionar um aluno a uma turma
          </p>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/alunos">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Excluir Turma
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para deletar uma turma
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
