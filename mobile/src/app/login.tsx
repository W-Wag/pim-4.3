import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../libs/api";

export default function Login() {
  const [cpf, setCpf] = useState("");

  async function handleSubmit() {
    try {
      const response = await api.get(`/aluno/${cpf}`);

      if (response.status === 200) {
        console.log("Sucesso");
        AsyncStorage.setItem("cpf", cpf);
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        "CPF não encontrado, tente novamente",
        ToastAndroid.SHORT
      );
      return;
    }
  }
  return (
    <View className="flex-1 items-center space-y-6">
      <Text className="text-white text-xl leading-relaxed font-semibold py-2">
        Digite seu CPF para entrar no sistema
      </Text>
      <TextInput
        value={cpf}
        onChangeText={(value) => setCpf(value)}
        textAlignVertical="top"
        className="p-0 py-2 w-64 rounded-sm text-lg text-black bg-white placeholder:text-center"
        placeholderTextColor="#56565a"
        placeholder="Digite seu CPF aqui"
      />

      <TouchableOpacity
        className="flex items-center justify-center rounded-md bg-white w-24 h-12"
        onPress={handleSubmit}
      >
        <Text className="text-black font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
