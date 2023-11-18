import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { api } from '@renderer/lib/axios'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

interface Grades {
  id: number
  np1: number
  np2: number
  pim: number
  mf: number
  frequencia: number
  Semestre: number
  cpf_aluno: string
}

export function DeleteGrade(): JSX.Element {
  const [grades, setGrades] = useState<Grades[]>([])
  const { toast } = useToast()

  useEffect(() => {
    GetGrades()
  }, [])

  async function GetGrades(): Promise<void> {
    const response = await api.get('/notas')
    setGrades(response.data)
  }
  const handleDelete = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    const gradeCode = e.currentTarget.parentElement?.children.item(6)?.innerHTML
    try {
      await api.delete(`/notas/deletar/${gradeCode}`)
      GetGrades()
      toast({
        title: 'Sucesso',
        description: 'nota deletada com sucesso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'ocorreu um problema ao tentar deletar a nota'
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Visualizar e Deletar Notas</h1>
      <Toaster />

      <div className="flex flex-wrap gap-4">
        {grades.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-gray-950 w-[28rem] rounded-md shadow-md shadow-gray-700 space-y-4 px-4 py-8"
            >
              <h2 className="text-primary font-bold text-xl">CPF: {item.cpf_aluno}</h2>
              <p className="text-primary font-semibold text-sm">Semestre: {item.Semestre}</p>
              <p className="text-primary font-semibold text-sm">NP1: {item.np1}</p>
              <p className="text-primary font-semibold text-sm">NP2: {item.np2}</p>
              <p className="text-primary font-semibold text-sm">PIM: {item.pim}</p>
              <p className="text-primary font-semibold text-sm">Média Final: {item.mf}</p>
              <p className="text-primary font-semibold text-sm">{item.id}</p>

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
