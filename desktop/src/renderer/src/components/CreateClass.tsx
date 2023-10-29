import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { get } from 'lodash'
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
import { api } from '@renderer/lib/axios'
import { Skeleton } from './ui/skeleton'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
// import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  cod: z.string().min(2, {
    message: 'Código da turma inválido'
  }),
  Curso_cod: z.string().min(2, {
    message: 'Código do curso inválido'
  })
})

export function CreateClass(): JSX.Element {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  // const { pathname } = useLocation()
  // const { state } = useLocation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cod: '',
      Curso_cod: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    const { cod, Curso_cod } = values

    try {
      setIsLoading(true)
      await api.get(`/cursos/${Curso_cod}`)
      await api.post('/turmas', {
        cod,
        Curso_cod
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao criar a turma'
      })
    } catch (err) {
      console.log(err)
      const status = get(err, 'response.status', 0)
      const response = get(err, 'response.request.response', 0)
      const regexResponse = /existe/.test(response)
      console.log(status)
      if (status === 404) {
        toast({
          title: 'Erro',
          description: 'Curso não encontrado, certifique que o código esta correto e existe!'
        })
        setIsLoading(false)
        return
      }
      if (status === 400 && regexResponse) {
        toast({
          title: 'Erro',
          description: 'Turma já existe'
        })
        setIsLoading(false)
        return
      }
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao criar a turma'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Cadastre uma turma</h1>

      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full py-12 flex flex-col items-center justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="cod"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Código da Turma</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. ADS1.0" {...field} />
                </FormControl>
                <FormDescription>Digite o código da turma acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Curso_cod"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Código do Curso</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. RDC1.0" {...field} />
                </FormControl>
                <FormDescription>Digite o código do curso que essa turma deve esta</FormDescription>
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
    </div>
  )
}
