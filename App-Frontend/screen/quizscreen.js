import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts, Audiowide_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from "expo";
import config from "../config";
import Loader from "./loader";

import ThemeContext from "../context/theme";
import TokenContext from "../context/token";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

export default function QuizScreen(props) {
  const [Ans, setAns] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  const [isFocusedans, setisFocusedans] = useState(false);

  let [fontsLoaded] = useFonts({
    Audiowide_400Regular,
  });

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(TokenContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme[3],
      alignItems: "center",
      justifyContent: "center",
    },
  });

  useEffect(() => {
    fetch(config.url + "/question", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
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

  const handleSubmit = (Ans) => {
    setError(null);
    setIsLoaded(false);
    setItems([]);
    fetch(config.url + "/question_answer", {
      method: "POST",
      headers : {
        Authorization: "Bearer " + token,
        Accept  : 'application/json',
       'Content-Type' : 'application/json'
       },
      body : JSON.stringify({
        answer: Ans
      })
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
            <Text
              style={{
                color: theme[4],
                fontFamily: "Audiowide_400Regular",
                fontSize: 25,
                marginBottom: 15,
              }}
            >
              {">_Enter Asnwer Below"}
            </Text>
            {items.map((item) =>
              item.sucess == "true" ? (
                <Image
                  key={1}
                  style={{
                    borderRadius: 0,
                    height: 300,
                    width: 300,
                    backgroundColor: theme[0],
                  }}
                  source={{
                    uri: item.question,
                  }}
                  resizeMode="contain"
                  size={300}
                />
              ) : (
                <Image
                  key={1}
                  style={{
                    borderRadius: 0,
                    height: 300,
                    width: 300,
                    backgroundColor: theme[0],
                  }}
                  source={{
                    uri: item.question,
                  }}
                  resizeMode="contain"
                  size={300}
                />
              )
            )}

            <TextInput
              onFocus={() => setisFocusedans(true)}
              onBlur={() => setisFocusedans(false)}
              style={{
                height: 50,
                borderColor: theme[2],
                borderWidth: 1,
                width: ww - 100,
                borderRadius: 32,
                paddingLeft: 30,
                marginTop: 10,
                paddingRight: 50,
                fontSize: 20,
              }}
              onChangeText={(text) => setAns(text)}
              value={Ans}
              placeholder={isFocusedans == false ? "Enter Answer" : ""}
            />
            <Icon
              style={{
                marginTop: -45,
                marginLeft: ww - 150,
              }}
              name={"arrow-right-circle"}
              color={Ans == "ok" ? "green" : "black"}
              size={40}
              onPress={() => {
                setAns(""), handleSubmit(Ans);
              }}
            ></Icon>
            <Text style={{ marginTop: 30, color: theme[2] }}>
              @Copyright Quiz O'Pic 2020
            </Text>
          </View>
        </>
      );
    }
  }
}
