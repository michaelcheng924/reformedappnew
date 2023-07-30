import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import catechisms from "../constants/catechisms";
import { useState } from "react";
import Creed from "../components/Creed";

export default function Creeds({ navigation }) {
  const [selectedCatechism, setSelectedCatechism] = useState(null);

  if (selectedCatechism) {
    return (
      <Catechism
        catechism={catechisms.find((item) => item.title === selectedCatechism)}
        setSelectedCatechism={setSelectedCatechism}
      />
    );
  }

  return (
    <View style={styles.container}>
      {catechisms.map((item, index) => {
        return (
          <Button
            key={index}
            type="outline"
            style={styles.button}
            onPress={() => {
              setSelectedCatechism(item.title);
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
