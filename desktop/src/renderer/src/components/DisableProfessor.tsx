import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { api } from '@renderer/lib/axios'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

interface Professor {
  cpf: string
  nome: string
  dt_nascimento: string
  email: string
  ctps: string
  rg: string
  titularidade: string
  funcional: string
  telefone: string
  telefone2: string | undefined
}

export function DisableProfessor(): JSX.Element {
  const [professors, setProfessor] = useState<Professor[]>([])
  const { toast } = useToast()

  useEffect(() => {
    GetProfessor()
  }, [])

  async function GetProfessor(): Promise<void> {
    const response = await api.get('/professores')
    setProfessor(response.data)
  }
  const handleDelete = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    const cpf = e.currentTarget.parentElement?.children.item(1)?.innerHTML
    console.log(cpf)
    try {
      await api.delete(`/professores/desativar/${cpf}`)
      GetProfessor()
      toast({
        title: 'Sucesso',
        description: 'professor desativado com sucesso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'ocorreu um problema ao tentar desativar o professor'
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Desativar Professor</h1>
      <Toaster />

      <div className="flex flex-wrap gap-4">
        {professors.map((item) => {
          return (
            <div
              key={item.cpf}
              className="bg-gray-950 w-[28rem] rounded-md shadow-md shadow-gray-700 space-y-4 px-4 py-8"
            >
              <h2 className="text-primary font-bold text-xl">{item.nome}</h2>
              <p className="text-primary font-semibold text-sm">{item.cpf}</p>
              <p className="text-primary font-semibold text-sm">E-mail: {item.email}</p>
              <p className="text-primary font-semibold text-sm">CTPS: {item.ctps}</p>
              <p className="text-primary font-semibold text-sm">Funcional: {item.funcional}</p>
              <p className="text-primary font-semibold text-sm">RG: {item.rg}</p>
              <p className="text-primary font-semibold text-sm">Titulo: {item.titularidade}</p>
              <p className="text-primary font-semibold text-sm">
                Data de Nascimento: {item.dt_nascimento}
              </p>
              <p className="text-primary font-semibold text-sm">Telefone: {item.telefone}</p>
              <p className="text-primary font-semibold text-sm">
                Telefone 2: {item.telefone2 ? item.telefone2 : ''}
              </p>

              <Button onClick={handleDelete} className="bg-red-900 text-white hover:bg-red-700">
                Deletar
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
