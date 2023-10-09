import { useEffect, useState } from 'react';
import { Castle, AlignJustify } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Link } from 'react-router-dom';

export function Header() {
  const [isPhoneWidth, SetIsPhoneWidth] = useState(false);

  useEffect(() => {
    if (document.body.clientWidth < 1024) {
      SetIsPhoneWidth(true);
    }
  }, [isPhoneWidth]);

  return (
    <header className="flex items-center justify-between gap-2 py-4 bg-blue-950 print:hidden">
      <div className="flex px-4">
        {isPhoneWidth ? (
          <Link to="/">
            <Castle width={50} height={50} />
          </Link>
        ) : (
          <>
            <Link to="/">
              <Castle width={50} height={50} />
            </Link>
            <p className="py-3 px-2 font-semibold">Universidade</p>
          </>
        )}
      </div>
      <div className="m-auto">
        <h1 className="text-primary text-3xl font-extrabold">
          Sistema de gestão escolar
        </h1>
      </div>
      {isPhoneWidth ? (
        <Collapsible className="pr-2 space-y-4">
          <CollapsibleTrigger>
            <AlignJustify width={25} height={25} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {' '}
            <Link className={buttonVariants()} to="/aluno">
              Área do Aluno
            </Link>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <Link className={buttonVariants()} to="/login">
              Área do Professor
            </Link>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <Link className={buttonVariants()} to="/servicos">
              Serviços
            </Link>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <Link className={buttonVariants()} to="/contatos">
              Contatos
            </Link>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="flex items-center gap-2 pr-2">
          <Link className={buttonVariants()} to="/servicos">
            Serviços
          </Link>
          <Link className={buttonVariants()} to="/contatos">
            Contatos
          </Link>
        </div>
      )}
    </header>
  );
}
