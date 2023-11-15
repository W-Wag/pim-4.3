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

interface GradeMap {
  id: number;
  disciplina: string;
  carga_horaria: number;
  semestre: number;
  mapa: {
    ra: string;
    aluno: string;
    turma: string | undefined;
    disciplina: string;
    np1: number;
    np2: number;
    pim: number;
    presenca: number;
    media: number;
    semestre: number;
  }[];
}

export function GradesMap() {
  const [gradesMaps, setGradesMaps] = useState<GradeMap[]>([]);
  const cpf = localStorage.getItem('cpf_professor');

  const getGradesMap = useCallback(async () => {
    const response = await api.get(`notas/mapa/${cpf}`);
    setGradesMaps(response.data);
  }, [cpf]);

  useEffect(() => {
    getGradesMap();
  }, [getGradesMap]);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4 print:text-primary">
        Mapa de notas
      </h1>

      <div className="w-full h-2/4 bg-primary text-center mb-12 space-y-4 print:w-full">
        {gradesMaps.map((item) => {
          return (
            <Table
              key={item.id}
              className="print:table-auto print:border print:border-gray-800"
            >
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left text-primary-foreground font-bold">
                    Disciplina: {item.disciplina}
                  </TableHead>
                  <TableHead className="text-right text-primary-foreground font-bold">
                    Semestre: {item.semestre}
                  </TableHead>
                </TableRow>

                <TableRow>
                  <TableHead className="w-[70px] font-bold print:px-2 print:py-4">
                    RA
                  </TableHead>
                  <TableHead className="font-bold">Aluno</TableHead>
                  <TableHead className="font-bold">Turma</TableHead>
                  <TableHead className="font-bold">NP1</TableHead>
                  <TableHead className="font-bold">NP2</TableHead>
                  <TableHead className="font-bold pl-8">Trabalho</TableHead>
                  <TableHead className="font-bold">Presença</TableHead>
                  <TableHead className="text-right font-bold print:py-4">
                    Média Final
                  </TableHead>
                  <TableHead className="text-right font-bold">
                    Situação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.mapa.map((mapa) => {
                  return (
                    <TableRow key={mapa.ra}>
                      <TableCell className="w-[250px] font-bold text-primary-foreground text-left print:px-4 print:py-4">
                        {mapa.ra}
                      </TableCell>
                      <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                        {mapa.aluno}
                      </TableCell>
                      <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                        {mapa.turma}
                      </TableCell>
                      <TableCell className="font-bold text-primary-foreground text-left print:px-8 print:py-4">
                        {mapa.np1}
                      </TableCell>
                      <TableCell className="font-bold text-primary-foreground text-left print:px-4 print:py-4">
                        {mapa.np2}
                      </TableCell>
                      <TableCell className="font-bold text-primary-foreground text-left pl-12 print:px-12 print:py-4">
                        {mapa.pim}
                      </TableCell>
                      <TableCell className="font-bold text-left text-primary-foreground pl-8  print:py-4">
                        {mapa.presenca}
                      </TableCell>
                      <TableCell className="font-bold text-right text-primary-foreground print:px-4 print:py-4">
                        {mapa.media}
                      </TableCell>
                      {mapa.media >= 5 &&
                      mapa.presenca >= item.carga_horaria / 24 / 2 ? (
                        <TableCell className="font-bold text-right text-primary-foreground">
                          Aprovado
                        </TableCell>
                      ) : (
                        <TableCell className="font-bold text-right text-primary-foreground">
                          Reprovado/Cursando
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          );
        })}
      </div>
    </div>
  );
}
