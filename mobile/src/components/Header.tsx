import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function Header({ title = "" }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const loggedIn = await AsyncStorage.getItem("cpf");
    if (!loggedIn) setIsLoggedIn(false);
  }
  function logout() {
    AsyncStorage.clear();
    return router.replace("/");
  }
  return (
    <View className=" flex items-center justify-center bg-blue-950 w-full h-32">
      <Text className="text-white font-bold text-center text-xl">{title}</Text>
      {isLoggedIn ? (
        <TouchableOpacity className="left-36" onPress={logout}>
          <Text className="text-white font-bold text-sm">Logout</Text>
          <MaterialIcons name="logout" size={32} color={"white"} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}
