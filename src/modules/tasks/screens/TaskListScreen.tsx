import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import AppHeader from "../../../components/common/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { getTasksOffline } from "../../../services/realm/task.realm.service";
import { syncTasks, startRealtimeSync } from "../../../services/sync/sync.service";
import Toast from "react-native-toast-message";

const TaskListScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchTasks = async () => {
    try {
      const offlineTasks = await getTasksOffline();
      setTasks(Array.from(offlineTasks));
      
      // Setup Realm listener so UI updates instantly when background sync changes data
      offlineTasks.addListener(() => {
          setTasks(Array.from(offlineTasks));
      });
      
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to load tasks" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Start firebase realtime sync
    let unsubscribeFirebase: any;
    const setupSync = async () => {
        unsubscribeFirebase = await startRealtimeSync();
    };
    setupSync();
    
    return () => {
        if(unsubscribeFirebase) {
            unsubscribeFirebase();
        }
    }
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncTasks(); // Manual sync still works to force push offline changes
    } finally {
      setSyncing(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <AppHeader title="My Tasks" navigation={navigation} onSync={handleSync} />
      <View style={styles.container}>
        <Text style={styles.title}>My Tasks</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>No tasks added yet. Add one to get started!</Text>}
            renderItem={({ item }) => (
              <View style={styles.task}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <Text style={styles.taskStatus}>{item.synced ? "Synced" : "Local"}</Text>
                </View>
              </View>
            )}
          />
        )}

        {syncing && <ActivityIndicator size="small" color="#2563EB" style={{ marginVertical: 10 }} />}

        <View style={styles.buttonContainer}>
          <Button title="Add Task" onPress={() => navigation.navigate("AddTask")} color="#2563EB" />
        </View>
      </View>
    </SafeAreaView>

  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  task: {
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  taskStatus: {
    fontSize: 12,
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});