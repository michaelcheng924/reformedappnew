import { StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import BackToList from "./BackToList";
import DocumentTitle from "./DocumentTitle";
import ReadCatechism from "./ReadCatechism";

export default function Catechism({ catechism, setSelectedCatechism }) {
  const [chapter, setChapter] = useState(0);
  const [showChapters, setShowChapters] = useState(false);

  const chapterContent = catechism.content[chapter];

  return (
    // <ScrollView style={styles.root}>
    <>
      <BackToList setSelected={setSelectedCatechism} text="Catechisms List" />
      <DocumentTitle title={catechism.title} />
      <View style={styles.bodyContainer}>
        <ReadCatechism catechism={catechism} />
      </View>
    </>
    // </ScrollView>
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
