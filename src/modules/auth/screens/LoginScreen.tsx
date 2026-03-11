import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleIcon } from "../../../assets/iconsComponents";
import useGoogle from "../../../hooks/useGoogle";
import { ShortBottomToaster } from "../../../adapter/toast/toastAdapter";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onGoogleButtonPress, loading } = useGoogle();

  const handleLogin = async () => {
    if (!email || !password) {
      ShortBottomToaster("Please enter email and password");
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);

      ShortBottomToaster("Login successful");
    } catch (error: any) {
      ShortBottomToaster(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await onGoogleButtonPress();

      if (result) {
        ShortBottomToaster("Google login successful");
      }
    } catch (error) {
      ShortBottomToaster("Google login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Email Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>OR</Text>

      {/* Google Login */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <GoogleIcon width={22} height={22} />
        <Text style={styles.googleText}>
          {loading ? "Signing in..." : "Continue with Google"}
        </Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        Create Account
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },

  title: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },

  loginButton: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  or: {
    textAlign: "center",
    marginVertical: 18,
    color: "#999",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },

  googleText: {
    fontSize: 15,
    fontWeight: "500",
  },

  link: {
    marginTop: 25,
    textAlign: "center",
    color: "#3B82F6",
  },
});