import { AreaSelector } from './components/area-selector/areaSelector';
import { Separator } from './components/ui/separator';

export function App() {
  return (
    <div className="h-full w-full">
      <Separator />
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-primary font-bold text-2xl mb-6">
          Bem-vindo(a) ao sistema
        </h1>
        <AreaSelector />
      </div>
    </div>
  );
}
