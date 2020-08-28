import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { useFonts, Audiowide_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from "expo";
import Icon from "react-native-vector-icons/Ionicons";

import ThemeContext from "../context/theme";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Audiowide_400Regular,
  });

  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme[3],
      alignItems: "center",
      justifyContent: "center",
    },
    contentHead: {
      marginTop: 10,
      color: theme[2],
      fontSize: 20,
      alignContent: "center",
    },
    contentContent: {
      width: "95%",
      color: theme[2],
      fontSize: 15,
      alignContent: "center",
    },
    contentBullet: {
      marginLeft: 10,
      color: theme[2],
      fontSize: 15,
      alignContent: "center",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <View style={styles.container}>
          <Text
            style={{
              color: theme[4],
              fontFamily: "Audiowide_400Regular",
              fontSize: 25,
            }}
          >
            {">_About App"}
          </Text>
          <ScrollView style={{ width: ww - 10 }}>
            
            <Text style={styles.contentHead}>
              This is Developed for Hosting Image Quiz..
            </Text>

            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={styles.contentBullet}>{"\u2B24"}</Text>
              <Text style={styles.contentContent}>
                You need to{" "}
                <Text
                  style={{
                    color: theme[2],
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}
                >
                  login/signup
                </Text>{" "}
                using the Enrollment Number provided from college itself.{" "}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={styles.contentBullet}>{"\u2B24"}</Text>
              <Text style={styles.contentContent}>
                After{" "}
                <Text
                  style={{
                    color: theme[2],
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}
                >
                  login/signup
                </Text>{" "}
                you will see new option in Navigation Drawer i.e.{" "}
                <Text style={{ color: theme[2], fontWeight: "bold" }}>
                  Quiz
                </Text>
                .
              </Text>
            </View>
          </ScrollView>
          <Text style={{ marginTop: 30, color: theme[2] }}>
            @Copyright Quiz O'Pic 2020
          </Text>
        </View>
      </>
    );
  }
}
