import { StatusBar } from "expo-status-bar";
import Home from "./home";
import Header from "./Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center pt-[-36px] justify-center bg-black">
      <Header />
      <Home />
      <StatusBar style={"light"} translucent />
    </SafeAreaView>
  );
}
