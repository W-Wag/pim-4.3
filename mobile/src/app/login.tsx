import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";

export default function Login() {
  const [ra, setRa] = useState("");
  return (
    <View className="flex-1 items-center space-y-6">
      <Text className="text-white text-xl leading-relaxed font-semibold py-2">
        Digite seu RA para entrar no sistema
      </Text>
      <TextInput
        value={ra}
        onChangeText={(value) => setRa(value)}
        textAlignVertical="top"
        className="p-0 py-2 w-64 rounded-sm text-lg text-black bg-white placeholder:text-center"
        placeholderTextColor="#56565a"
        placeholder="Digite seu RA aqui"
      />

      <TouchableOpacity className="flex items-center justify-center rounded-md bg-white w-24 h-12">
        <Text className="text-black font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
