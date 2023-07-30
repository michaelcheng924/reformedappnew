import { TouchableOpacity, View } from "react-native";
import AppText from "./AppText";
import some from "lodash/some";
import axios from "axios";
import { Button } from "@rneui/themed";
import { useState } from "react";
import ScripturesModal from "./ScripturesModal";

let footnote = 0;
let footnote1 = 0;

export default function ConfessionChapter({ chapterContent, confession }) {
  const [scriptures, setScriptures] = useState(null);

  if (typeof chapterContent.content[0] === "string") {
    return chapterContent.content.map((paragraph, index) => {
      return (
        <View
          key={index}
          style={{
            marginBottom: 25,
          }}
        >
          <AppText>{paragraph}</AppText>
        </View>
      );
    });
  }

  return (
    <View>
      {chapterContent.content.map((paragraph, index) => {
        return (
          <View
            key={index}
            style={{
              marginBottom: 25,
            }}
          >
            {paragraph[0].title ? (
              <AppText isHeading bold>
                {paragraph[0].title}
              </AppText>
            ) : null}
            <AppText>
              {confession.title !== "Canons of Dort" ? (
                <AppText bold>{index + 1}. </AppText>
              ) : null}
              {paragraph.map((section, index1) => {
                if (section.scriptures) {
                  footnote += 1;
                }

                return (
                  <AppText key={index1}>
                    {section.text}
                    {section.scriptures ? (
                      <AppText color="#9e9e9e" bold>
                        ({footnote}){" "}
                      </AppText>
                    ) : null}
                  </AppText>
                );
              })}
            </AppText>

            {some(paragraph, (item) => {
              return item.scriptures;
            }) ? (
              <View
                style={{
                  borderColor: "#4d5156",
                  borderWidth: 1,
                  marginTop: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {paragraph.map((section, index1) => {
                  if (section.scriptures) {
                    footnote1 += 1;
                  } else {
                    return null;
                  }

                  return (
                    <TouchableOpacity
                      key={index1}
                      onPress={() => {
                        setScriptures([]);
                        axios
                          .post("https://rwnextapi.vercel.app/api/scriptures", {
                            scripture: section.scriptures,
                          })
                          .then((response) => {
                            setScriptures({
                              text: section.text,
                              scriptures: response.data.results,
                            });
                          })
                          .catch(() => {
                            setScriptures("error");
                          });
                      }}
                    >
                      <AppText>
                        <AppText bold color="#489D89">
                          ({footnote1})
                        </AppText>{" "}
                        <AppText color="#489D89">{section.scriptures}</AppText>
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
        );
      })}
      <ScripturesModal scriptures={scriptures} setScriptures={setScriptures} />
    </View>
  );
}
