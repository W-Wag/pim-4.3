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
import { api } from '@renderer/lib/axios'
import { Skeleton } from './ui/skeleton'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
import { Label } from './ui/label'

const formSchema = z.object({
  name: z.string().optional(),
  ctps: z.string().optional(),
  rg: z.string().optional(),
  register: z.string().optional(),
  title: z.string().optional(),
  birthday: z.string().optional(),
  email: z.string().optional(),
  number: z.string().optional(),
  number2: z.string().optional()
})

export function UpdateProfessor(): JSX.Element {
  const { toast } = useToast()

  const [cpf, setCpf] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [ctpsValue, setCtpsValue] = useState('')
  const [rgValue, setRgValue] = useState('')
  const [registerValue, setRegisterValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [birthdayValue, setBirthdayValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [numberValue, setNumberValue] = useState('')
  const [number2Value, setNumber2Value] = useState('')
  const [professor, setProfessor] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ctps: '',
      rg: '',
      birthday: '',
      email: '',
      title: '',
      register: '',
      number: '',
      number2: ''
    }
  })

  async function getProfessor(cpf: string): Promise<void> {
    try {
      const { data } = await api.get(`/professores/${cpf}`)
      const [datePart] = data.dt_nascimento.split('T')
      const [year, month, day] = datePart.split('-')
      const birthday = `${day}/${month}/${year}`
      setNameValue(data.nome)
      setCtpsValue(data.ctps)
      setRgValue(data.rg)
      setRegisterValue(data.funcional)
      setTitleValue(data.titularidade)
      setBirthdayValue(birthday)
      setEmailValue(data.email)
      setNumberValue(data.telefone)
      setNumber2Value(data.telefone2)
      setProfessor(true)
      toast({
        title: 'Sucesso',
        description: 'professor encontrado'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao buscar o professor'
      })
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)

    try {
      setIsLoading(true)
      const birthdayToISO = birthdayValue.split('/').reverse().join('-')
      const birthday = new Date(birthdayToISO).toISOString()
      console.log(birthday)
      await api.put(`/professores/atualizar/${cpf}`, {
        nome: nameValue,
        ctps: ctpsValue,
        rg: rgValue,
        dt_nascimento: birthday,
        titularidade: registerValue,
        email: emailValue,
        telefone: numberValue,
        telefone2: number2Value
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao atualizar o professor'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao atualizar o professor'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Atualize um professor</h1>

      <Toaster />

      <div className="flex justify-center">
        <Label className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="CPF do Professor"
            onChange={(e): void => setCpf(e.target.value)}
          />
          <Button onClick={(): Promise<void> => getProfessor(cpf)}>Buscar</Button>
        </Label>
      </div>

      {professor ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full py-12 flex flex-col items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Nome do Professor</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. Carlos"
                      {...field}
                      value={nameValue}
                      onChange={(e): void => {
                        setNameValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o nome atualizado do curso acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. 12/12/1900"
                      {...field}
                      value={birthdayValue}
                      onChange={(e): void => {
                        setBirthdayValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite a data de nascimento atualizada acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. example@example.com"
                      {...field}
                      value={emailValue}
                      onChange={(e): void => {
                        setEmailValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o email atualizado acima</FormDescription>
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
                    <Input
                      className="w-96"
                      placeholder="EX. 0000-000"
                      {...field}
                      value={rgValue}
                      onChange={(e): void => {
                        setRgValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o RG atualizado acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Titularidade</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. Mestrado"
                      {...field}
                      value={titleValue}
                      onChange={(e): void => {
                        setTitleValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite a Titularidade atualizada acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ctps"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>CTPS</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder=""
                      {...field}
                      value={ctpsValue}
                      onChange={(e): void => {
                        setCtpsValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o CTPS atualizado acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="register"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Funcional</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. DDD + Número"
                      {...field}
                      value={registerValue}
                      onChange={(e): void => {
                        setRegisterValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite a funcional atualizada acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. Redes de computadores"
                      {...field}
                      value={numberValue}
                      onChange={(e): void => {
                        setNumberValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o telefone atualizado acima</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number2"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Telefone 2</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. DDD + Número"
                      {...field}
                      value={number2Value}
                      onChange={(e): void => {
                        setNumber2Value(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o telefone atualizado acima</FormDescription>
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
      ) : (
        <></>
      )}
    </div>
  )
}
