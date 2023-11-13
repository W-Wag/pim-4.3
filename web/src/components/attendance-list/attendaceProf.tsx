import { PlusCircleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Attendance {
  id: number;
  nome: string;
  presenca: number;
  disciplina: string;
  cpf_aluno: string;
}

export function AttendanceProf() {
  const [presence, setPresence] = useState<Attendance[]>([]);
  const cpf = localStorage.getItem('cpf_professor');

  const getAttendance = useCallback(async () => {
    const response = await api.get(`notas/presenca/${cpf}`);
    setPresence(response.data);
  }, [cpf]);

  const addAttendance = useCallback(
    async (id: number, cpf_aluno: string) => {
      await api.put(`notas/frequencia/${cpf}`, {
        id,
        cpf_aluno,
      });
      getAttendance();
    },
    [cpf, getAttendance],
  );

  useEffect(() => {
    getAttendance();
  }, [getAttendance]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Lista de Presença
      </h1>

      <div className="w-2/4 h-2/4 bg-primary text-center mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-[600px]">Disciplina</TableHead>
              <TableHead className="font-bold w-[250px]">Aluno</TableHead>
              <TableHead className="font-bold">Presença</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presence.map((presenca) => (
              <TableRow key={presenca.id}>
                <TableCell className="text-primary-foreground text-left font-bold">
                  {presenca.disciplina}
                </TableCell>
                <TableCell className="text-primary-foreground text-left font-bold">
                  {presenca.nome}
                </TableCell>
                <TableCell className="text-primary-foreground font-bold">
                  {presenca.presenca}
                </TableCell>
                <TableCell>
                  <Button
                    className="hover:bg-muted/25"
                    onClick={async () =>
                      await addAttendance(presenca.id, presenca.cpf_aluno)
                    }
                  >
                    <PlusCircleIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
