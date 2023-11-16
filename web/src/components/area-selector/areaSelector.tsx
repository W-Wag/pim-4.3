import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

export function AreaSelector() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-gray-800 rounded-xl w-[650px] space-x-4">
        <NavigationMenuItem>
          <Link to="/aluno" className={navigationMenuTriggerStyle()}>
            Área do Aluno
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link className={navigationMenuTriggerStyle()} to="/professor">
            Área do Professor
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/servicos" className={navigationMenuTriggerStyle()}>
            Serviços
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
