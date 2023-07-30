import { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

import { SettingsContext } from "../App";
import { Button } from "@rneui/themed";

export default function ChaptersModal({
  setShowChapters,
  showChapters,
  chaptersContent,
}) {
  const { theme } = useContext(SettingsContext);

  return (
    <Modal
      isVisible={showChapters}
      onBackdropPress={() => {
        setShowChapters(null);
      }}
    >
      <ScrollView
        style={{
          ...styles.scripturesModal,
          backgroundColor: theme === "Dark" ? "#000" : "#fff",
        }}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          onPress={() => {
            setShowChapters(null);
          }}
        >
          <Entypo
            color="#489D89"
            name="cross"
            size={30}
            style={{
              textAlign: "right",
            }}
          />
        </TouchableOpacity>
        <View>
          {chaptersContent.map((item, index) => {
            return (
              <Button key={index}>
                {item.chapter === "Preface" ? "" : `Chapter `}
                {item.chapter}. {item.title}
              </Button>
            );
          })}
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scripturesModal: {
    flex: 1,
    maxHeight: "80%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    position: `relative`,
  },
  contentContainer: {
    paddingBottom: 30,
  },
});
