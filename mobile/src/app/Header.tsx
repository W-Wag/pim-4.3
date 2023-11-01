import { Text, View } from "react-native";

export default function Header() {
  return (
    <View className=" flex items-center justify-center bg-blue-950 w-full h-32">
      <Text className="text-white font-bold text-center text-xl">
        Área do Aluno
      </Text>
    </View>
  );
}
