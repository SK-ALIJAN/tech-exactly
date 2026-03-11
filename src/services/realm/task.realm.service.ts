import { getRealm } from "./realm.service";
import uuid from "react-native-uuid";
import auth from "@react-native-firebase/auth";

export const createTaskOffline = async (title: string, description?: string) => {
  const realm = await getRealm();
  const user = auth().currentUser;

  realm.write(() => {
    realm.create("Task", {
      id: uuid.v4(),
      userId: user?.uid || "",
      title,
      description,
      status: "pending",
      synced: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
};

export const getTasksOffline = async () => {
  const realm = await getRealm();
  return realm.objects("Task");
};