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
import { Button, buttonVariants } from './ui/button'
import { ReactElement, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { api } from '@renderer/lib/axios'
import { Skeleton } from './ui/skeleton'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  cpf: z.string().min(11, {
    message: 'CPF deve está no formato válido'
  }),
  nome: z.string().min(2, {
    message: 'Nome deve ter no mínimo duas letras'
  }),
  dt_nascimento: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-([12][0-9]{3})$/, {
    message: 'Data de nascimento deve seguir o padrão DD-MM-AAAA'
  }),
  email: z.string().email({ message: 'Email invalido' }),
  rg: z.string().regex(/[\d]{4}-[\d]{3}/, {
    message: 'RG inválido'
  }),
  telefone: z.string().regex(/\([\d][\d]\)[\d]{5}-[\d]{4}/, {
    message: 'Telefone deve seguir o padrão (DDD)9 e seu número)'
  }),
  telefone2: z.string().optional(),
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
      dt_nascimento: '',
      email: '',
      rg: '',
      telefone: '',
      telefone2: '',
      genero: ''
    }
  })
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  function transformDate(dateToIso: string): string {
    const date = dateToIso.split('-')
    const dateArray = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0])).toISOString()
    return dateArray
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    values.dt_nascimento = transformDate(values.dt_nascimento)
    console.log(values)

    try {
      setIsLoading(true)
      await api.post('/alunos', {
        Aluno: {
          cpf: values.cpf,
          nome: values.nome,
          email: values.email,
          dt_nascimento: values.dt_nascimento,
          rg: values.rg,
          telefone: values.telefone,
          telefone2: values.telefone2,
          genero: values.genero
        }
      })

      navigate('/alunos/enderecos', { state: values.cpf })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'Aluno cadastrado com sucesso'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'Erro desconhecido do servidor, tente novamente mais tarde'
      })
    }
  }

  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Cadastre um Aluno</h1>
      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full py-12 flex flex-col items-center justify-center space-y-4"
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
                <FormDescription>Digite o CPF do aluno acima</FormDescription>
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
                <FormDescription>Digite o nome do aluno acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dt_nascimento"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="DD-MM-AAAA"
                    mask="00-00-0000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite a data de nascimento do aluno acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Coloque o e-mail do aluno aqui" {...field} />
                </FormControl>
                <FormDescription>Digite o nome do aluno acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rg"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>RG</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="0000-000"
                    mask="0000-000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite o RG do aluno acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="DDD + 9 + Número"
                    mask="(00)00000-0000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite o número do aluno acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone2"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Telefone 2</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="DDD + 9 + Número"
                    mask="(00)00000-0000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite o número reserva do aluno caso tenha</FormDescription>
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
