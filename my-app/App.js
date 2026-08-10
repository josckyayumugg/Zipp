import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Product from "./screens/Product";
import AddProduct from "./screens/AddProduct";
import EditAddress from "./screens/EditAddress";
import TermsAndConditions from "./screens/TermsAnd";
import PrivacyPolicy from "./screens/Privacy";
import ChangePassword from "./screens/ChangePassword";
import ConfigureProfile from "./screens/Configuration";
import DealContacts from "./screens/ContactsDeals";
import Toast from "react-native-toast-message";
import Request from "./screens/Request";
import SeeAllScreen from "./screens/SeeAllScreen";
import SettingsPage from "./screens/Settings";
import ReportScreen from "./screens/Report";
import ContactUs from "./screens/ContactUs";
import ContactsReply from "./screens/ContactsReplies";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useFonts } from "expo-font";

import {
  useNavigation,
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "./screens/Profile";
import ProfileSelling from "./Components/ProfileSelling";
import { GlobalStyles } from "./Constants";
import { Ionicons } from "@expo/vector-icons";
import ViewReplies from "./screens/Replies";
import RespondToRequest from "./screens/Replying";
import NotificationsPage from "./screens/Notifications";
import HelpCenterPage from "./screens/Help";
import EditProfile from "./screens/ProfileEditint";
import NotificationsSettings from "./screens/NotificationsSettings";
import Login from "./screens/Login";
import SignUp from "./screens/SignUpPage";
import ProductContacts from "./screens/ProductContacts";
import DealPage from "./screens/Deal";
import ProfileRows from "./Components/ProfileRows";
import DealsRow from "./Components/ProfileDeals";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const queryClient = new QueryClient();
function Tabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // 1. Keep the header visible globally
        headerShown: true,

        // 2. Style the background of the header bar
        headerStyle: {
          backgroundColor: GlobalStyles.Black || "black",
          borderBottomWidth: 1,
          borderBottomColor: "#222", // Subtle separator line under the header
        },

        // 3. Style the Title text directly (Color, Sizes, and your Custom Fonts)
        headerTitleStyle: {
          fontFamily: "Roboto-bold",
          fontSize: 22,
          color: "white",
        },

        // 4. Center the title text (true for iOS style, false for Android left-align)
        headerTitleAlign: "left",

        // 5. Add universal icons or buttons to the right side of EVERY header screen
        headerRight: () => (
          <View style={{ flexDirection: "row", paddingRight: 16 }}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="white"
              style={{ marginRight: 14 }}
              onPress={() => navigation.navigate("Notifications")}
            />

            <Ionicons
              name="settings-outline"
              size={22}
              color="white"
              onPress={() => navigation.navigate("Settings")}
            />
          </View>
        ),
        headerLeft: () => (
          <View style={{ flexDirection: "row", paddingRight: 16 }}></View>
        ),

        // 6. Style your Bottom Tab Nav Bar values so the whole theme matches
        tabBarActiveTintColor: GlobalStyles.Primary_Yellow,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "#222",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={AddProduct}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={color}
              style={[
                {
                  backgroundColor: GlobalStyles.Secondary_Yellow,
                  height: 30,
                  width: 30,
                  borderRadius: 999,
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={Request}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loaded, error] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-semibold": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-regular": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-extrabold": require("./assets/fonts/Roboto-ExtraBold.ttf"),
    "Roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />

          <Stack.Screen
            name="signUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Configuration"
            component={ConfigureProfile}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />

          <Stack.Screen
            name="SeeAllScreen"
            component={SeeAllScreen}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Replies"
            component={ViewReplies}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Respond"
            component={RespondToRequest}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Deal"
            component={DealPage}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="DealsContacts"
            component={DealContacts}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Product Contacts"
            component={ProductContacts}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="My Products"
            component={ProfileRows}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="My Deals"
            component={DealsRow}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          {/* <Stack.Screen
            name="My Responses"
            component={ProformaRows}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }} */}
          {/* /> */}
          {/* <Stack.Screen
            name="My Requests"
            component={RequestRows}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          /> */}
          <Stack.Screen
            name="Reply Contacts"
            component={ContactsReply}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsPage}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Help"
            component={HelpCenterPage}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="EditAddress"
            component={EditAddress}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="Privacy"
            component={PrivacyPolicy}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="NotificationsSettings"
            component={NotificationsSettings}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.Black,
              },
              headerTintColor: "#fff", // back button and title color
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast topOffset={60} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",

    minWidth: "100%",
    fontFamily: "Roboto",
  },

  mainTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 35,
    textAlign: "center",
  },
  PageHeaderTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 25,
    textAlign: "center",
  },
  Views: {
    marginVertical: 12,
  },
  icon: {
    marginHorizontal: 8,
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
  },
  smallMVertical: {
    marginVertical: 8,
  },
  largeMTop: {
    marginTop: 50,
  },
  smallMTop: {
    marginTop: 8,
  },
  label: {
    borderWidth: 2,
  },
  Roboto: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: 700,
  },
  graph: {
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 8,
  },
  whiteT: {
    color: "white",
  },
  greyT: {
    color: GlobalStyles.Primary_Grey,
  },
  greenT: {
    color: GlobalStyles.Primary_Green,
  },
  smallText: {
    fontSize: 10,
    fontFamily: "Roboto-Light",
  },
  whiteText: {
    color: GlobalStyles.Primary_Grey,
  },
  yellowBg: {
    backgroundColor: GlobalStyles.Primary_Yellow,
  },
  blackBg: {
    backgroundColor: GlobalStyles.Black,
  },
  cards: {
    alignSelf: "flex-end",
    flexDirection: "row",
    margin: 8,
    paddingRight: 4,

    width: "70%",
  },
  rowItem: {
    flexDirection: "column",
    width: "45%",
    paddingHorizontal: 4,
    alignItems: "flex-start",
    padding: 4,
  },
  revealImage: {
    height: 200,

    marginBottom: 16,
  },

  headerCard: {
    margin: 6,
    borderWidth: 1,

    backgroundColor: GlobalStyles.Primary_Grey,
  },
  rowView: {
    flexDirection: "row",
    width: "100%",
    gap: 2,
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  sectionImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },

  sectionText: {
    flex: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 18,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,

    marginBottom: 8,
  },

  bigText: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    lineHeight: 16,
  },
  button: {
    alignSelf: "start",
    paddingHorizontal: 8,
    marginVertical: 10,
    borderRadius: 4,
  },

  bordeR: {
    borderRadius: 6,
    overflow: "hidden",
  },
  paddingSm: {
    padding: 4,
  },
  paddingLg: {
    padding: 8,
  },
  button: {
    backgroundColor: GlobalStyles.Primary_Green,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
