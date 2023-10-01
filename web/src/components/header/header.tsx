import { Castle } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="flex justify-between gap-2 py-4 bg-blue-950 text-center">
      <div className="flex justify-between">
        <Castle width={50} height={50} />
        <p>Universidade</p>
      </div>
      <h1 className="text-primary text-xl font-bold">
        Sistema de gestão escolar
      </h1>
      <div className="flex items-center gap-2">
        <Button>Sign-In</Button>
        <Button>WhatsApp</Button>
        <Button>Contatos</Button>
      </div>
    </header>
  );
}
