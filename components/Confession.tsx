import { StyleSheet, ScrollView, View } from "react-native";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import DocumentTitle from "./DocumentTitle";
import NavigationSlider from "./NavigationSlider";
import ConfessionChapter from "./ConfessionChapter";
import AllChapters from "./AllChapters";
import ChaptersModal from "./ChaptersModal";

let scrollRef;

export default function Confession({ confession }) {
  const [chapter, setChapter] = useState(0);
  const [showChapters, setShowChapters] = useState(false);

  useEffect(() => {
    if (scrollRef) {
      scrollRef.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [chapter]);

  const chapterContent = confession.content[chapter];

  return (
    <ScrollView style={styles.root} ref={(ref) => (scrollRef = ref)}>
      <DocumentTitle title={confession.title} />
      <View style={styles.bodyContainer}>
        <AllChapters setShowChapters={setShowChapters} text="All Chapters" />
        <NavigationSlider
          chapter={chapter}
          setChapter={setChapter}
          numChapters={confession.content.length}
          chapterContent={chapterContent}
        />
        <ConfessionChapter
          chapterContent={chapterContent}
          confession={confession}
        />
        <NavigationSlider
          chapter={chapter}
          setChapter={setChapter}
          numChapters={confession.content.length}
          chapterContent={chapterContent}
          hideSlider
        />
      </View>

      <ChaptersModal
        showChapters={showChapters}
        setShowChapters={setShowChapters}
        chaptersContent={confession.content}
        setChapter={setChapter}
      />
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
});
