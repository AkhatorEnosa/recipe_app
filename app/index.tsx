import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the app</Text>
      <Link href={"/about"} style={{
        color: "blue",
        fontSize: 20,
      }}>Go to About screen</Link>
    </View>
  );
}
