import Home from "./home";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Login from "./login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("cpf").then((cpf) => {
      if (!cpf) {
        return;
      }
      setIsLoggedIn(true);
    });
    AsyncStorage.getItem("ra").then((ra) => {
      if (!ra) return;
      setIsLoggedIn(true);
    });
  }, []);

  return (
    <View className="flex-1 w-full items-center justify-center">
      <StatusBar style={"light"} translucent />
      {!isLoggedIn ? (
        <>
          <Header title="Login" />
          <Login />
        </>
      ) : (
        <>
          <Header title="Área do Aluno" />
          <Home />
        </>
      )}
    </View>
  );
}
