import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function Grades() {
  const [inputsEnabled, setInputsEnabled] = useState(false);
  const handleButtonClick = () => {
    setInputsEnabled(!inputsEnabled);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Gerencie a nota de seus alunos
      </h1>

      <div className="flex flex-wrap items-center justify-center">
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
        <div className="w-96 h-96 p-2 mx-2 my-12 border border-spacing-2 border-zinc-800">
          <h1 className="font-bold text-xl text-center py-2">
            Disciplina: Teatro
          </h1>
          <div className="h-full">
            <h2 className="font-bold text-lg text-center py-2">Aluno: Jonas</h2>
            <Label>
              NP1
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              NP2
              <Input disabled={!inputsEnabled} type="number" />
            </Label>
            <Label>
              Trabalho
              <Input disabled={!inputsEnabled} type="number" />
            </Label>

            <Button className="my-4 mx-32" onClick={handleButtonClick}>
              Alterar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
