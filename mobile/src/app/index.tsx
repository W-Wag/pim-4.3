import { StatusBar } from "expo-status-bar";
import Home from "./home";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Login from "./login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <SafeAreaView className="flex-1 items-center pt-[-36px] justify-center bg-zinc-800">
      <StatusBar style={"dark"} translucent />
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
    </SafeAreaView>
  );
}
