import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { api } from '@renderer/lib/axios'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

interface Student {
  cpf: string
  ra: string
  nome: string
  dt_nascimento: string
  email: string
  rg: string
  genero: string
  telefone: string
  telefone2: string | undefined
  Matricula: {
    situacao: string
  }
}

export function DisableStudent(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([])
  const { toast } = useToast()

  useEffect(() => {
    GetStudent()
  }, [])

  async function GetStudent(): Promise<void> {
    const response = await api.get('/alunos')
    setStudents(response.data)
  }
  const handleDelete = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    const cpf = e.currentTarget.parentElement?.children.item(1)?.innerHTML
    console.log(cpf)
    try {
      await api.delete(`/alunos/deletar/${cpf}`)
      GetStudent()
      toast({
        title: 'Sucesso',
        description: 'Aluno deletado com sucesso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'ocorreu um problema ao tentar deletar o aluno'
      })
    }
  }
  const handleToggleRegister = async (
    e: React.MouseEvent<HTMLElement>,
    situacao: string
  ): Promise<void> => {
    const ra = e.currentTarget.parentElement?.children.item(2)?.innerHTML
    console.log(ra)
    try {
      await api.put(`/alunos/desativar/${ra}`, {
        situacao
      })
      GetStudent()
      toast({
        title: 'Sucesso',
        description: 'Situação do aluno alterada com sucesso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'ocorreu um problema ao tentar desativar o aluno'
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Gerenciar a Matricula do Aluno</h1>
      <Toaster />

      <div className="flex flex-wrap gap-4">
        {students.map((item) => {
          return (
            <div
              key={item.cpf}
              className="bg-gray-950 w-[28rem] rounded-md shadow-md shadow-gray-700 space-y-4 px-4 py-8"
            >
              <h2 className="text-primary font-bold text-xl">{item.nome}</h2>
              <p className="text-primary font-semibold text-sm">{item.cpf}</p>
              <p className="text-primary font-semibold text-sm">{item.ra}</p>
              <p className="text-primary font-semibold text-sm">E-mail: {item.email}</p>
              <p className="text-primary font-semibold text-sm">RG: {item.rg}</p>
              <p className="text-primary font-semibold text-sm">
                Data de Nascimento: {item.dt_nascimento}
              </p>
              <p className="text-primary font-semibold text-sm">Gênero: {item.genero}</p>
              <p className="text-primary font-semibold text-sm">Telefone: {item.telefone}</p>
              <p className="text-primary font-semibold text-sm">
                Telefone 2: {item.telefone2 ? item.telefone2 : ''}
              </p>
              <p className="text-primary font-semibold text-sm">
                Situação: {item.Matricula.situacao}
              </p>

              {item.Matricula.situacao === 'Ativo' ? (
                <Button
                  onClick={(e): Promise<void> => handleToggleRegister(e, 'Inativo')}
                  className="bg-red-900 mx-2 text-white hover:bg-red-700"
                >
                  Desativar Matricula
                </Button>
              ) : (
                <Button
                  onClick={(e): Promise<void> => handleToggleRegister(e, 'Ativo')}
                  className="bg-green-900 mx-2 text-white hover:bg-green-700"
                >
                  Ativar Matricula
                </Button>
              )}
              <Button
                onClick={handleDelete}
                className="bg-red-900 mx-2 text-white hover:bg-red-700"
              >
                Deletar
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
