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
import { ShortBottomToaster } from "../../../adapter/toast/toastAdapter";
import useGoogle from "../../../hooks/useGoogle";

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onGoogleButtonPress, loading } = useGoogle();

  const handleSignup = async () => {
    if (!email || !password) {
      ShortBottomToaster("Please enter email and password");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);

      ShortBottomToaster("Account created successfully");
    } catch (error: any) {
      ShortBottomToaster(error.message || "Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await onGoogleButtonPress();

      if (result) {
        ShortBottomToaster("Google signup successful");
      }
    } catch (error) {
      ShortBottomToaster("Google signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Email Signup */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>OR</Text>

      {/* Google Signup */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignup}
        disabled={loading}
      >
        <GoogleIcon width={22} height={22} />
        <Text style={styles.googleText}>
          {loading ? "Signing up..." : "Sign up with Google"}
        </Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

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

  signupButton: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  signupText: {
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