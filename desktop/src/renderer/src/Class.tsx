import { IMaskInput } from 'react-imask'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from './components/ui/use-toast'
import { Toaster } from './components/ui/toaster'
import { api } from './lib/axios'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'

export function Class(): JSX.Element {
  const [cpf, setCpf] = useState('')
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCpf(event.target.value)
  }
  const handleClick = async (): Promise<void> => {
    try {
      const response = await api.get(`/aluno/${cpf}/ra`)
      if (response.status === 200) {
        navigate(`/turma/adicionar/aluno/${cpf}`)
        return
      }
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: 'CPF não encontrado ou inválido'
      })
      return
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar Turmas</h1>
      <Toaster />

      <div className="flex flex-wrap space-x-2">
        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/criar/turma">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Criar Turma
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para criar uma turma
            </p>
          </Link>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
                Adicionar Aluno a Turma
              </h2>
              <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
                Abra essa aba para adicionar um aluno a uma turma
              </p>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <Label className="text-sm font-semibold text-primary text-center leading-relaxed py-2">
                Digite o CPF do aluno a ser adicionado na Turma
                <IMaskInput
                  className="bg-primary text-primary-foreground"
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
                  onChange={handleChange}
                />
              </Label>

              <Button type="submit" onClick={handleClick}>
                Confirmar
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-80 h-36 bg-primary hover:bg-zinc-200 hover:cursor-pointer">
          <Link to="/deletar/turma">
            <h2 className="text-xl font-semibold text-primary-foreground text-center py-4">
              Excluir Turma
            </h2>
            <p className="text-sm font-medium text-primary-foreground text-center leading-relaxed">
              Abra essa aba para deletar uma turma
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
