import { StyleSheet, View } from "react-native";
import ReadCatechism from "../ReadCatechism";

export default function Catechism({ catechism }) {
  return (
    <>
      <View style={styles.bodyContainer}>
        <ReadCatechism catechism={catechism} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
  backContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  backIconContainer: {
    width: 40,
  },
  bodyContainer: {
    flex: 1,
  },
});
