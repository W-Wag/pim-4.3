import { ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../libs/api";
import { Loading } from "../components/Loading";

interface Notas {
  presenca: number;
  disciplina: string;
  id: number;
}

export default function AttendanceList() {
  const [notas, setNotas] = useState<Notas[]>([]);
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
        response = await api.get(`/notas/presenca/${cpf}/ra`);
      } else {
        response = await api.get(`/notas/presenca/cpf/${ra}`);
      }
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
      {isLoading ? <Loading /> : <></>}
      <Header title="Lista de Presença" />
      <View className="flex-1 flex-row w-full selection:bg-gray-300 rounded-lg shadow-sm">
        <View className="bg-gray-100 px-4 w-52 space-y-4 border-r">
          <Text className="text-xl font-bold">Disciplinas</Text>
          {notas.map((nota) => {
            return (
              <Text key={nota.id} className="font-semibold leading-relaxed">
                {nota.disciplina}
              </Text>
            );
          })}
        </View>

        <View className="bg-white w-full space-y-4 border-l pb-4">
          <Text className="text-xl font-bold px-8">Faltas</Text>
          {notas.map((nota) => {
            return (
              <Text key={nota.id} className="px-12">
                {nota.presenca}
              </Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
