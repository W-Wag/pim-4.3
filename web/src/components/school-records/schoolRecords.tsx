import { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { api } from '@/lib/api';
import { LoadingTable } from './loadingTableRecords';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '../ui/toaster';

interface Records {
  nota: {
    np1: number;
    np2: number;
    pim: number;
    mf: number;
  };
  disciplina: string;
  Semestre: string;
  id: number;
}

export function SchoolRecords() {
  const [records, setRecords] = useState<Records[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getRecords = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('notas/historico/111.111.111-11/ra');
      setRecords(response.data);
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
    getRecords();
  }, [getRecords]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Histórico escolar
      </h1>
      <Toaster />
      <div className="w-2/4 h-2/4 bg-primary text-center mb-12">
        {isLoading ? (
          <LoadingTable />
        ) : records.length ? (
          records.map((historico) => {
            return (
              <Table key={historico.id}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px] text-primary-foreground font-bold">
                      Disciplina: {historico.disciplina}
                    </TableHead>
                    <TableHead className="text-right text-primary-foreground font-bold">
                      Semestre: {historico.Semestre}
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-[100px] font-bold">NP1</TableHead>
                    <TableHead className="font-bold">NP2</TableHead>
                    <TableHead className="font-bold">Trabalho</TableHead>
                    <TableHead className="text-right font-bold">
                      Média Final
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-primary-foreground text-left">
                      {historico.nota.np1}
                    </TableCell>
                    <TableCell className="font-bold text-primary-foreground text-left">
                      {historico.nota.np2}
                    </TableCell>
                    <TableCell className="font-bold text-primary-foreground text-left">
                      {historico.nota.pim}
                    </TableCell>
                    <TableCell className="font-bold text-right text-primary-foreground">
                      {historico.nota.mf}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          })
        ) : (
          <p className="text-black font-bold text-xl leading-relaxed">
            Nenhum histórico disponível
          </p>
        )}
      </div>
    </div>
  );
}
