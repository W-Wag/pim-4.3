import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function SchoolRecords() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Histórico escolar
      </h1>

      <div className="w-2/4 h-2/4 bg-primary text-center mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] text-primary-foreground font-bold">
                Disciplina: Artes cênicas
              </TableHead>
              <TableHead className="text-right text-primary-foreground font-bold">
                Semestre: 1
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
                6.5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left">
                5.5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left">
                7.4
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground">
                6.25
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[250px] text-primary-foreground font-bold">
                Disciplina: Teatro
              </TableHead>
              <TableHead className="text-right text-primary-foreground font-bold">
                Semestre: 2
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
                8
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left">
                7
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left">
                6
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground">
                7.6
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[250px] text-primary-foreground font-bold">
                Disciplina: História da arte
              </TableHead>
              <TableHead className="text-right text-primary-foreground font-bold">
                Semestre: 3
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
                6.5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left">
                5.5
              </TableCell>
              <TableCell className="font-bold text-primary-foreground text-left">
                7.4
              </TableCell>
              <TableCell className="font-bold text-right text-primary-foreground">
                6.25
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
