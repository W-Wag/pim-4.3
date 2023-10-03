import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

export function AreaSelector() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="bg-primary text-sm text-primary-foreground rounded-sm p-2 m-2"
            href="Login"
          >
            Área do Professor
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="bg-primary text-sm text-primary-foreground rounded-sm p-2 m-2"
            href="#"
          >
            Área do Aluno
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="bg-primary text-sm text-primary-foreground rounded-sm p-2 m-2"
            href="#"
          >
            Cursos disponíveis
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="bg-primary text-sm text-primary-foreground rounded-sm p-2 m-2"
            href="#"
          >
            Serviços
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
