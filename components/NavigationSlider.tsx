import { Icon } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { red } from "../constants/colors";
import { Slider } from "react-native-elements";

export default function NavigationSlider({ chapter, setChapter, numChapters }) {
  return (
    <View style={styles.navigationContainer}>
      <View style={styles.iconContainer}>
        <Icon
          name="chevron-left"
          type="feather"
          size={20}
          reverse
          containerStyle={{ bottom: 20, right: 20 }}
          color={red}
          disabled={chapter === 0}
          onPress={() => {
            setChapter(chapter - 1);
          }}
        />
      </View>
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
      <View style={styles.iconContainer}>
        <Icon
          name="chevron-right"
          type="feather"
          size={20}
          reverse
          containerStyle={{ bottom: 20, right: 0 }}
          color={red}
          disabled={chapter === numChapters - 1}
          onPress={() => {
            setChapter(chapter + 1);
          }}
        />
      </View>
    </View>
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
});
