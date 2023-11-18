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
  semestre: z.string().max(1, {
    message: 'Semestre inválido'
  }),
  cpf_aluno: z.string().min(14, {
    message: 'CPF inválido'
  }),
  disciplina: z.string().min(1, {
    message: 'Código da disciplina inválido'
  })
})

export function CreateGrade(): JSX.Element {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  // const { pathname } = useLocation()
  // const { state } = useLocation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semestre: '',
      cpf_aluno: '',
      disciplina: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    const { semestre, cpf_aluno, disciplina } = values
    const cod_disciplina = Number(disciplina)
    const Semestre = Number(semestre)

    try {
      setIsLoading(true)
      await api.post('/notas', {
        Semestre,
        cpf_aluno,
        cod_disciplina
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao gerar nota'
      })
    } catch (err) {
      console.log(err)
      const status = get(err, 'response.status', 0)
      console.log(status)
      if (status === 404) {
        toast({
          title: 'Erro',
          description:
            'Disciplina ou CPF não encontrado, certifique que o código ou o CPF esta correto e existe!'
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
            name="semestre"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Número do Semestre</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. 1, 2, 3" {...field} />
                </FormControl>
                <FormDescription>
                  Digite o número do semestre a qual essa nota pertence
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf_aluno"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>CPF do Aluno</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="123-456-789.40"
                    mask="000.000.000-00"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite o CPF do aluno acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disciplina"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Código da Disciplina</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. 1, 2, 3..." {...field} />
                </FormControl>
                <FormDescription>
                  Digite o código da disciplina que essa nota pertence
                </FormDescription>
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
