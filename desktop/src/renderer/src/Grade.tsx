import { Link } from 'react-router-dom'

export function Grade(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Notas</h1>

      <div className="flex flex-wrap space-x-2">
        <div className="w-96 h-40 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/gerar/notas">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Gerar Notas para um Aluno
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para gerar notas para um aluno em uma determinada disciplina
            </p>
          </Link>
        </div>

        <div className="w-96 h-40 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/deletar/notas">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Visualizar e Excluir notas de um aluno
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para visualizar todas as notas existentes e para excluir as notas de um
              aluno inativo.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
