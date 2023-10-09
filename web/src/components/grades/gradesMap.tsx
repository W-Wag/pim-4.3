import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function GradesMap() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4 print:text-primary">
        Mapa de notas
      </h1>

      <div className="w-2/4 h-2/4 bg-primary text-center mb-12 print:w-full">
        <Table className="print:table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] text-primary-foreground font-bold">
                Turma: ADS 3/4
              </TableHead>
              <TableHead className="text-left text-primary-foreground font-bold">
                Disciplina: Artes cênicas
              </TableHead>
              <TableHead className="text-right text-primary-foreground font-bold">
                Semestre: 4
              </TableHead>
            </TableRow>

            <TableRow>
              <TableHead className="w-[100px] font-bold print:px-4 print:py-4">
                Aluno
              </TableHead>
              <TableHead className="font-bold">NP1</TableHead>
              <TableHead className="font-bold">NP2</TableHead>
              <TableHead className="font-bold">Trabalho</TableHead>
              <TableHead className="text-right font-bold print:px-4 print:py-4">
                Média Final
              </TableHead>
              <TableHead className="text-right font-bold print:px-4 print:py-4">
                Situação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-[250px] font-bold text-primary-foreground text-left print:px-4 print:py-4">
                Wilson
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                6.5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                5.5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                7.4
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground print:px-4 print:py-4">
                6.25
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground print:px-4 print:py-4">
                AP
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[250px] font-bold text-primary-foreground text-left print:px-4 print:py-4">
                Roberto
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                0
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                0
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground print:px-4 print:py-4">
                2
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground print:px-4 print:py-4">
                C
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
