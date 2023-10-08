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
import { useState } from 'react';

export function AttendanceProf() {
  const [presence, setPresence] = useState(0);
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
              <TableHead className="font-bold">Faltas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-primary-foreground text-left font-bold">
                Teatro
              </TableCell>
              <TableCell className="text-primary-foreground text-left font-bold">
                João
              </TableCell>
              <TableCell className="text-primary-foreground font-bold">
                {presence}
              </TableCell>
              <TableCell>
                <Button
                  className="hover:bg-muted/25"
                  onClick={() => setPresence(presence + 1)}
                >
                  <PlusCircleIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-primary-foreground text-left font-bold">
                Teatro
              </TableCell>
              <TableCell className="text-primary-foreground text-left font-bold">
                Maria
              </TableCell>
              <TableCell className="text-primary-foreground font-bold">
                4
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-primary-foreground text-left font-bold">
                Teatro
              </TableCell>
              <TableCell className="text-primary-foreground text-left font-bold">
                José
              </TableCell>
              <TableCell className="text-primary-foreground font-bold">
                10
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
