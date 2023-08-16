import { Icon } from "@rneui/themed";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { red } from "../constants/colors";
import { Slider, Text } from "react-native-elements";
import { useEffect, useState } from "react";

export default function NavigationSlider({
  chapter,
  setChapter,
  numChapters,
  chapterContent,
}) {
  const [showSlider, setShowSlider] = useState(true);

  useEffect(() => {
    if (!showSlider) {
      setShowSlider(true);
    }
  }, [showSlider]);

  return (
    <>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={() => {
            setChapter(chapter - 1);
            setShowSlider(false);
          }}
        >
          <View style={styles.iconContainer}>
            <Icon
              name="chevron-left"
              type="feather"
              size={20}
              reverse
              containerStyle={{ bottom: 20, right: 20 }}
              color={red}
              disabled={chapter === 0}
            />
          </View>
        </TouchableOpacity>
        {showSlider && (
          <Slider
            value={chapter}
            onValueChange={(value) => {
              setChapter(value);
            }}
            maximumValue={numChapters - 1}
            minimumValue={0}
            step={1}
            allowTouchTrack
            trackStyle={{ height: 5, backgroundColor: "transparent" }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: red,
            }}
            style={{
              flexGrow: 1,
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setChapter(chapter + 1);
            setShowSlider(false);
          }}
        >
          <View style={styles.iconContainer}>
            <Icon
              name="chevron-right"
              type="feather"
              size={20}
              reverse
              containerStyle={{ bottom: 20, right: 0 }}
              color={red}
              disabled={chapter === numChapters - 1}
            />
          </View>
        </TouchableOpacity>
      </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconContainer: {
    height: 20,
    width: 40,
  },
  chapterContainer: {
    display: "flex",
    minHeight: 106,
    justifyContent: "center",
  },
});
