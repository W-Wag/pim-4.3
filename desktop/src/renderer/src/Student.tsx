import { Link } from 'react-router-dom'

export function Student(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Alunos</h1>

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/criar/aluno">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-8">
              Criar Aluno
            </h2>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
            Atualizar aluno
          </h2>
          <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
            Aqui você irá atualizar os dados do aluno
          </p>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/alunos">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Desativar matricula do aluno
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Aqui você pode alterar a situação da matricula de algum aluno
            </p>
          </Link>
        </div>
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/alunos/enderecos">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Adicionar Endereço a um aluno existente
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Aqui você pode adicionar um endereço a um aluno que ainda não o possui
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
