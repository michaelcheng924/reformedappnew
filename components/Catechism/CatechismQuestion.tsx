import isArray from "lodash/isArray";
import some from "lodash/some";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import axios from "axios";

export default function CatechismQuestion({ item, index, setScriptures }) {
  return (
    <View>
      <AppText bold isHeading>
        {index + 1}.{" "}
        {isArray(item.question)
          ? item.question.map((item, index) => {
              return (
                <AppText key={index}>
                  <AppText bold isHeading>
                    {item.text}
                  </AppText>
                  <AppText bold color="#9e9e9e" isHeading>
                    ({index + 1})
                  </AppText>
                </AppText>
              );
            })
          : item.question}
      </AppText>
      {isArray(item.question)
        ? item.question.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setScriptures([]);
                  axios
                    .post("https://rwnextapi.vercel.app/api/scriptures", {
                      scripture: item.scriptures,
                    })
                    .then((response) => {
                      setScriptures({
                        text: item.text,
                        scriptures: response.data.results,
                      });
                    })
                    .catch(() => {
                      setScriptures("error");
                    });
                }}
                style={[
                  styles.answer,
                  {
                    marginBottom: 15,
                  },
                ]}
              >
                <AppText color="#489D89">
                  ({index + 1}) {item.scriptures}
                </AppText>
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  answer: {
    borderWidth: 1,
    borderColor: "#4d5156",
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
