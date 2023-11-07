import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface Cods {
  nome: string
  carga_horaria: number
  code: string
}

export function DeleteCourse(): JSX.Element {
  const [curso, setCurso] = useState<Cods[]>([])
  useEffect(() => {
    GetCod()
  }, [])
  async function GetCod(): Promise<void> {
    await setCurso([
      {
        nome: 'ADS',
        code: 'ADS1.0',
        carga_horaria: 400
      },
      {
        nome: 'RDS',
        code: 'ADS1.1',
        carga_horaria: 400
      },
      {
        nome: 'BD',
        code: 'ADS1.2',
        carga_horaria: 400
      }
    ])
  }
  const handleDelete = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e.currentTarget.parentElement?.children.item(2)?.innerHTML)
    console.log(curso)
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold py-4">Deletar Curso</h1>

      <div className="flex flex-col items-center justify-center space-y-6">
        {curso.map((curso) => {
          return (
            <div
              key={curso.code}
              className="bg-gray-950 w-80 rounded-md shadow-md shadow-gray-700 space-y-4"
            >
              <h2 className="text-primary font-bold text-xl">{curso.nome}</h2>
              <p className="text-primary font-semibold text-sm">{curso.carga_horaria}</p>
              <p className="text-primary font-semibold text-sm">{curso.code}</p>

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
