import { Text, View } from "react-native";

export default function Header({ title = "" }) {
  return (
    <View className=" flex items-center justify-center bg-blue-950 w-full h-32">
      <Text className="text-white font-bold text-center text-xl">{title}</Text>
    </View>
  );
}
