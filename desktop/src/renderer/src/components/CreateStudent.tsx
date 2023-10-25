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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { ReactElement } from 'react'
import { IMaskInput } from 'react-imask'

const formSchema = z.object({
  cpf: z.string().min(11, {
    message: 'Username must be at least 2 characters.'
  }),
  nome: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  }),
  genero: z.string({
    required_error: 'Por favor,selecione o gênero do aluno'
  })
})

export function CreateStudent(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: '',
      nome: '',
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
          className="h-full py-20 flex flex-col items-center justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="111-111-111.40"
                    mask="000.000.000-00"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Coloque seu usuário acima</FormDescription>
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
                  <Input className="w-96" placeholder="Coloque sua senha aqui" {...field} />
                </FormControl>
                <FormDescription>Use a sua senha no campo acima</FormDescription>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-96">
                      <SelectValue placeholder="Selecione o Gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="H">Homem</SelectItem>
                    <SelectItem value="M">Mulher</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Escolha o gênero do aluno</FormDescription>
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
