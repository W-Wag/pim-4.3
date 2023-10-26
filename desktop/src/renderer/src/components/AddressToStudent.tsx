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
import { ReactElement, useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { api } from '@renderer/lib/axios'
import { Skeleton } from './ui/skeleton'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  uf: z.string().max(2, {
    message: 'UF inválido'
  }),
  nomeEstado: z.string().min(2, {
    message: 'Nome de Estado inválido'
  }),
  nomeCidade: z.string().min(2, {
    message: 'Nome da Cidade inválido'
  }),
  cep: z.string().regex(/[\d]{5}-[\d]{3}/, {
    message: 'Cep inválido'
  }),
  logradouro: z.string().min(2, {
    message: 'logradouro inválido'
  }),
  bairro: z.string().min(2, {
    message: 'bairro inválido'
  }),
  complemento: z.string().optional(),
  cpf: z.string().optional()
})

export function AddressToStudent(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uf: '',
      nomeEstado: '',
      nomeCidade: '',
      cep: '',
      logradouro: '',
      bairro: '',
      complemento: '',
      cpf: ''
    }
  })
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [cpf, setCpf] = useState('')

  const { pathname } = useLocation()
  const { state } = useLocation()

  console.log(state)

  useEffect(() => {
    if (/aluno/.test(pathname)) {
      setIsStudent(true)
    }
    if (state) setCpf(state)
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    try {
      setIsLoading(true)
      const response = await api.post('/enderecos', {
        uf: values.uf,
        nome: values.nomeEstado,
        Cidade: {
          nomeCidade: values.nomeCidade,
          Endereco: {
            cep: values.cep,
            logradouro: values.logradouro,
            complemento: values.complemento,
            bairro: values.bairro
          }
        }
      })

      console.log(response)
      const city = await response.data.Cidade[0]
      const address = city.Endereco[0]
      const id = address.id
      console.log(id)

      if (values.cpf && id) {
        const response1 = await api.put(`/enderecos/aluno/${values.cpf}`, {
          id: id
        })

        console.log(response1)
      }

      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao criar o endereço'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao criar o endereço'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      {isStudent ? (
        <h1 className="py-6 text-2xl font-bold text-center">Cadastre um Endereço para o aluno</h1>
      ) : (
        <h1 className="py-6 text-2xl font-bold text-center">
          Cadastre um Endereço para o professor
        </h1>
      )}
      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full py-12 flex flex-col items-center justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="uf"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>UF</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="'DF', 'RJ', 'SP'..." {...field} />
                </FormControl>
                <FormDescription>Digite o UF do estado acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nomeEstado"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Nome do estado</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Estado" {...field} />
                </FormControl>
                <FormDescription>Digite o nome do estado acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomeCidade"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Nome da cidade</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Cidade" {...field} />
                </FormControl>
                <FormDescription>Digite o nome da cidade acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cep"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-9 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="00000-00"
                    mask="00000-000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Digite o cep do endereço</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logradouro"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Logradouro</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Rua, Avenida, Alameda..." {...field} />
                </FormControl>
                <FormDescription>Digite o logradouro do endereço acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bairro"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Bairro" {...field} />
                </FormControl>
                <FormDescription>Digite o nome do bairro acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complemento"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Apt.42, Casa A..." {...field} />
                </FormControl>
                <FormDescription>Se houver complemento digite acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
