import { useEffect, useState } from 'react'
import { Castle, AlignJustify } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

export function Header(): JSX.Element {
  const [isPhoneWidth, SetIsPhoneWidth] = useState(false)

  useEffect(() => {
    if (document.body.clientWidth < 1024) {
      SetIsPhoneWidth(true)
    }
  }, [isPhoneWidth])

  return (
    <header className="flex items-center justify-between gap-2 py-4 bg-blue-950 print:hidden">
      <div className="flex px-4">
        {isPhoneWidth ? (
          <a href="/">
            <Castle width={50} height={50} />
          </a>
        ) : (
          <>
            <a href="/">
              <Castle width={50} height={50} />
            </a>
            <p className="py-3 px-2 font-semibold">Universidade</p>
          </>
        )}
      </div>
      <div className="m-auto">
        <h1 className="text-primary text-3xl font-extrabold">Sistema de gestão escolar</h1>
      </div>
      {isPhoneWidth ? (
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
      ) : (
        <div className="flex items-center gap-2 pr-2">
          <a className={buttonVariants()} href="/servicos">
            Serviços
          </a>
          <a className={buttonVariants()} href="/contatos">
            Contatos
          </a>
        </div>
      )}
    </header>
  )
}
