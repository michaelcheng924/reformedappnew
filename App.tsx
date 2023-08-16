import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DocumentsList from "./components/DocumentsList";
import { useState } from "react";
import { SettingsContext } from "./contexts/SettingsContext";
import confessions from "./constants/confessions";
import Confession from "./components/Confession";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DocumentsList navigation={navigation} />
    </View>
  );
}

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
            {confessions.map((item, index) => {
              return (
                <Stack.Screen key={index} name={item.title}>
                  {() => <Confession confession={item} />}
                </Stack.Screen>
              );
            })}
          </Stack.Navigator>
        </SettingsContext.Provider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export { SettingsContext };
