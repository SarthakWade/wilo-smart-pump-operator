import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

export default function ScanQR() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>QR Scanning coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.wiloGreen,
  },
});
