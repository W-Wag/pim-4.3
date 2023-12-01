import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMaskInput } from 'react-imask';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { Button } from './components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from './components/ui/input';
import { api } from './lib/api';
import { Toaster } from './components/ui/toaster';
import { useToast } from './components/ui/use-toast';
import { get } from 'lodash';

export function Login() {
  const formSchema = z.object({
    id: z.string().max(14, {
      message: 'Identificador não é valido',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
    },
  });

  const { toast } = useToast();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (pathname === '/aluno/login') {
      setIsStudent(true);
    }
  }, [pathname]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isStudent && /^[\d]{3}\.[\d]{3}\.[\d]{3}-[\d]{2}$/.test(values.id)) {
        const { data } = await api.get(`/aluno/${values.id}/ra`);
        localStorage.setItem('cpf_aluno', data.cpf);
        navigate('/aluno');
        return;
      } else if (isStudent) {
        const { data } = await api.get(`/aluno/cpf/${values.id}`);
        localStorage.setItem('ra_aluno', data.ra);
        navigate('/aluno');
        return;
      }

      const { data } = await api.get(`/professores/${values.id}`);
      localStorage.setItem('cpf_professor', data.cpf);
      navigate('/professor');
      return;
    } catch (err) {
      console.log(err);
      const status = get(err, 'response.status');

      if (status === 404) {
        toast({
          title: 'Error',
          description:
            'identificador não encontrado, verifique se esta correto!',
        });
        return;
      }
      if (status === 401) {
        toast({
          title: 'Error',
          description:
            'Sua matricula pode estar inativa, por favor entre em contato conosco!',
        });
        return;
      }

      toast({
        title: 'Error',
        description:
          'Não foi possível entrar no sistema, tente novamente mais tarde!',
      });
      return;
    }
  }
  return (
    <div className="w-full h-full">
      <h1 className="text-primary font-bold text-2xl text-center py-2">
        Entrar no sistema
      </h1>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-8 py-12"
        >
          {isStudent ? (
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg leading-relaxed">
                    Aluno digite seu identificador abaixo
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Seu CPF ou RA" {...field} />
                  </FormControl>
                  <FormDescription>
                    Digite seu CPF ou RA cadastrado no campo acima para entrar
                    no sistema, <br /> lembre-se de colocar os pontos e o traço
                    caso tente entrar com seu CPF.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg leading-relaxed">
                    Professor digite seu CPF abaixo
                  </FormLabel>
                  <FormControl>
                    <IMaskInput
                      mask="000.000.000-00"
                      className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Seu CPF"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Digite seu CPF cadastrado no campo acima para entrar no
                    sistema
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="left-32">
            Confirmar
          </Button>
        </form>
      </Form>
    </div>
  );
}
