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
import { IMaskInput } from 'react-imask'
// import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  nome: z.string().min(2, {
    message: 'Código da turma inválido'
  }),
  carga_horaria: z.string().min(2, {
    message: 'Código da turma inválido'
  }),
  cod_curso: z.string().min(2, {
    message: 'Código do curso inválido'
  })
})

export function CreateSubject(): JSX.Element {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  // const { pathname } = useLocation()
  // const { state } = useLocation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      carga_horaria: '',
      cod_curso: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    const { nome, carga_horaria, cod_curso } = values
    const cargaHoraria = Number(carga_horaria)

    try {
      setIsLoading(true)
      await api.get(`/cursos/${cod_curso}`)
      await api.post('/disciplinas', {
        nome,
        carga_horaria: cargaHoraria,
        cod_curso
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao criar a disciplina'
      })
    } catch (err) {
      console.log(err)
      const status = get(err, 'response.status', 0)
      console.log(status)
      if (status === 404) {
        toast({
          title: 'Erro',
          description: 'Curso não encontrado, certifique que o código esta correto e existe!'
        })
        setIsLoading(false)
        return
      }
      if (status === 400) {
        toast({
          title: 'Erro',
          description: 'Algum dado pode estar invalido verifique!'
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
      <h1 className="py-6 text-2xl font-bold text-center">Cadastre uma disciplina</h1>

      <Toaster />

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
                <FormLabel>Nome da disciplina</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. Banco de dados" {...field} />
                </FormControl>
                <FormDescription>Digite o nome da disciplina acima</FormDescription>
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
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="EX. 1600"
                    mask="0000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite a carga horária da disciplina acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cod_curso"
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
