import { Icon, Text } from "@rneui/themed";
import { blue } from "../constants/colors";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function BackToList({ setSelected, text }) {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(null);
      }}
      style={styles.container}
    >
      <Icon name="chevron-left" color={blue} size={40} />
      <Text
        h4
        h4Style={{
          color: blue,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});
