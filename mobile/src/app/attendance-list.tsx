import { ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function AttendanceList() {
  const [mf, setMf] = useState(0);
  useEffect(() => setMf(5), []);
  return (
    <ScrollView className="flex-1 space-y-4 bg-zinc-800">
      <Header title="Lista de Presença" />
      <View className="flex-1 flex-row w-full selection:bg-gray-300 rounded-lg shadow-sm">
        <View className="bg-gray-100 px-4 w-52 space-y-4 border-r">
          <Text className="text-xl font-bold">Disciplinas</Text>
          <Text className="font-semibold leading-relaxed">
            Redes de computadores
          </Text>
          <Text className="font-semibold leading-relaxed">Banco de Dados</Text>
          <Text className="font-semibold leading-relaxed">Linguagem C</Text>
          <Text className="font-semibold leading-relaxed">
            Gerenciamento de Projetos
          </Text>
          <Text className="font-semibold leading-relaxed">Excel</Text>
          <Text className="font-semibold leading-relaxed">Power Point</Text>
        </View>
        <View className="bg-white w-full space-y-4 border-l pb-4">
          <Text className="text-xl font-bold px-8">Faltas</Text>
          <Text className="px-12">0</Text>
          <Text className="px-12">0</Text>
          <Text className="px-12">0</Text>
          <Text className="px-12">0</Text>
          <Text className="px-12">0</Text>
          <Text className="px-12">0</Text>
        </View>
      </View>
    </ScrollView>
  );
}
