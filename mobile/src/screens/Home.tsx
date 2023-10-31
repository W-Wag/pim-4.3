import { Text, View } from "react-native";
import { Header } from "../components/Header";

export function Home() {
  return (
    <View className="flex-1 space-y-4">
      <Text className="text-white font-bold text-2xl">
        Bem-vindo ao sistema, aluno
      </Text>
      <View className="flex flex-col items-center justify-center">
        <View className=" flex items-center justify-center bg-white w-64 h-44">
          <Text className="text-center">Ver Boletim</Text>
        </View>
      </View>
    </View>
  );
}
