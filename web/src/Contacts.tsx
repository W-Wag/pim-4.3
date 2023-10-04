import { Phone } from 'lucide-react';

export function Contacts() {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-primary font-bold text-2xl py-4">
        Entre em contato conosco
      </h1>

      <div className="flex items-center justify-between py-4">
        <div className="w-1/3 h-64 bg-primary mx-12 py-2 rounded-sm">
          <h1 className="text-primary-foreground font-bold text-2xl py-4">
            Atendimento
          </h1>
          <div className="flex items-center justify-center">
            <Phone color="blue" width={40} height={40} />
            <p className="text-primary-foreground text-3xl leading-relaxed font-medium px-2 antialiased">
              0800800800800
            </p>
          </div>
          <p className="text-primary-foreground text-sm italic leading-relaxed font-bold py-6">
            Horário de atendimento de 09:00 às 21:00
          </p>
        </div>
        <div className="w-1/3 h-64 bg-primary mx-12 py-2 rounded-sm">
          <div className="flex items-center justify-center">
            <h1 className="text-primary-foreground font-bold text-2xl py-4 px-2">
              Atendimento
            </h1>
            <br />
            <img
              src="../src/assets/whatsapp.svg"
              alt=""
              height={40}
              width={40}
            />
            <h1 className="text-primary-foreground font-bold text-2xl py-4">
              Whatsapp
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Phone color="blue" width={40} height={40} />
            <p className="text-primary-foreground text-3xl leading-relaxed font-medium px-2 antialiased">
              0800800800800
            </p>
          </div>
          <p className="text-primary-foreground text-sm italic leading-relaxed font-bold py-6">
            Horário de atendimento de 09:00 às 21:00
          </p>
        </div>
      </div>
    </div>
  );
}
