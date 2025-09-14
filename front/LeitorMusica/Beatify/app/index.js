import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>🎵 Bem-vindo ao Beatify! 🎵🎵🎵</Text>
      <Link href="/player" asChild>
        <Button title="Ir para Player" />
      </Link>
    </View>
  );
}
