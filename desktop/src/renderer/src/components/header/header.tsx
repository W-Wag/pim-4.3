import { Link } from 'react-router-dom'
import { Castle, AlignJustify } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

export function Header(): JSX.Element {
  return (
    <header className="flex items-center justify-between gap-2 py-4 bg-blue-950 print:hidden">
      <div className="flex px-4">
            <Link to="/">
              <Castle width={50} height={50} />
            </Link>
            <p className="py-3 px-2 font-semibold">Universidade</p>

      </div>
      <div className="m-auto">
        <h1 className="text-primary text-3xl font-extrabold">Sistema de gestão escolar</h1>
      </div>
        <Collapsible className="pr-2 space-y-4">
          <CollapsibleTrigger>
            <AlignJustify width={25} height={25} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {' '}
            <a className={buttonVariants()} href="/aluno">
              Área do Aluno
            </a>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <a className={buttonVariants()} href="/login">
              Área do Professor
            </a>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <a className={buttonVariants()} href="/servicos">
              Serviços
            </a>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <a className={buttonVariants()} href="/contatos">
              Contatos
            </a>
          </CollapsibleContent>
        </Collapsible>
    </header>
  )
}
