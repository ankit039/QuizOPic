import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts, Audiowide_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from "expo";
import config from "../config";

import ThemeContext from "../context/theme";
import LoginContext from "../context/isLogin";
import RollnoContext from "../context/rollno";
import CurscoreContext from "../context/curscore";
import UsernameContext from "../context/username";
import TokenContext from "../context/token";

import Loader from "./loader";

import { Paragraph } from "react-native-paper";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

export default function LoginScreen(props) {
  const [Name, setName] = useState("");
  const [Enrno, setEnrno] = useState("");
  const [Pass, setPass] = useState("");
  let [fontsLoaded] = useFonts({
    Audiowide_400Regular,
  });

  const [isFocusedname, setisFocusedname] = useState(false);
  const [isFocusedeno, setisFocusedeno] = useState(false);
  const [isFocusedpsd, setisFocusedpsd] = useState(false);

  const [isSecure, setisSecure] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  const { theme } = useContext(ThemeContext);
  const { isLogin, setisLogin } = useContext(LoginContext);
  const { rollno, setrollno } = useContext(RollnoContext);
  const { curscore, setcurscore } = useContext(CurscoreContext);
  const { username, setusername } = useContext(UsernameContext);
  const { token, settoken } = useContext(TokenContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme[3],
      alignItems: "center",
      justifyContent: "center",
    },
    textinput: {
      height: 50,
      borderColor: theme[2],
      borderWidth: 1,
      width: ww - 100,
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 32,
      paddingLeft: 20,
      paddingRight: 30,
    },
    loginbutton: {
      padding: 10,
      borderRadius: 32,
      backgroundColor:
        Name == "" || Enrno == "" || Pass == "" ? "#DC143C" : theme[1],
    },
    boxenr: {
      width: ww - 210,
      top: wh - 695,
      zIndex: 2,
      marginLeft: ww - 450,
    },
    boxpsd: {
      width: ww - 270,
      top: wh - 695,
      zIndex: 2,
      marginTop: -50,
      marginLeft: ww - 500,
      padding: 0,
    },
    eye: {
      marginTop: -45,
      marginBottom: 50,
      marginLeft: ww - 135,
    },
  });

  const handleLogin = (Name, Enrno, Pass) => {
    setError(null);
    setIsLoaded(false);
    setItems([]);
    fetch(config.url + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        enrno: Enrno,
        password: Pass,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          if (result[0].sucess == false) {
            alert(result[0].msg);
          } else {
            setisLogin(1);
            setrollno(result[0].enrno);
            setcurscore(result[0].curscore);
            setusername(result[0].name);
            settoken(result[0].msg);
          }
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
            <Text
              style={{
                marginTop: -50,
                marginBottom: 10,
                fontSize: 25,
                color: theme[2],
              }}
            >
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
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: theme[4],
                  fontFamily: "Audiowide_400Regular",
                  fontSize: 25,
                }}
              >
                {">_Enter The Credential"}
              </Text>
            </View>
            <TextInput
              onFocus={() => setisFocusedname(true)}
              onBlur={() => setisFocusedname(false)}
              style={styles.textinput}
              onChangeText={(text) => setName(text)}
              value={Name}
              placeholder={
                isFocusedname == false ? "Enter Your Unuique Name" : ""
              }
            />
            <Text
              style={{
                marginTop: -75,
                marginBottom: 50,
                zIndex: 2,
                marginLeft: "-15%",
                backgroundColor: theme[3],
                color: theme[4],
                fontFamily: "Audiowide_400Regular",
                fontSize: 15,
              }}
            >
              {">_Enter User Name"}
            </Text>
            <TextInput
              onFocus={() => setisFocusedeno(true)}
              onBlur={() => setisFocusedeno(false)}
              style={styles.textinput}
              onChangeText={(text) => setEnrno(text)}
              value={Enrno}
              placeholder={
                isFocusedeno == false ? "Enter Your Enrollment Number" : ""
              }
            />
            <Text
              style={{
                marginTop: -75,
                marginBottom: 50,
                zIndex: 2,
                marginLeft: "-15%",
                backgroundColor: theme[3],
                color: theme[4],
                fontFamily: "Audiowide_400Regular",
                fontSize: 15,
              }}
            >
              {">_Enter Enrollment"}
            </Text>

            <TextInput
              onFocus={() => setisFocusedpsd(true)}
              onBlur={() => setisFocusedpsd(false)}
              style={styles.textinput}
              onChangeText={(text) => setPass(text)}
              value={Pass}
              placeholder={isFocusedpsd == false ? "Enter Your Password" : ""}
              secureTextEntry={isSecure}
            />
            <Text
              style={{
                marginTop: -75,
                marginBottom: 50,
                zIndex: 2,
                marginLeft: "-15%",
                backgroundColor: theme[3],
                color: theme[4],
                fontFamily: "Audiowide_400Regular",
                fontSize: 15,
              }}
            >
              {">_Enter Password"}
            </Text>
            <Icon
              style={styles.eye}
              name={isSecure == true ? "eye" : "eye-off"}
              color="black"
              size={20}
              onPress={() => {
                setisSecure(isSecure == true ? false : true);
              }}
            ></Icon>

            <TouchableOpacity
              style={styles.loginbutton}
              onPress={() => handleLogin(Name, Enrno, Pass)}
              disabled={Name == "" || Enrno == "" || Pass == "" ? true : false}
            >
              <Text
                style={{
                  color: theme[2],
                  padding: 5,
                  fontFamily: "Audiowide_400Regular",
                  fontSize: 15,
                }}
              >
                {"Login :)"}
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, color: theme[2] }}>
              @Copyright Quiz O'Pic 2020
            </Text>
          </View>
        </>
      );
    }
  }
}
