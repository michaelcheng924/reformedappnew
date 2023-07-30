import { StyleSheet, ScrollView, View } from "react-native";
import { Text } from "@rneui/themed";
import { useState } from "react";
import BackToList from "./BackToList";
import DocumentTitle from "./DocumentTitle";
import NavigationSlider from "./NavigationSlider";
import ConfessionChapter from "./ConfessionChapter";
import AllChapters from "./AllChapters";
import ReadCatechism from "./ReadCatechism";

export default function Catechism({ catechism, setSelectedCatechism }) {
  const [chapter, setChapter] = useState(0);
  const [showChapters, setShowChapters] = useState(false);

  const chapterContent = catechism.content[chapter];

  return (
    <ScrollView style={styles.root}>
      <BackToList setSelected={setSelectedCatechism} text="Catechisms List" />
      <DocumentTitle title={catechism.title} />
      <View style={styles.bodyContainer}>
        <AllChapters setShowChapters={setShowChapters} text="All Chapters" />
        <NavigationSlider
          chapter={chapter}
          setChapter={setChapter}
          numChapters={catechism.content.length}
        />
        <View style={styles.chapterContainer}>
          <Text
            h3
            h3Style={{
              textAlign: "center",
            }}
          >
            {chapterContent.chapter === "Preface" ? "" : `Chapter `}
            {chapterContent.chapter}. {chapterContent.title}
          </Text>
        </View>
        <ReadCatechism catechism={catechism} />
        <NavigationSlider
          chapter={chapter}
          setChapter={setChapter}
          numChapters={catechism.content.length}
        />
      </View>
    </ScrollView>
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
  chapterContainer: {
    display: "flex",
    minHeight: 106,
    justifyContent: "center",
  },
});
