import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeButtons from "./components/HomeButtons";
import Confessions from "./screens/Confessions";
import { createContext, useState } from "react";
import Catechisms from "./screens/Catechisms";
import Creeds from "./screens/Creeds";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <HomeButtons navigation={navigation} />
    </View>
  );
}

function CatechismsScreen({ navigation }) {
  return (
    <View>
      <Catechisms navigation={navigation} />
    </View>
  );
}

function ConfessionsScreen({ navigation }) {
  return (
    <View>
      <Confessions navigation={navigation} />
    </View>
  );
}

function CreedsScreen({ navigation }) {
  return (
    <View>
      <Creeds navigation={navigation} />
    </View>
  );
}

const SettingsContext = createContext({
  theme: "light",
  size: 16,
  font: "serif",
  setTheme: (_) => {},
  setSize: (_) => {},
  setFont: (_) => {},
});

export default function App() {
  const [theme, setTheme] = useState("light");
  const [size, setSize] = useState(16);
  const [font, setFont] = useState("serif");

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SettingsContext.Provider
          value={{
            theme,
            setTheme,
            size,
            setSize,
            font,
            setFont,
          }}
        >
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="CatechismsScreen"
              component={CatechismsScreen}
              options={{ title: "Catechisms" }}
            />
            <Stack.Screen
              name="ConfessionsScreen"
              component={ConfessionsScreen}
              options={{ title: "Confessions" }}
            />
            <Stack.Screen
              name="CreedsScreen"
              component={CreedsScreen}
              options={{ title: "Creeds" }}
            />
          </Stack.Navigator>
        </SettingsContext.Provider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export { SettingsContext };
