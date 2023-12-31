import { ReactElement, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { Toaster } from '../ui/toaster';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { api } from '@/lib/api';
import { get } from 'lodash';

interface Grades {
  idDisciplina: number;
  ra: string;
  np1: number;
  np2: number;
  pim: number;
}

const formSchema = z.object({
  ra: z.string().min(2, {
    message: 'RA inválido',
  }),
});

export function UpdateGrades() {
  const [grades, setGrades] = useState<Grades>({
    idDisciplina: 0,
    ra: '',
    np1: 0,
    np2: 0,
    pim: 0,
  });
  const [nome, setNome] = useState('');
  const cpf = localStorage.getItem('cpf_professor');
  const { toast } = useToast();

  console.log(grades);

  const handleSendGrades = async () => {
    try {
      await api.put(`/notas/${cpf}`, grades);
      toast({
        title: 'Notas atualizadas',
        description: 'Notas atualizadas com sucesso',
      });
    } catch (err) {
      toast({
        title: 'Erro ao atualizar notas',
        description:
          'verifique se o código da disciplina esta correto e se e uma disciplina que você leciona',
      });
      return;
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ra: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      const response = await api.get(`/aluno/cpf/${values.ra}`);
      setGrades({ ...grades, ra: response.data.ra });
      setNome(response.data.nome);
    } catch (err) {
      const status = get(err, 'response.status');
      console.log(status);
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
            'Esse aluno pode estar com a matricula indisponível, tente mais tarde',
        });
        return;
      }

      toast({
        title: 'Error',
        description: 'Erro ao buscar o aluno',
      });
      return;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-primary font-bold text-2xl text-center py-4">
        Lançar Notas
      </h1>
      <p className="text-primary font-semibold leading-relaxed text-sm">
        Aqui você poderá procurar um aluno pelo seu ra e atualizar suas notas
      </p>
      <Toaster />
      {!grades.ra ? (
        <div className="w-1/3 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800 space-y-4">
          <p className="text-primary font-semibold leading-relaxed text-sm">
            Preencha abaixo o RA do aluno o qual queira lançar a nota
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col items-center justify-center space-y-4"
            >
              <FormField
                control={form.control}
                name="ra"
                render={({ field }): ReactElement => (
                  <FormItem>
                    <FormLabel>RA</FormLabel>
                    <FormControl>
                      <Input
                        className="w-96"
                        placeholder="EX. ab12rt34"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Preencha o ra do aluno acima para lançar sua nota
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Procurar</Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-1/3 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">Aluno: {nome}</h1>
          <p className="font-bold text-lg text-center py-2">RA: {grades.ra}</p>
          <div className="h-full flex-1 flex-col items-center">
            <Label>
              Código da Disciplina
              <Input
                onChange={(e) =>
                  setGrades({ ...grades, idDisciplina: Number(e.target.value) })
                }
                type="number"
              />
            </Label>
            <Label>
              NP1
              <Input
                onChange={(e) =>
                  setGrades({ ...grades, np1: Number(e.target.value) })
                }
                type="number"
                min={0}
                max={10}
              />
            </Label>
            <Label>
              NP2
              <Input
                onChange={(e) =>
                  setGrades({ ...grades, np2: Number(e.target.value) })
                }
                type="number"
                min={0}
                max={10}
              />
            </Label>
            <Label>
              PIM
              <Input
                onChange={(e) =>
                  setGrades({ ...grades, pim: Number(e.target.value) })
                }
                type="number"
                min={0}
                max={10}
              />
            </Label>

            <Button className="my-4 mx-[44%]" onClick={handleSendGrades}>
              Enviar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
