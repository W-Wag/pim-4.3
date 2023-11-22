import { useEffect } from 'react';
import { AreaSelector } from './components/area-selector/areaSelector';
import { Separator } from './components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion';

export function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="h-full w-full">
      <Separator />
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-primary font-bold text-2xl mb-6">
          Bem-vindo(a) ao sistema
        </h1>
        <AreaSelector />
      </div>

      <div className="flex w-full items-center justify-center flex-wrap space-x-2 py-4 gap-12">
        <div className="flex flex-col justify-center items-center  w-[500px] h-96 bg-[url('../public/entre-em-contato.jpg')] bg-center sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h1 className="text-primary font-bold text-2xl px-2 py-4">
            Em caso de alguma dúvida, entre em contato conosco
          </h1>
          <Link to="/contatos">
            <Button>Contatos</Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center  w-[500px] h-96 bg-[url('../public/cursos-disponiveis.jpg')] bg-center sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h1 className="text-primary font-bold text-2xl px-2 py-4">
            Quer saber se aquele curso dos sonhos esta disponível?
          </h1>
          <Link to="servicos/cursos">
            <Button>Clique aqui</Button>
          </Link>
        </div>
      </div>

      <Accordion className="mb-32" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Coleta de Dados</AccordionTrigger>
          <AccordionContent>
            Esta aplicação coleta dados pessoais de alunos e professores,
            incluindo nome, data de nascimento, endereço, telefone, e-mail,
            notas escolares, e outros dados necessários para o funcionamento da
            aplicação.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Uso dos dados</AccordionTrigger>
          <AccordionContent>
            Os dados coletados serão utilizados para fins educacionais,
            incluindo controle de notas, frequência, e outros dados acadêmicos.
            Os dados também poderão ser utilizados para fins de marketing, desde
            que o usuário consinta expressamente.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Armazenamento dos dados</AccordionTrigger>
          <AccordionContent>
            Os dados coletados serão armazenados em servidores seguros,
            localizados no Brasil. Os usuários podem solicitar a exclusão de
            seus dados a qualquer momento, entrando em contato com o responsável
            pela aplicação.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <div className="w-full h-full mt-24">
        <div className="flex flex-row justify-center items-center space-x-6 space-y-4 w-full max-md:flex-col max-md:my-16">
          <div></div>
          <div className="bg-gray-200 bg-opacity-10 border border-b-2 border-gray-400 space-y-8 w-1/3 h-40 rounded-md max-md:w-96">
            <h1 className="text-lg text-primary text-center font-semibold">
              Coleta de Dados
            </h1>
            <p className="text-sm text-primary text-justify leading-relaxed">
              Esta aplicação coleta dados pessoais de alunos e professores,
              incluindo nome, data de nascimento, endereço, telefone, e-mail,
              notas escolares, e outros dados necessários para o funcionamento
              da aplicação.
            </p>
          </div>
          <div className="bg-gray-200 bg-opacity-10 border border-b-2 border-gray-400 space-y-8 w-1/3 h-40 rounded-md max-md:w-96">
            <h1 className="text-lg text-primary text-center font-semibold">
              Uso dos dados
            </h1>
            <p className="text-sm text-primary text-justify leading-relaxed">
              Os dados coletados serão utilizados para fins educacionais,
              incluindo controle de notas, frequência, e outros dados
              acadêmicos. Os dados também poderão ser utilizados para fins de
              marketing, desde que o usuário consinta expressamente.
            </p>
          </div>
          <div className="bg-gray-200 bg-opacity-10 border border-b-2 border-gray-400 space-y-6 w-1/3 h-40 rounded-md max-md:w-96">
            <h1 className="text-lg text-primary text-center font-semibold">
              Armazenamento dos dados
            </h1>
            <p className="text-sm text-primary text-justify leading-relaxed">
              Os dados coletados serão armazenados em servidores seguros,
              localizados no Brasil. Os usuários podem solicitar a exclusão de
              seus dados a qualquer momento, entrando em contato com o
              responsável pela aplicação.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
