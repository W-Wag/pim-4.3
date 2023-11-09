import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';

export function LoadingTable() {
  return (
    <Skeleton className="flex w-[960px] h-[400px] space-y-4 bg-gray-500">
      <Table>
        <TableRow>
          <TableHead className="flex flex-row w-[250px] text-primary-foreground font-bold">
            Disciplina:
            <Skeleton className="w-[150px] h-[20px] bg-gray-700 mx-2" />
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="w-[100px] font-bold">NP1</TableHead>
          <TableHead className="font-bold">NP2</TableHead>
          <TableHead className="font-bold">Trabalho</TableHead>
          <TableHead className="text-right font-bold">Média Final</TableHead>
        </TableRow>

        <TableBody>
          <TableRow>
            <TableCell className="font-bold text-primary-foreground text-left">
              <Skeleton className="w-[150px] h-[20px] bg-gray-700" />
            </TableCell>
            <TableCell className="font-bold text-primary-foreground text-left">
              <Skeleton className="w-[150px] h-[20px] bg-gray-700" />
            </TableCell>
            <TableCell className="font-bold text-primary-foreground text-left">
              <Skeleton className="w-[150px] h-[20px] bg-gray-700" />
            </TableCell>
            <TableCell className="font-bold text-right text-primary-foreground">
              <Skeleton className="w-[150px] h-[20px] bg-gray-700" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Skeleton>
  );
}
