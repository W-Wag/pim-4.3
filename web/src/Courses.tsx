import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/ui/command';

export function Courses() {
  return (
    <Command>
      <CommandInput placeholder="Procure se o curso desejado está disponível" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
        <CommandGroup heading="Cursos Disponíveis">
          <CommandItem>Analise e desenvolvimento de sistemas</CommandItem>
          <CommandItem>Engenharia de Software</CommandItem>
          <CommandItem>Ciência da computação</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
