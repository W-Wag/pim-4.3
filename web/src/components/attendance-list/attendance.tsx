import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function Attendance() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Lista de Presença
      </h1>

      <div className="w-2/4 h-2/4 bg-primary text-center mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-[600px]">Disciplinas</TableHead>
              <TableHead className="font-bold">Presença</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-primary-foreground text-left font-bold">
                Teatro
              </TableCell>
              <TableCell className="text-primary-foreground font-bold">
                0
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-primary-foreground text-left font-bold">
                História da arte
              </TableCell>
              <TableCell className="text-primary-foreground font-bold">
                12
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-primary-foreground text-left font-bold">
                Artes Cênicas
              </TableCell>
              <TableCell className="text-primary-foreground font-bold">
                4
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
