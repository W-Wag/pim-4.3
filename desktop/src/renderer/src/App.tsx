import { Header } from './components/header/header'
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
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

  function onSubmit(values: z.infer<typeof formSchema>): void {
    console.log(values)
  }

  return (
    <div className="w-full h-full">
      <Header />
      <h1 className="py-6 text-2xl font-bold text-center">Logue no sistema para utiliza-lo</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full py-40 flex flex-col items-center justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }): ReactElement => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Coloque seu usuário aqui" {...field} />
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
                  <Input placeholder="Coloque sua senha aqui" {...field} />
                </FormControl>
                <FormDescription>Use a sua senha no campo acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
