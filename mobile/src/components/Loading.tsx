import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function Loading() {
  return (
    <View className="flex w-full h-screen justify-center items-center z-50">
      <Text className="text-white text-2xl font-bold">Carregando</Text>
      <MaterialIcons name="cached" size={32} color={"white"} />
    </View>
  );
}
