import { Link } from 'react-router-dom'

export function Professor(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Alunos</h1>

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/alunos/criar">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-8">
              Criar Professor
            </h2>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
            Atualizar Professor
          </h2>
          <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
            Aqui você irá atualizar os dados do professor
          </p>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/alunos">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Desativar Professor
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Aqui você pode alterar a situação de algum professor
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/professores/enderecos">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Adicionar Endereço a um professor existente
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Aqui você pode adicionar um endereço a um professor que ainda não o possui
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
