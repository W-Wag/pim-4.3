import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '../ui/toaster';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { api } from '@/lib/api';
import { get } from 'lodash';

interface Student {
  nome: string;
  cod_turma: string;
  ra: string;
  Turma: {
    Curso: {
      nome: string;
    };
  };
}

export function CheckRegistration() {
  const [foundedRegister, setFoundedRegister] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  const { toast } = useToast();
  const formSchema = z.object({
    register: z.string().min(2, {
      message: 'Sua matrícula não é valida',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      register: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.get(`/aluno/cpf/${values.register}`);
      setStudent(response.data);
      toast({
        title: 'Matrícula encontrada',
        description:
          'clique em ver detalhes para mais detalhes sobre essa matrícula',
      });
      setFoundedRegister(true);
    } catch (err) {
      console.log(err);

      const status = get(err, 'response.status');

      if (status === 401) {
        toast({
          title: 'Error',
          description:
            'Esse aluno pode estar com a matricula indisponível, contate-nos para mais detalhes',
        });
        return;
      }

      toast({
        title: 'Não foi possível encontrar essa matrícula',
        description: 'Entre em contato conosco para mais informações.',
      });
      return;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Consultar Matrícula
      </h1>

      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-8 py-12"
        >
          <FormField
            control={form.control}
            name="register"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg leading-relaxed">
                  Matrícula
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Preencha aqui"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Digite a matrícula a ser pesquisada acima para verificar se
                  você já está <br />
                  registrado em nosso sistema.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {foundedRegister ? (
            <Dialog>
              <DialogTrigger>Ver Detalhes</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Matrícula: {student?.ra}</DialogTitle>
                  <DialogDescription>
                    Aqui está algumas informações sobre o aluno cadastrado nessa
                    matrícula
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="leading-relaxed">
                    <span className="pr-2 font-semibold">Aluno:</span>{' '}
                    {student?.nome}
                  </p>
                  <p className="leading-relaxed">
                    <span className="pr-2 font-semibold">Turma:</span>{' '}
                    {student?.cod_turma}
                  </p>
                  <p className="leading-relaxed">
                    <span className="pr-2 font-semibold">Curso:</span>{' '}
                    {student?.Turma.Curso.nome}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <></>
          )}
          <Button type="submit" className="left-32">
            Confirmar
          </Button>
        </form>
      </Form>
    </div>
  );
}
