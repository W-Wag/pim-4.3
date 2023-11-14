import { useCallback, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { api } from '@/lib/api';

interface InfoProps {
  disciplina: string;
  curso: string;
  turma: number;
  quantidade_alunos: number;
  id: number;
}

export function Classes() {
  const cpf = localStorage.getItem('cpf_professor');
  const [info, setInfo] = useState<InfoProps[]>([]);
  const getClasses = useCallback(async () => {
    const response = await api.get(`/info/disciplina/professor/${cpf}`);
    setInfo(response.data);
  }, [cpf]);

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Detalhes sobre as Disciplinas que você leciona
      </h1>

      <Tabs className="w-[450px]">
        <TabsList>
          {info.map((item: InfoProps) => (
            <TabsTrigger key={item.id} value={item.id.toString()}>
              Código: {item.id}
            </TabsTrigger>
          ))}
        </TabsList>
        {info.map((item: InfoProps) => {
          return (
            <TabsContent value={item.id.toString()}>
              <div className="w-[100%] bg-slate-900 border border-separate border-slate-500">
                <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
                  Disciplina:
                </p>
                <p className="font-bold text-primary leading-relaxed text-sm text-center">
                  {item.disciplina}
                </p>
                <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
                  Curso:
                </p>
                <p className="font-bold text-primary leading-relaxed text-sm text-center">
                  {item.curso}
                </p>
                <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
                  Quantidade de Turmas cursando essa disciplina: {item.turma}
                </p>

                <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
                  Quantidade de Alunos cursando essa disciplina:{' '}
                  {item.quantidade_alunos}
                </p>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
      <p className="text-primary leading-relaxed text-sm text-center py-4">
        Selecione um código de disciplina para ver os seus detalhes
      </p>
    </div>
  );
}
