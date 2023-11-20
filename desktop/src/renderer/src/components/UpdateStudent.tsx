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
import { get } from 'lodash'

const formSchema = z.object({
  name: z.string().optional(),
  rg: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.string().optional(),
  email: z.string().optional(),
  number: z.string().optional(),
  number2: z.string().optional()
})

export function UpdateStudent(): JSX.Element {
  const { toast } = useToast()

  const [cpf, setCpf] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [rgValue, setRgValue] = useState('')
  const [genderValue, setGenderValue] = useState('')
  const [birthdayValue, setBirthdayValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [numberValue, setNumberValue] = useState('')
  const [number2Value, setNumber2Value] = useState('')
  const [student, setStudent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      rg: '',
      birthday: '',
      email: '',
      gender: '',
      number: '',
      number2: ''
    }
  })

  async function getStudent(cpf: string): Promise<void> {
    try {
      const { data } = await api.get(`/aluno/${cpf}/ra`)
      const [datePart] = data.dt_nascimento.split('T')
      const [year, month, day] = datePart.split('-')
      const birthday = `${day}/${month}/${year}`
      setNameValue(data.nome)
      setRgValue(data.rg)
      setGenderValue(data.genero)
      setBirthdayValue(birthday)
      setEmailValue(data.email)
      setNumberValue(data.telefone)
      setNumber2Value(data.telefone2)
      setStudent(true)
      toast({
        title: 'Sucesso',
        description: 'Aluno encontrado'
      })
    } catch (err) {
      console.log(err)
      const responseStatus = get(err, 'response.status')

      if (responseStatus === 401) {
        toast({
          title: 'Erro',
          description:
            'Esse aluno esta com a situação Inativa, para que seja possível atualiza-lo ele deve esta com a matricula ativa'
        })
        setIsLoading(false)
        return
      }
      toast({
        title: 'Erro',
        description: 'erro desconhecido ao buscar o aluno'
      })
    }
  }

  function validation(): { birthday: string; gender: string } {
    const birthdayToISO = birthdayValue.split('/').reverse().join('-')
    const birthday = new Date(birthdayToISO).toISOString()

    let gender
    if (genderValue !== 'H' && genderValue !== 'M') {
      toast({
        title: 'Erro',
        description: 'Gênero deve ser H ou M'
      })
      gender = 'Not Valid'
    }

    if (genderValue === 'H' || genderValue === 'M') gender = genderValue

    return {
      birthday,
      gender
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)

    try {
      setIsLoading(true)

      if (validation().gender === 'Not Valid') {
        toast({
          title: 'Erro',
          description: 'Gênero deve ser H ou M'
        })
        setIsLoading(false)
        return
      }

      await api.put(`/alunos/atualizar/${cpf}`, {
        Aluno: {
          nome: nameValue,
          rg: rgValue,
          dt_nascimento: validation().birthday,
          genero: validation().gender,
          email: emailValue,
          telefone: numberValue,
          telefone2: number2Value
        }
      })
      setIsLoading(false)
      toast({
        title: 'Sucesso',
        description: 'sucesso ao atualizar o aluno'
      })
    } catch (err) {
      console.log(err)

      toast({
        title: 'Erro',
        description: 'erro desconhecido ao atualizar o aluno'
      })
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Atualize um aluno</h1>

      <Toaster />

      <div className="flex justify-center">
        <Label className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="CPF do Aluno"
            onChange={(e): void => setCpf(e.target.value)}
          />
          <Button onClick={(): Promise<void> => getStudent(cpf)}>Buscar</Button>
        </Label>
      </div>
      <p className="text-sm text-center text-primary font-semibold py-2">
        Não se esqueça dos pontos e traços do CPF
      </p>

      {student ? (
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
                  <FormLabel>Nome do Aluno</FormLabel>
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
              name="gender"
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <Input
                      className="w-96"
                      placeholder="EX. Mestrado"
                      {...field}
                      value={genderValue}
                      onChange={(e): void => {
                        setGenderValue(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Digite o gênero atualizado acima</FormDescription>
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
