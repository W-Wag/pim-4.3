import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Classes() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Turmas em que você leciona
      </h1>

      <Tabs defaultValue="ADS-1" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="ADS-1">ADS 1</TabsTrigger>
          <TabsTrigger value="ADS-4">ADS 4</TabsTrigger>
        </TabsList>
        <TabsContent value="ADS-1">
          <div className="w-80 h-80 bg-slate-900 border border-separate border-slate-500">
            <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
              Nome da Turma:
            </p>
            <p className="font-bold text-primary leading-relaxed text-sm text-center px-2">
              Análise e Desenvolvimento de Sistemas 1
            </p>
            <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
              Quantidade de Alunos:
            </p>
            <p className="font-bold text-primary leading-relaxed text-sm text-center">
              54
            </p>
          </div>
        </TabsContent>
        <TabsContent value="ADS-4">
          <div className="w-80 h-80 bg-slate-900 border border-separate border-slate-500">
            <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
              Nome da Turma:
            </p>
            <p className="font-bold text-primary leading-relaxed text-sm text-center px-2">
              Análise e Desenvolvimento de Sistemas 4
            </p>
            <p className="font-bold text-primary leading-relaxed text-sm text-center py-4">
              Quantidade de Alunos:
            </p>
            <p className="font-bold text-primary leading-relaxed text-sm text-center">
              24
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
