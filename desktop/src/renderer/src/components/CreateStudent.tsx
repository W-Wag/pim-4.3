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
import { Button } from './ui/button'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const formSchema = z.object({
  cpf: z.string().min(11, {
    message: 'CPF inválido, digite novamente'
  }),
  nome: z.string(),
  dt_nascimento: z.string().regex(/{1-9}-{1-9}-{1-9}{1-9}/, {
    message: 'Data nascimento deve ser do tipo DD-MM-AA'
  }),
  rg: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  }),
  telefone: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  }),
  telefone2: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  }),
  genero: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  })
})

export function CreateStudent(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: '',
      nome: '',
      dt_nascimento: '',
      rg: '',
      telefone: '',
      telefone2: '',
      genero: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>): void {
    console.log(values)
  }

  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Logue no sistema para utiliza-lo</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full py-4 flex flex-col items-center justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="111-111-111.40" {...field} />
                </FormControl>
                <FormDescription>Insira o CPF do aluno</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nome"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Nome" {...field} />
                </FormControl>
                <FormDescription>Insira o nome do aluno</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <Link to="/home">Confirmar</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
