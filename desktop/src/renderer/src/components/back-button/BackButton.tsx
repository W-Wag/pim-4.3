import { ArrowLeftCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

export function BackButton(): JSX.Element {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate(-1)
  }

  return (
    <Button className="px-2 py-2" onClick={handleClick}>
      <p className="flex flex-col items-center justify-center text-sm font-medium text-primary-foreground leading-relaxed">
        Página Anterior <ArrowLeftCircle />
      </p>
    </Button>
  )
}
