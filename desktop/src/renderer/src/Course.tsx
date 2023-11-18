import { Link } from 'react-router-dom'

export function Course(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Cursos</h1>

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/criar/curso">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Criar Curso
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para criar um curso
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/atualizar/curso">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Atualizar Curso
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para atualizar um curso
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/deletar/curso">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Visualizar e Excluir Curso
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para visualizar os curso já disponíveis e para deletar um curso
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
