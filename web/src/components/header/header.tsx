import { useEffect, useState } from 'react';
import { Castle, AlignJustify } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { LogOut } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [isPhoneWidth, SetIsPhoneWidth] = useState(false);
  const [homeLink, setHomeLink] = useState('/');
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const professorLoggedIn = localStorage.getItem('cpf_professor');
  const studentLoggedInRa = localStorage.getItem('ra_aluno');
  const studentLoggedInCpf = localStorage.getItem('cpf_aluno');

  useEffect(() => {
    if (document.body.clientWidth < 1024) {
      SetIsPhoneWidth(true);
    }
    if (professorLoggedIn) {
      setHomeLink('/professor');
      setIsLogged(true);
    }
    if (studentLoggedInRa || studentLoggedInCpf) {
      setHomeLink('/aluno');
      setIsLogged(true);
    }
  }, [isPhoneWidth, professorLoggedIn, studentLoggedInRa, studentLoggedInCpf]);

  return (
    <header className="flex items-center justify-between gap-2 py-4 bg-blue-950 print:hidden">
      <div className="flex px-4">
        {isPhoneWidth ? (
          <Link to={homeLink}>
            <Castle width={50} height={50} />
          </Link>
        ) : (
          <>
            <Link to={homeLink}>
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
            <Link className={buttonVariants()} to={homeLink}>
              Área do Aluno
            </Link>
          </CollapsibleContent>
          <CollapsibleContent>
            {' '}
            <Link className={buttonVariants()} to={homeLink}>
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
          {isLogged ? (
            <CollapsibleContent>
              {' '}
              <Button
                onClick={() => {
                  localStorage.clear();
                  setIsLogged(false);
                  navigate('/');
                }}
              >
                Sair <LogOut className="mx-2" />
              </Button>
            </CollapsibleContent>
          ) : (
            <></>
          )}
        </Collapsible>
      ) : (
        <div className="flex items-center gap-2 pr-2">
          <Link className={buttonVariants()} to="/servicos">
            Serviços
          </Link>
          <Link className={buttonVariants()} to="/contatos">
            Contatos
          </Link>
          {isLogged ? (
            <Button
              onClick={() => {
                localStorage.clear();
                setIsLogged(false);
                navigate('/');
              }}
            >
              Sair <LogOut className="mx-2" />
            </Button>
          ) : (
            <></>
          )}
        </div>
      )}
    </header>
  );
}
