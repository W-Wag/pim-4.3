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
import { IMaskInput } from 'react-imask'

const formSchema = z.object({
  cpf: z
    .string()
    .min(11, {
      message: 'CPF inválido, digite novamente'
    })
    .max(11, {
      message: 'CPF inválido, digite novamente'
    }),
  nome: z.string(),
  dt_nascimento: z.string().regex(/{1-9}-{1-9}-{1-9}{1-9}/, {
    message: 'Data nascimento deve ser do tipo DD-MM-AA'
  }),
  rg: z.string().min(5, {
    message: 'Rg deve ter no mínimo 5 dígitos'
  }),
  telefone: z.string().min(9, {
    message: 'Telefone deve ter no mínimo 9 dígitos'
  }),
  telefone2: z.string().min(9, {
    message: 'Telefone deve ter no mínimo 9 dígitos'
  }),
  genero: z.string().regex(/[H|M]/g, {
    message: 'Tipo de gênero inválido'
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
                  <IMaskInput
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="111-111-111.40"
                    mask="000.000.000-00"
                    {...field}
                  />
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
          <FormField
            control={form.control}
            name="genero"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Insira o gênero" {...field} />
                </FormControl>
                <FormDescription>Insira H - Homem ou M - Mulher</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Confirmar</Button>
        </form>
      </Form>
    </div>
  )
}
