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
import { IMaskInput } from 'react-imask'
import { api } from '@renderer/lib/axios'
import { Skeleton } from './ui/skeleton'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
// import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  cod: z.string().min(2, {
    message: 'Código do curso inválido'
  }),
  nome: z.string().min(2, {
    message: 'Nome do curso inválido'
  }),
  carga_horaria: z.string().min(1, {
    message: 'carga horária inválido'
  })
})

export function CreateCourse(): JSX.Element {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  // const { pathname } = useLocation()
  // const { state } = useLocation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cod: '',
      nome: '',
      carga_horaria: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    const { cod, nome, carga_horaria } = values
    const cargaHoraria = Number(carga_horaria)

    try {
      setIsLoading(true)
      await api.post('/cursos', {
        cod,
        nome,
        carga_horaria: cargaHoraria
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao criar ao criar o curso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao criar o curso'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Cadastre um curso</h1>

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
                <FormLabel>Código do Curso</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. ADS1.0" {...field} />
                </FormControl>
                <FormDescription>Digite o código do curso acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nome"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Nome do curso</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. Redes de computadores" {...field} />
                </FormControl>
                <FormDescription>Digite o nome do curso acima</FormDescription>
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
                <FormDescription>Digite o CPF do professor acima</FormDescription>
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
