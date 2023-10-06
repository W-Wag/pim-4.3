export function StudentArea() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">Área do Aluno</h1>

      <div className="flex flex-row items-center space-x-4">
        <div className="bg-primary w-48 h-36 rounded space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
          <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
            Histórico Escolar
          </h1>
        </div>

        <div className="bg-primary w-48 h-36 rounded space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
          <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
            Lista de Presença
          </h1>
        </div>

        <div className="bg-primary w-48 h-36 rounded space-y-2 py-4 text-center hover:bg-slate-300 hover:cursor-pointer">
          <h1 className="text-primary-foreground font-bold text-2xl py-4 hover:cursor-pointer hover:text-primary">
            Boletim Escolar
          </h1>
        </div>
      </div>
    </div>
  );
}
