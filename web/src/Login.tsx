import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from './components/header/header';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { Footer } from './footer/footer';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

export function Login() {
  const formSchema = z.object({
    email: z.string().email({
      message: 'E-mail não é valido',
    }),
    password: z.string().min(2, {
      message: 'Password must be at least 2 characters',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-full h-full">
      <Header />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-8 py-12"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg leading-relaxed">Email</FormLabel>
                <FormControl>
                  <Input className="w-80" placeholder="Seu e-mail" {...field} />
                </FormControl>
                <FormDescription>
                  Digite seu e-mail cadastrado acima para entrar no sistema
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg leading-relaxed">Senha</FormLabel>
                <FormControl>
                  <Input
                    className="w-80"
                    placeholder="Sua Senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Digite sua senha cadastrada acima para entrar no sistema
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="left-32">
            Submit
          </Button>
        </form>
      </Form>
      <Footer />
    </div>
  );
}
