import { ScrollView, Text, View } from "react-native";
import Header from "../components/Header";

export default function SchoolReport() {
  return (
    <ScrollView className="flex-1 space-y-4 bg-zinc-800">
      <Header title="Boletim Escolar" />
      <View className="flex w-full h-[340px] bg-gray-300 space-x-2 rounded-sm shadow-sm">
        <Text className="text-black py-4 px-2 leading-relaxed font-semibold">
          Semestre: 4
        </Text>
        <Text className="text-black py-4 leading-relaxed font-semibold">
          Disciplina: Redes de Computadores
        </Text>

        <View className="flex flex-col space-y-8 w-80 border">
          <View className="flex flex-row border-b h-8">
            <Text className="text-black px-4 leading-relaxed font-semibold">
              NP1:
            </Text>
            <Text className="text-black leading-relaxed font-semibold left-[173px]">
              5
            </Text>
          </View>
          <View className="flex flex-row border-y h-8">
            <Text className="text-black px-4 leading-relaxed font-semibold">
              NP2:
            </Text>
            <Text className="text-black leading-relaxed font-semibold left-[173px]">
              5
            </Text>
          </View>
          <View className="flex flex-row border-y h-8">
            <Text className="text-black px-4 leading-relaxed font-semibold">
              Trabalho:
            </Text>
            <Text className="text-black leading-relaxed font-semibold left-36">
              5
            </Text>
          </View>
          <View className="flex flex-row border-t h-8">
            <Text className="text-black px-4 leading-relaxed font-semibold">
              Média Final:
            </Text>
            <Text className="text-black leading-relaxed font-semibold left-32">
              5
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
