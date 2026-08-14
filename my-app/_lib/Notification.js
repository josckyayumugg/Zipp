// _lib/notifications.js
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { supabase } from "./supabase";

export async function registerForPushNotifications(userId) {
  if (!Device.isDevice) {
    console.log("Not a physical device, skipping push registration");
    return;
  }
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    console.log("Permission status:", finalStatus);

    if (finalStatus !== "granted") {
      console.log("Permission not granted, stopping");

      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log("Got push token:", tokenData.data);
    const pushToken = tokenData.data;

    await supabase
      .from("Profiles")
      .update({ pushToken })
      .eq("profileId", userId);
  } catch (error) {
    console.error("Error registering for  push notifications", err);
  }
}
