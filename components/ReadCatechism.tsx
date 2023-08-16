import { useState } from "react";
import isArray from "lodash/isArray";
import some from "lodash/some";
import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import AppText from "./AppText";
import ScripturesModal from "./ScripturesModal";
import DocumentTitle from "./DocumentTitle";

let scrollView;

export default function ReadCatechism({ catechism }) {
  const [scriptures, setScriptures] = useState(null);

  let footnote = 0;
  let footnote1 = 0;

  function renderQuestion(item, index) {
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
                      .post("https://mcc-admin.herokuapp.com/scriptures", {
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

  function renderAnswer(item, index) {
    if (isArray(item.answer[0])) {
      return (
        <View key={index}>
          {item.answer.map((item1, index1) => {
            return (
              <View
                key={index1}
                style={{
                  marginBottom: 25,
                }}
              >
                <AppText>
                  {item1.map((item2, index2) => {
                    if (item2.scriptures) {
                      footnote += 1;
                    }

                    return (
                      <AppText key={index2}>
                        {item2.text}
                        {item2.scriptures && (
                          <AppText bold color="#9e9e9e">
                            ({footnote}){" "}
                          </AppText>
                        )}
                      </AppText>
                    );
                  })}
                </AppText>
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <AppText>
        {item.answer.map((item, index) => {
          if (item.scriptures) {
            footnote += 1;
          }

          return (
            <AppText key={index}>
              {item.text}
              {item.scriptures && (
                <AppText bold color="#9e9e9e">
                  ({footnote}){" "}
                </AppText>
              )}
            </AppText>
          );
        })}
      </AppText>
    );
  }

  function renderItem({ item, index }) {
    if (item.isTitle) {
      return <DocumentTitle title={catechism.title} />;
    }

    return (
      <View
        key={index}
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {renderQuestion(item, index - 1)}
        {renderAnswer(item, index - 1)}
        {some(item.answer, (item1) => {
          if (isArray(item1)) {
            return some(item1, (item2) => {
              return item2.scriptures;
            });
          }

          return item1.scriptures;
        }) ? (
          <View style={[styles.answer, styles.scriptures]}>
            {item.answer.map((item, index) => {
              if (isArray(item)) {
                return item.map((item2, index1) => {
                  if (item2.scriptures) {
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
                          .post("https://mcc-admin.herokuapp.com/scriptures", {
                            scripture: item2.scriptures,
                          })
                          .then((response) => {
                            setScriptures({
                              text: item2.text,
                              scriptures: response.data.results,
                            });
                          })
                          .catch(() => {
                            setScriptures("error");
                          });
                      }}
                    >
                      <AppText color="#489D89">
                        ({footnote1}) {item2.scriptures}
                      </AppText>
                    </TouchableOpacity>
                  );
                });
              }

              if (item.scriptures) {
                footnote1 += 1;
              } else {
                return null;
              }

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setScriptures([]);
                    axios
                      .post("https://mcc-admin.herokuapp.com/scriptures", {
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
                >
                  <AppText color="#489D89">
                    ({footnote1}) {item.scriptures}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScripturesModal setScriptures={setScriptures} scriptures={scriptures} />
      <FlatList
        data={[{ isTitle: true }].concat(catechism.content)}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
      />
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
  answer: {
    borderWidth: 1,
    borderColor: "#4d5156",
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scriptures: {
    marginTop: 10,
  },
});
