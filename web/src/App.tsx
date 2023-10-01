import { Header } from './components/header/header';
import { Separator } from './components/ui/separator';
import { Footer } from './footer/footer';

export function App() {
  return (
    <div className="h-full w-full">
      <Header />
      <Separator />
      <Footer />
    </div>
  );
}
