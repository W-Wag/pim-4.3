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
} from './components/ui/form'
import { Input } from './components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from './components/ui/button'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from './components/ui/use-toast'
import { Toaster } from './components/ui/toaster'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Usuário inválido'
  }),
  password: z.string().min(2, {
    message: 'Senha inválido'
  })
})

export function App(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const navigate = useNavigate()
  const { toast } = useToast()

  function onSubmit(values: z.infer<typeof formSchema>): void {
    console.log(values)
    const { username, password } = values
    const userCheck = /^adm|adm1|adm2$/.test(username)
    const passwordCheck = /^1234|123|12345$/.test(password)
    if (userCheck && passwordCheck) {
      toast({
        title: 'Sucesso',
        description: 'Usuário entrou com sucesso'
      })
      navigate('/home')
      return
    }
    toast({
      title: 'Error',
      description: 'Usuário não encontrado'
    })
    return
  }

  return (
    <div className="w-full h-full">
      <h1 className="py-6 text-2xl font-bold text-center">Logue no sistema para utiliza-lo</h1>

      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full py-20 flex flex-col items-center justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Coloque seu usuário aqui" {...field} />
                </FormControl>
                <FormDescription>Coloque seu usuário acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input className="w-96" placeholder="Coloque sua senha aqui" {...field} />
                </FormControl>
                <FormDescription>Use a sua senha no campo acima</FormDescription>
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
