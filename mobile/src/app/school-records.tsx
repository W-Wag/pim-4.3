import { ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../libs/api";
import { Loading } from "../components/Loading";

interface Notas {
  nota: {
    np1: number;
    np2: number;
    pim: number;
    mf: number;
  };
  disciplina: string;
  Semestre: string;
}

export default function SchoolRecords() {
  const [notas, setNotas] = useState<Notas[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setIsLoading(true);
      const response = await api.get("/notas/historico/111.111.111-11");
      setNotas(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return;
    }
  }

  return (
    <ScrollView className="flex-1 space-y-4 bg-zinc-800">
      <Header title="Histórico Escolar" />
      <Text className="text-black text-sm font-semibold leading-relaxed bg-slate-200">
        Aqui você poderá visualizar as notas das disciplinas de todos os
        semestres cursado
      </Text>
      {isLoading ? <Loading /> : <></>}
      {notas.map((historico) => {
        return (
          <View className="flex w-full h-52 bg-gray-300 space-y-4 rounded-lg shadow-sm">
            <Text className="text-black leading-relaxed font-semibold text-center">
              Semestre: {historico.Semestre}
            </Text>
            <Text className="text-black leading-relaxed font-semibold text-center">
              Disciplina: {historico.disciplina}
            </Text>

            <View className="flex flex-row bg-blue-950 space-x-8 border-t">
              <Text className="text-white py-4 pl-2 leading-relaxed font-semibold">
                NP1
              </Text>
              <Text className="text-white py-4 leading-relaxed font-semibold">
                NP2
              </Text>
              <Text className="text-white py-4 leading-relaxed font-semibold">
                Trabalho
              </Text>
              <Text className="text-white py-4 left-12 leading-relaxed font-semibold">
                Média Final
              </Text>
            </View>

            <View className="flex flex-row space-x-8 pr-12">
              <Text className="text-black px-4 leading-relaxed font-semibold">
                {historico.nota.np1}
              </Text>
              <Text className="text-black px-2 leading-relaxed font-semibold">
                {historico.nota.np2}
              </Text>
              <Text className="text-black px-4 leading-relaxed font-semibold">
                {historico.nota.pim}
              </Text>
              {historico.nota.mf <= 5 ? (
                <Text className="text-red-700 px-4 left-20 leading-relaxed font-bold">
                  {historico.nota.mf}
                </Text>
              ) : (
                <Text className="text-green-700  px-4 left-20 leading-relaxed font-bold">
                  {historico.nota.mf}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
