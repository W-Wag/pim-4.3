import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 space-y-6 py-6">
      <Text className="text-white font-bold text-2xl">
        Bem-vindo ao sistema, aluno
      </Text>
      <View className="flex flex-col items-center justify-center space-y-4">
        <Link href="/school-report" asChild>
          <TouchableOpacity className=" flex items-center justify-center bg-white w-64 h-32">
            <Text className="text-center font-semibold text-xl">
              Ver Boletim
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/attendance-list" asChild>
          <TouchableOpacity className=" flex items-center justify-center bg-white w-64 h-32">
            <Text className="text-center font-semibold text-xl">
              Ver Presença
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/school-records" asChild>
          <TouchableOpacity className=" flex items-center justify-center bg-white w-64 h-32">
            <Text className="text-center font-semibold text-xl">
              Ver Histórico escolar
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
