import { StatusBar } from "expo-status-bar";
import { splash } from "../../assets/splash.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("cpf").then((cpf) => {
      if (!cpf) return;
      setIsLoggedIn(true);
    });
  }, []);

  return (
    <ImageBackground
      source={splash}
      className="relative flex-1 bg-gray-950"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="school-records" />
        <Stack.Screen name="school-report" />
        <Stack.Screen name="attendance-list" />
      </Stack>
    </ImageBackground>
  );
}
