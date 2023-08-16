import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import catechisms from "../constants/catechisms";
import confessions from "../constants/confessions";

export default function DocumentsList({ navigation }) {
  function renderButton(document, index) {
    return (
      <Button
        key={index}
        type="outline"
        style={styles.button}
        onPress={() => {
          navigation.navigate(document.title);
        }}
      >
        {document.title}
      </Button>
    );
  }

  return (
    <View>
      <Text
        h3
        h3Style={{
          marginBottom: 15,
        }}
      >
        Catechisms
      </Text>
      {catechisms.map((item, index) => {
        return renderButton(item, index);
      })}
      <Text
        h3
        h3Style={{
          marginBottom: 15,
        }}
      >
        Confessions
      </Text>
      {confessions.map((item, index) => {
        return renderButton(item, index);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
