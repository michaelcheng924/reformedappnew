import { Button } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function HomeButtons({ navigation }) {
  return (
    <View>
      <Button radius={"sm"} type="solid" size="lg" style={styles.homeButton}>
        Catechisms
      </Button>
      <Button
        radius={"sm"}
        type="solid"
        size="lg"
        style={styles.homeButton}
        onPress={() => navigation.navigate("ConfessionsScreen")}
      >
        Confessions
      </Button>
      <Button radius={"sm"} type="solid" size="lg" style={styles.homeButton}>
        Creeds
      </Button>
      <Button radius={"sm"} type="solid" size="lg" style={styles.homeButton}>
        About / Support
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    marginBottom: 20,
  },
});
