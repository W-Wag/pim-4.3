import { ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../libs/api";
import { get } from "lodash";
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
  id: number;
}

export default function SchoolReport() {
  const [notas, setNotas] = useState<Notas[]>([]);
  const [semestre, setSemestre] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const cpf = await AsyncStorage.getItem("cpf");
    const ra = await AsyncStorage.getItem("ra");

    try {
      setIsLoading(true);
      let response;

      if (!ra) {
        response = await api.get(`/notas/boletim/${cpf}/ra`);
      } else {
        response = await api.get(`/notas/boletim/cpf/${ra}`);
      }
      const semestre = get(response, "data[0].Semestre", 0);
      setSemestre(semestre);
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
      <Header title="Boletim Escolar" />
      {isLoading ? <Loading /> : <></>}
      <View className="flex-1 w-full bg-gray-300 space-y-4 rounded-lg shadow-sm">
        <Text className="text-black leading-relaxed font-semibold text-center">
          Semestre: {semestre}
        </Text>
        {notas.map((boletim) => {
          return (
            <View key={boletim.id} className="flex-1 w-full space-y-4">
              <Text className="text-white bg-blue-950 mb-[-16px] leading-relaxed font-semibold text-center">
                Disciplina: {boletim.disciplina}
              </Text>
              <View className="flex flex-row bg-blue-950 space-x-8">
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
              <View className="flex flex-row space-x-8 pr-12 pb-4">
                <Text className="text-black py-4 px-4 leading-relaxed font-semibold">
                  {boletim.nota.np1}
                </Text>
                <Text className="text-black py-4 px-2 leading-relaxed font-semibold">
                  {boletim.nota.np2}
                </Text>
                <Text className="text-black py-4 px-4 leading-relaxed font-semibold">
                  {boletim.nota.pim}
                </Text>
                {boletim.nota.mf <= 4.6 ? (
                  <Text className="text-red-700 py-4 left-20 leading-relaxed font-bold">
                    {boletim.nota.mf}
                  </Text>
                ) : (
                  <Text className="text-green-700 py-4 left-20 leading-relaxed font-bold">
                    {boletim.nota.mf}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
