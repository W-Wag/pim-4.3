import { useCallback, useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { api } from '@/lib/api';
import { useToast } from '../ui/use-toast';
import { Toaster } from '../ui/toaster';

interface Courses {
  nome: string;
  cod: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/cursos/');
      setCourses(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Ocorreu um erro inesperado, tente novamente mais tarde!',
      });
      return;
    }
  }, [toast]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <Command>
      <Toaster />
      <CommandInput placeholder="Procure se o curso desejado está disponível" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
        {isLoading ? (
          <CommandItem> Carregando...</CommandItem>
        ) : (
          courses.map((course) => (
            <CommandGroup key={course.cod}>
              <CommandItem>{course.nome}</CommandItem>
            </CommandGroup>
          ))
        )}
      </CommandList>
    </Command>
  );
}
