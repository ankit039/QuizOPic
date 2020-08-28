import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts, Audiowide_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from "expo";
import ThemeContext from "../context/theme";
import TokenContext from "../context/token";
import Loader from "./loader";
import config from '../config';

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

export default function LeaderScreen(props) {
  let [fontsLoaded] = useFonts({
    Audiowide_400Regular,
  });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(TokenContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme[3],
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      marginTop: 5,
      marginBottom: 0,
      borderColor: theme[2],
      borderWidth: 1,
      borderRadius: 32,
      padding: 6,
      width: ww - 10,
      flexDirection: "row",
    },
    name: {
      fontSize: 20,
      width: "80%",
      marginLeft: 5,
    },
    score: {
      fontSize: 20,
    },
  });

  useEffect(() => {
    fetch(config.url+"/leaderboard", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleRefresh = () => {
    setError(null);
    setIsLoaded(false);
    setItems([]);
    fetch(config.url+"/leaderboard", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    if (error) {
      return (
        <>
          <View style={styles.container}>
            <Text style={{ marginBottom: 10, fontSize: 25, color: theme[2] }}>
              Error -_-
            </Text>
            <Text style={{ marginTop: 30 }}>{error.message}</Text>
            <Text style={{ marginTop: 30 }}>
              {"Kindly Send SS to Developer :("}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text style={{ padding: 10 }}>{"Try Again- "}</Text>
              <Icon
                style={{}}
                name="reload"
                color={"black"}
                size={40}
                onPress={() => handleRefresh()}
              />
            </View>
            <Text style={{ marginTop: 30, color: theme[2] }}>
              @Copyright Quiz O'Pic 2020
            </Text>
          </View>
        </>
      );
    } else if (!isLoaded) {
      return (
        <>
          <View style={styles.container}>
            <Text style={{ marginBottom: 10, fontSize: 25, color: theme[2] }}>
              Loading..
            </Text>
            <Loader loading={true} />
            <Text style={{ marginTop: 100, color: theme[2] }}>
              @Copyright Quiz O'Pic 2020
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.container}>
            <View style={styles.box}>
              <Text style={{ fontSize: 20, width: "60%", marginLeft: 5 }}>
                {"Name"}
              </Text>
              <Text style={{ fontSize: 20 }}>{"Current Score"}</Text>
            </View>
            <ScrollView style={{ width: ww - 10 }}>
              {items.map((item) =>
                item.sucess == "true" ? (
                  <View style={styles.box} key={item._id}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.score}>{item.curscore}</Text>
                  </View>
                ) : (
                  <View style={styles.container} key={1}>
                    <Text
                      style={{
                        marginTop: "50%",
                        fontSize: 25,
                        color: theme[2],
                      }}
                    >
                      Error -_-
                    </Text>
                    <Text style={{ marginTop: 30 }}>{item.msg}</Text>
                    <Text style={{ marginTop: 30 }}>
                      {item.msg == "TokenExpiredError"
                        ? "Kidly Login Again :)"
                        : "Don't Manipulate the Token, You are being monitored -_-"}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
            <Icon
              name="reload"
              color={"black"}
              size={40}
              onPress={() => handleRefresh()}
            />
            <Text style={{ marginTop: 5, color: theme[2] }}>
              @Copyright Quiz O'Pic 2020
            </Text>
          </View>
        </>
      );
    }
  }
}
