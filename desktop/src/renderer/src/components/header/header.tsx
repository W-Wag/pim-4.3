import { Link } from 'react-router-dom'
import { Castle } from 'lucide-react'
import { BackButton } from '../back-button/BackButton'

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
      <BackButton />
    </header>
  )
}
