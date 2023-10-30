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
import { useParams } from 'react-router-dom'

const formSchema = z.object({
  cod: z.string().min(1, {
    message: 'Código da turma inválido'
  })
})

export function AddProfessorToSubject(): JSX.Element {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const { cpf } = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cod: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    const { cod } = values
    const cod_disciplina = Number(cod)

    try {
      setIsLoading(true)
      await api.put(`/disciplinas/professor/${cpf}`, {
        cod_disciplina
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao adicionar professor na disciplina'
      })
    } catch (err) {
      console.log(err)
      const status = get(err, 'response.status', 0)
      console.log(status)
      if (status === 404) {
        toast({
          title: 'Erro',
          description:
            'Disciplina não encontrada, certifique que o código esta correto e se existe!'
        })
        setIsLoading(false)
        return
      }
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao adicionar professor a disciplina'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Adicione um professor a disciplina</h1>

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
                <FormLabel>Código da Disciplina</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="EX. 1, 2, 3" {...field} />
                </FormControl>
                <FormDescription>
                  Digite o código da disciplina definido <br /> por id que o professor deve lecionar
                  acima
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
