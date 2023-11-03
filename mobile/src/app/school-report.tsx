import { ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function SchoolReport() {
  const [mf, setMf] = useState(0);
  useEffect(() => setMf(5), []);
  return (
    <ScrollView className="flex-1 space-y-4 bg-zinc-800">
      <Header title="Boletim Escolar" />
      <View className="flex w-full h-60 bg-gray-300 space-y-4 rounded-lg shadow-sm">
        <Text className="text-black leading-relaxed font-semibold text-center">
          Semestre: 4
        </Text>
        <Text className="text-black leading-relaxed font-semibold text-center">
          Disciplina: Redes de Computadores
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
        <View className="flex flex-row space-x-8 border-b pr-12">
          <Text className="text-black py-4 px-4 leading-relaxed font-semibold">
            5
          </Text>
          <Text className="text-black py-4 px-2 leading-relaxed font-semibold">
            5
          </Text>
          <Text className="text-black py-4 px-4 leading-relaxed font-semibold">
            5
          </Text>
          {mf <= 4.6 ? (
            <Text className="text-red-700 py-4 px-4 left-20 leading-relaxed font-bold">
              {mf}
            </Text>
          ) : (
            <Text className="text-green-700 py-4 px-4 left-20 leading-relaxed font-bold">
              {mf}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
