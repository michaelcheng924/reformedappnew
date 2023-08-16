import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import confessions from "../constants/confessions";

export default function DocumentsList({ navigation }) {
  return (
    <View>
      <Text
        h3
        h3Style={{
          marginBottom: 15,
        }}
      >
        Confessions
      </Text>
      {confessions.map((item, index) => {
        return (
          <Button
            key={index}
            type="outline"
            style={styles.button}
            onPress={() => {
              navigation.navigate(item.title);
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
  button: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
