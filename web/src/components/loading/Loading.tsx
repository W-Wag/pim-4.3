import { Skeleton } from '../ui/skeleton';
import { Loader } from 'lucide-react';

export function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center z-50">
      <Skeleton className="flex flex-col items-center justify-center bg-gray-500 w-[100vw] h-[100vh]">
        <p className="text-primary text-xl font-bold text-center">Carregando</p>
        <Loader className="animate-spin" />
      </Skeleton>
    </div>
  );
}
