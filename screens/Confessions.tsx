import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import confessions from "../constants/confessions";
import { useState } from "react";
import Confession from "../components/Confession";

export default function Confessions({ navigation }) {
  const [selectedConfession, setSelectedConfession] = useState(null);

  if (selectedConfession) {
    return (
      <Confession
        confession={confessions.find(
          (item) => item.title === selectedConfession
        )}
        setSelectedConfession={setSelectedConfession}
      />
    );
  }

  return (
    <View style={styles.container}>
      {confessions.map((item, index) => {
        return (
          <Button
            key={index}
            type="outline"
            style={styles.button}
            onPress={() => {
              setSelectedConfession(item.title);
            }}
          >
            {item.title}
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
