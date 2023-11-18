import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Button, buttonVariants } from './ui/button'
import { ReactElement, useState } from 'react'
// import { IMaskInput } from 'react-imask'
import { api } from '@renderer/lib/axios'
import { Skeleton } from './ui/skeleton'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
import { Label } from './ui/label'
// import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  nome: z.string().optional(),
  carga_horaria: z.string().optional()
})

export function UpdateCourse(): JSX.Element {
  const { toast } = useToast()

  const [codValue, setCodValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [loadValue, setLoadValue] = useState('')
  const [course, setCourse] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const { pathname } = useLocation()
  // const { state } = useLocation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: nameValue,
      carga_horaria: loadValue
    }
  })

  async function getCourse(cod: string): Promise<void> {
    try {
      const { data } = await api.get(`/cursos/${cod}`)
      setNameValue(data.nome)
      setLoadValue(data.carga_horaria.toString())
      setCourse(true)
      toast({
        title: 'Sucesso',
        description: 'curso encontrado'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao buscar o curso'
      })
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)

    try {
      setIsLoading(true)
      await api.put(`/cursos/atualizar/${codValue}`, {
        nome: nameValue,
        carga_horaria: parseInt(loadValue)
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao atualizar o curso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao atualizar o curso'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Atualize um curso</h1>

      <Toaster />

      <div className="flex justify-center">
        <Label className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Código do curso"
            onChange={(e): void => setCodValue(e.target.value)}
          />
          <Button onClick={(): Promise<void> => getCourse(codValue)}>Buscar</Button>
        </Label>
      </div>

      {course ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full py-12 flex flex-col items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Nome do curso</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. Redes de computadores"
                      {...field}
                      value={nameValue}
                      onChange={(e): void => {
                        setNameValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o nome atualizado do curso acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carga_horaria"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Carga Horária</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. Redes de computadores"
                      {...field}
                      value={loadValue}
                      onChange={(e): void => {
                        setLoadValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite a carga horária atualizada acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <Skeleton className={buttonVariants()}>Carregando...</Skeleton>
            ) : (
              <Button type="submit">Confirmar</Button>
            )}
          </form>
        </Form>
      ) : (
        <></>
      )}
    </div>
  )
}
