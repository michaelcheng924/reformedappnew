import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { blue } from "../constants/colors";

export default function DocumentTitle({ title }) {
  return (
    <View style={styles.titleContainer}>
      <Text h3 style={styles.titleText}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: blue,
    paddingLeft: 15,
    paddingReft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleText: {
    color: "#fff",
  },
});
