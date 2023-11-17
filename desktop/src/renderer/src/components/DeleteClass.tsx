import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { api } from '@renderer/lib/axios'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

interface Class {
  cod: string
  Curso_cod: string
}

export function DeleteClass(): JSX.Element {
  const [classes, setClasses] = useState<Class[]>([])
  const { toast } = useToast()

  useEffect(() => {
    GetClasses()
  }, [])

  async function GetClasses(): Promise<void> {
    const response = await api.get('/turmas')
    setClasses(response.data)
  }
  const handleDelete = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    const courseCode = e.currentTarget.parentElement?.children.item(2)?.innerHTML
    try {
      await api.delete(`/cursos/deletar/${courseCode}`)
      GetClasses()
      toast({
        title: 'Sucesso',
        description: 'curso deletado com sucesso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'ocorreu um problema ao tentar deletar o curso'
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Visualizar e Deletar Turmas</h1>
      <Toaster />

      <div className="flex flex-wrap gap-4">
        {classes.map((item) => {
          return (
            <div
              key={item.cod}
              className="bg-gray-950 w-[28rem] rounded-md shadow-md shadow-gray-700 space-y-4 px-4 py-8"
            >
              <h2 className="text-primary font-bold text-xl">{item.cod}</h2>
              <p className="text-primary font-semibold text-sm">{item.Curso_cod}</p>

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
