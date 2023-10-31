import { StatusBar } from "expo-status-bar";
import { Home } from "./src/screens/Home";
import { Header } from "./src/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <Header />
      <Home />
      <StatusBar style={"light"} />
    </SafeAreaView>
  );
}
