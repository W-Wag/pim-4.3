import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { Label } from './components/ui/label'
import { IMaskInput } from 'react-imask'
import { Button, buttonVariants } from './components/ui/button'
import { useState } from 'react'
import { useToast } from './components/ui/use-toast'
import { api } from './lib/axios'
import { Toaster } from './components/ui/toaster'
import { Skeleton } from './components/ui/skeleton'

export function Subject(): JSX.Element {
  const [cpf, setCpf] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCpf(event.target.value)
  }
  const handleClick = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await api.get(`/professores/${cpf}`)
      if (response.status === 200) {
        navigate(`/disciplina/adicionar/professor/${cpf}`)
        setIsLoading(false)
        return
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: 'CPF não encontrado ou inválido'
      })
      setIsLoading(false)
      return
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Disciplinas</h1>

      <Toaster />

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/criar/disciplina">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Criar Disciplina
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para criar uma disciplina
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
                Adicionar Professor a Disciplina
              </h2>
              <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
                Abra essa aba para adicionar um professor a uma disciplina
              </p>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <Label className="text-sm font-semibold text-primary text-center leading-relaxed py-2">
                Digite o CPF do aluno a ser adicionado na Disciplina
                <IMaskInput
                  className="bg-primary text-primary-foreground"
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
                  onChange={handleChange}
                />
              </Label>

              {isLoading ? (
                <Skeleton className={buttonVariants()}>Carregando...</Skeleton>
              ) : (
                <Button type="submit" onClick={handleClick}>
                  Confirmar
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/alunos">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Excluir Disciplina
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para deletar uma disciplina
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
