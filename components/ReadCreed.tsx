import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import AppText from "./AppText";

let scrollView;

export default function ReadCreed({ creed }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        ref={(node) => (scrollView = node)}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {creed.content.map((paragraph, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 25,
                marginTop: 20,
              }}
            >
              {paragraph.paragraph.map((item, index1) => {
                return (
                  <View
                    key={index1}
                    style={{
                      marginLeft:
                        item.styles && item.styles.indexOf("indent") !== -1
                          ? 25
                          : 0,
                    }}
                  >
                    <AppText>{item.text}</AppText>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (scrollView) {
            scrollView.scrollTo({ x: 0, y: 0 });
          }
        }}
      >
        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            backgroundColor: "#fff",
            display: `flex`,
          }}
        >
          <Entypo name="chevron-up" size={30} color="#489D89" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  change: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#489D89",
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
