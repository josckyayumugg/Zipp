import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { supabase } from "./supabase";
import { getAllScheduledNotificationsAsync } from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
const dailyId = "dailyWhatsNew";
export async function scheduleNotificationHandler() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }

    await Notifications.cancelScheduledNotificationAsync(dailyId);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "What's new",
        sound: "default",
        body: "Check new Products,Deals,Requests and Responses from buyers and sellers today",
        data: { userName: "KSmartingAuto" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 10,
        minute: 0,
        channelId: "default",
      },
      identifier: dailyId,
    });
  } catch (e) {
    throw e;
  }
}

async function sendPushNotification(message) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function sendNewProductsNotifications(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "What's new",
    body: "Check new Products,Deals,Requests and Responses in the system today",
    data: { someData: "product data" },
  };
  await sendPushNotification(message);
}

async function sendNewRequestsNotifications(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "New Requests",
    body: "New Requests body",
    data: { someData: "goes here" },
  };
  await sendPushNotification(message);
}
async function sendNewResponsesNotifications(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "New Responses",
    title: "New Responses",
    body: "Responses body",
    data: { someData: "data Responses" },
  };
  await sendPushNotification(message);
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",

      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return;
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) {
    return;
  }
  try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    return pushTokenString;
  } catch (e) {
    handleRegistrationError(`${e}`);
  }
}

export async function registerAndSaveToken(userId) {
  const pushToken = await registerForPushNotificationsAsync();

  if (!pushToken) {
    return;
  }

  const { error } = await supabase
    .from("Profiles")
    .update({ pushToken })
    .eq("profileId", userId);

  if (error) {
  } else {
  }
}


