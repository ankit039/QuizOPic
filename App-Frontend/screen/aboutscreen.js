import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts, Audiowide_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from "expo";
import ThemeContext from "../context/theme";

export default function AboutScreen(props) {
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
            {">_Developed By"}
          </Text>
          {/* <Image style={{ backgroundColor:"#000" }} source={{uri:'https://ankit039.github.io/masterportfolio/static/media/ankit.4c145906.png'}}/>
           */}
          <Image
            style={styles.boxenr}
            source={require("../assets/pic.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              color: theme[4],
              fontFamily: "Audiowide_400Regular",
              fontSize: 20,
            }}
          >
            {"Ankit Raj *_*"}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Icon
              style={{ padding: 10 }}
              name={"facebook"}
              color={theme[2]}
              size={30}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/ryder.raj.ankit/")
              }
            ></Icon>
            <Icon
              style={{ padding: 10 }}
              name={"git"}
              color={theme[2]}
              size={30}
              onPress={() => Linking.openURL("https://github.com/ankit039/")}
            ></Icon>
            <Icon
              style={{ padding: 10 }}
              name={"gmail"}
              color={theme[2]}
              size={30}
              onPress={() =>
                Linking.openURL("mailto:ryder.raj.ankit@gmail.com")
              }
            ></Icon>
            <Icon
              style={{ padding: 10 }}
              name={"linkedin"}
              color={theme[2]}
              size={30}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/ankit-raj-2a74b017a/"
                )
              }
            ></Icon>
          </View>
          <Text style={{ marginTop: 30, color: theme[2] }}>
            @Copyright Quiz O'Pic 2020
          </Text>
        </View>
      </>
    );
  }
}
