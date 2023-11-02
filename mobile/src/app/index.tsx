import { StatusBar } from "expo-status-bar";
import Home from "./home";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center pt-[-36px] justify-center bg-zinc-800">
      <StatusBar style={"dark"} translucent />
      <Header title="Área do Aluno" />
      <Home />
    </SafeAreaView>
  );
}
