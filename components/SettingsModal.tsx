import { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";

import AppText from "../components/AppText";

const THEMES = ["Light", "Dark"];
const FONTS = ["proxima-nova", "baskerville"];

export default function SettingsModal({
  showSettings,
  setShowSettings,
  theme,
  font,
  setTheme,
  setFont,
  setSize,
  size,
}) {
  useEffect(() => {
    try {
      AsyncStorage.getItem("FONT").then((r) => {
        if (r && r !== font) {
          setFont(r);
        }
      });
    } catch (error) {}
    try {
      AsyncStorage.getItem("SIZE").then((r) => {
        if (r && Number(r) !== size) {
          setSize(Number(r));
        }
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("FONT", font);
  }, [font]);

  useEffect(() => {
    AsyncStorage.setItem("SIZE", String(size));
  }, [size]);

  return (
    <Modal
      isVisible={showSettings}
      onBackdropPress={() => {
        setShowSettings(null);
      }}
    >
      <ScrollView
        style={{
          backgroundColor: theme === "Dark" ? "#000" : "#fff",
        }}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          onPress={() => {
            setShowSettings(null);
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
        <TouchableOpacity
          onPress={() => {
            setTheme("light");
            setFont("proxima-nova");
            setSize(16);
          }}
        >
          <View
            style={[
              styles.controlItem,
              {
                borderColor: "#4d5156",
              },
            ]}
          >
            <AppText>Reset</AppText>
          </View>
        </TouchableOpacity>
        <View style={styles.controls}>
          <View style={styles.controlsInner}>
            <View style={[styles.controlItems]}>
              {THEMES.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setTheme(item);
                    }}
                  >
                    <View
                      style={[
                        styles.controlItem,
                        {
                          backgroundColor: item === "Dark" ? "#000" : "#fff",
                          borderColor: theme === item ? "#039be5" : "#4d5156",
                          marginLeft: index === 0 ? 0 : 10,
                        },
                      ]}
                    >
                      <AppText
                        color={item === "Dark" ? "#fff" : "#4d5156"}
                        forceColor
                      >
                        {item}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.controlsInner}>
            <View
              style={[
                styles.controlItems,
                {
                  marginRight: 40,
                },
              ]}
            >
              {FONTS.map((fontName, index) => {
                return (
                  <TouchableOpacity
                    key={fontName}
                    onPress={() => {
                      setFont(fontName);
                    }}
                  >
                    <View
                      style={[
                        styles.controlItem,
                        {
                          borderColor:
                            font === fontName ? "#039be5" : "#4d5156",
                          marginLeft: index === 0 ? 0 : 10,
                        },
                      ]}
                    >
                      <AppText color={font === fontName ? "#039be5" : ""}>
                        {fontName === "proxima-nova" ? "Sans-serif" : "Serif"}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.fontSizeControls}>
              <TouchableOpacity
                onPress={() => {
                  if (size <= 70) {
                    setSize(size + 1);
                  }
                }}
              >
                <Entypo
                  name="chevron-up"
                  size={40}
                  color="#4d5156"
                  style={{
                    position: "relative",
                    top: 8,
                  }}
                />
              </TouchableOpacity>
              <AppText>Font Size</AppText>
              <TouchableOpacity
                onPress={() => {
                  if (size >= 10) {
                    setSize(size - 1);
                  }
                }}
              >
                <Entypo
                  name="chevron-down"
                  size={40}
                  color="#4d5156"
                  style={{
                    position: "relative",
                    top: -5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.sample}>
          <View style={styles.sampleHeading}>
            <AppText bold>Sample Text</AppText>
          </View>
          <AppText>
            1 In the beginning was the Word, and the Word was with God, and the
            Word was God. 2 He was in the beginning with God. 3 All things were
            made through him, and without him was not any thing made that was
            made. 4 In him was life, and the life was the light of men. 5 The
            light shines in the darkness, and the darkness has not overcome it.
          </AppText>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
  },
  settings: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    width: `100%`,
  },
  controls: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 10,
    width: "100%",
  },
  controlsInner: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  controlItems: {
    display: "flex",
    flexDirection: "row",
  },
  controlItem: {
    borderRadius: 3,
    borderWidth: 1,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  fontSizeControls: {
    alignItems: "center",
    display: "flex",
  },
  sample: {
    marginTop: 20,
  },
  sampleHeading: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
});
