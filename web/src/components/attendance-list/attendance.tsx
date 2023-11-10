import { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useToast } from '../ui/use-toast';
import { Toaster } from '../ui/toaster';
import { api } from '@/lib/api';
import { Skeleton } from '../ui/skeleton';

interface Frequency {
  disciplina: string;
  presenca: string;
  id: number;
}

export function Attendance() {
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getFrequency = useCallback(async () => {
    const cpf = localStorage.getItem('cpf_aluno');
    const ra = localStorage.getItem('ra_aluno');
    try {
      setIsLoading(true);
      let response;
      if (cpf) {
        response = await api.get(`notas/presenca/${cpf}/ra`);
      } else if (ra) {
        response = await api.get(`notas/presenca/cpf/${ra}`);
      }
      if (!response) return;
      setFrequencies(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Ocorreu um erro inesperado, tente novamente mais tarde!',
      });
      return;
    }
  }, [toast]);

  useEffect(() => {
    getFrequency();
  }, [getFrequency]);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Lista de Presença
      </h1>
      <Toaster />

      <div className="w-2/4 h-2/4 bg-primary text-center mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-[600px]">Disciplinas</TableHead>
              <TableHead className="font-bold  px-48">Presença</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="w-[900px]">
                  <Skeleton className="w-[150px] h-[20px] bg-gray-600" />
                </TableCell>
                <TableCell className="w-[600px] px-56">
                  <Skeleton className="w-[50px] h-[20px] bg-gray-600" />
                </TableCell>
              </TableRow>
            ) : frequencies ? (
              frequencies.map((frequency) => {
                return (
                  <TableRow key={frequency.id}>
                    <TableCell className="text-primary-foreground text-left font-bold">
                      {frequency.disciplina}
                    </TableCell>
                    <TableCell className="text-primary-foreground font-bold">
                      {frequency.presenca}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <p className=" text-black font-bold text-xl leading-relaxed">
                Nenhuma Frequência disponível
              </p>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
