import { useEffect, useState } from 'react';
import { Castle, AlignJustify } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Link } from 'react-router-dom';

export function Header() {
  const [isPhoneWidth, SetIsPhoneWidth] = useState(false);

  useEffect(() => {
    if (document.body.clientWidth <= 1020) {
      SetIsPhoneWidth(true);
    }
  }, [isPhoneWidth]);

  return (
    <header className="flex items-center justify-between gap-2 py-4 bg-blue-950">
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
        <Collapsible className="pr-2">
          <CollapsibleTrigger>
            <AlignJustify width={25} height={25} />
          </CollapsibleTrigger>
          <CollapsibleContent className="py-2">Sign-In</CollapsibleContent>
          <CollapsibleContent className="py-2">WhatsApp</CollapsibleContent>
          <CollapsibleContent className="py-2">Contatos</CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="flex items-center gap-2 pr-2">
          <Button>Sign-In</Button>

          <Button>
            <Link to="/contatos">Contatos</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
