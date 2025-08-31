import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

export default function Login() {
  const router = useRouter();
  const [pumpId, setPumpId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // For now just log credentials (replace with API call later)
    console.log("Pump ID:", pumpId);
    console.log("Password:", password);
    router.push("/dashboard"); // Placeholder navigation
  };

  const handleQRRedirect = () => {
    router.push("/scan-qr");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/wilo.svg")}
        style={styles.logo}
        contentFit="contain"
      />

      <Text style={styles.title}>Smart Pump Operator</Text>

      <TextInput
        placeholder="Pump ID"
        value={pumpId}
        onChangeText={setPumpId}
        style={Platform.OS === "web" ? styles.webinput : styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={Platform.OS === "web" ? styles.webinput : styles.input}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={Platform.OS === "web" ? styles.webButton : styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Show QR scan redirect button only on native platforms */}
      {Platform.OS !== "web" && (
        <TouchableOpacity style={styles.qrButton} onPress={handleQRRedirect}>
          <Text style={styles.qrText}>Or Scan QR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.wiloGreen,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: Colors.wiloGreen,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  webinput: {
    width: "50%",
    height: 50,
    borderColor: Colors.wiloGreen,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.wiloGreen,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  webButton: {
    backgroundColor: Colors.wiloGreen,
    width: "50%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrButton: {
    marginTop: 10,
  },
  qrText: {
    color: Colors.wiloGreen,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
