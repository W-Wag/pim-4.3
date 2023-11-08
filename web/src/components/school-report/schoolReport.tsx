import { useCallback, useEffect, useState } from 'react';
import { get } from 'lodash';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { api } from '@/lib/api';
import { Skeleton } from '../ui/skeleton';

interface Report {
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

export function SchoolReport() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [semestre, setSemestre] = useState(0);

  const getRecords = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('notas/boletim/111.111.111-11/ra');
      const semestre = get(response, 'data[0].Semestre', 0);
      setSemestre(semestre);
      setReports(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return;
    }
  }, []);

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">Boletim Escolar</h1>

      <div className="w-2/4 h-2/4 bg-primary text-center mb-12">
        <p className="text-primary-foreground font-bold text-xl">
          Semestre atual: {semestre}
        </p>
        {!reports.length && !isLoading ? (
          <p className=" text-black font-bold text-xl leading-relaxed">
            Nenhum Boletim disponível
          </p>
        ) : isLoading ? (
          <Skeleton className="flex flex-col items-center justify-center w-[960px] h-[600px] space-y-4 bg-gray-800">
            <Skeleton className="flex flex-col items-center justify-center w-[960px] h-[150px] space-y-2 bg-gray-700">
              <Skeleton className="w-[300px] h-[30px] bg-gray-600" />
              <Skeleton className="w-[150px] h-[30px] bg-gray-600" />
            </Skeleton>
            <Skeleton className="flex flex-col items-center justify-center w-[800px] h-[120px] space-y-2 bg-gray-700">
              <Skeleton className="w-[150px] h-[30px] bg-gray-600" />
              <Skeleton className="w-[150px] h-[30px] bg-gray-600" />
              <Skeleton className="w-[150px] h-[30px] bg-gray-600" />
              <Skeleton className="w-[150px] h-[30px] bg-gray-600" />
            </Skeleton>
          </Skeleton>
        ) : (
          reports.map((report) => {
            return (
              <Table key={report.id}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px] text-primary-foreground font-bold">
                      Disciplina: {report.disciplina}
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
                      {report.nota.np1}
                    </TableCell>
                    <TableCell className="font-bold text-primary-foreground text-left">
                      {report.nota.np2}
                    </TableCell>
                    <TableCell className="font-bold text-primary-foreground text-left">
                      {report.nota.pim}
                    </TableCell>
                    <TableCell className="font-bold text-right text-primary-foreground">
                      {report.nota.mf}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          })
        )}
      </div>
    </div>
  );
}
