import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

interface AppHeaderProps {
  title: string;
  navigation: any;
  onSync?: () => void;
  isBack?: boolean;
}

const AppHeader = ({ title, navigation, onSync, isBack }: AppHeaderProps) => {
  const handleLogout = async () => {
    await auth().signOut();
    navigation.replace("Auth");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {isBack && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backText}>{"< "}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightContainer}>
          {onSync && (
            <TouchableOpacity onPress={onSync} style={styles.syncButton}>
              <Text style={styles.syncText}>Sync</Text>
            </TouchableOpacity>
          )}
          {!isBack && (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#2563EB",
  },
  container: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  syncButton: {
    marginRight: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
  },
  syncText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});