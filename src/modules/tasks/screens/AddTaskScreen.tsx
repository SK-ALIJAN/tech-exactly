import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/common/AppHeader";
import { createTaskOffline } from "../../../services/realm/task.realm.service";
import Toast from "react-native-toast-message";

const AddTaskScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Toast.show({ type: "error", text1: "Please enter a task title" });
      return;
    }
    setLoading(true);
    try {
      await createTaskOffline(title.trim(), description.trim());
      Toast.show({ type: "success", text1: "Task saved successfully" });
      navigation.goBack();
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to save task" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Add New Task" navigation={navigation} isBack={true} />
      
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            placeholder="What do you need to do?"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            editable={!loading}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            placeholder="Add some details..."
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            editable={!loading}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Task</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#f9f9f9" 
  },
  container: { 
    flex: 1, 
    padding: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#1f2937",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    minHeight: 120,
  },
  buttonContainer: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});