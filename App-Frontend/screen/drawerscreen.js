import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import ThemeContext from "../context/theme";
import LoginContext from "../context/isLogin";
import RollnoContext from "../context/rollno";
import CurscoreContext from "../context/curscore";
import UsernameContext from "../context/username";
import TokenContext from "../context/token";

export default function DrawerContent(props) {
  const [isDarkTheme, setisDarkTheme] = useState(false);

  const toggleTheme = () => {
    setisDarkTheme(!isDarkTheme);
    //header,drawer,font,mainback,logintext
    theme[0] == "#84a9ac"
      ? settheme(["#222831", "#393e46", "#d8d3cd", "#797a7e", "#000"])
      : settheme(["#84a9ac", "#89c9b8", "#393e46", "#e0ece4", "#000"]);
  };

  const { theme, settheme } = useContext(ThemeContext);
  const { isLogin, setisLogin } = useContext(LoginContext);
  const { rollno, setrollno } = useContext(RollnoContext);
  const { curscore, setcurscore } = useContext(CurscoreContext);
  const { username, setusername } = useContext(UsernameContext);
  const { token, settoken } = useContext(TokenContext);
  

  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: "bold",
      color: theme[2],
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color: theme[2],
    },
    row: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 15,
    },
    paragraph: {
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      color: "#fff",
    },
    bottomDrawerSection: {
      marginBottom: 15,
    },
    preference: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  const clearData = () => {
    setisLogin(0);
    setcurscore("00");
    setrollno("");
    setusername("");
    settoken("");
  }

  return (
    <View style={{ flex: 1, backgroundColor: props.theme[1] }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://i.ibb.co/PY51JW5/ab67616d0000b27324492f2ba3a1d995e1faf5d8.jpg",
                }}
                size={60}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {props.logincheck == 0 ? "Quiz O'Pic" : props.username}
                </Title>
                <Caption style={styles.caption}>
                  @{props.logincheck == 0 ? " Please Login/Signup" : props.rollno}
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>Your Score </Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {props.logincheck == 0 ? "00" : props.curscore}
                </Paragraph>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={theme[2]} size={size} />
              )}
              label="Home"
              labelStyle={{ color: theme[2] }}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            {props.logincheck == 0 ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="login" color={theme[2]} size={size} />
                )}
                label="Login"
                labelStyle={{ color: theme[2] }}
                onPress={() => {
                  props.navigation.navigate("Login");
                }}
              />
            ) : (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="alpha-q-circle-outline"
                    color={theme[2]}
                    size={size}
                  />
                )}
                label="Quiz"
                labelStyle={{ color: theme[2] }}
                onPress={() => {
                  props.navigation.navigate("Quiz");
                }}
              />
            )}

            {props.logincheck == 0 ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="account-plus-outline"
                    color={theme[2]}
                    size={size}
                  />
                )}
                label="Signup"
                labelStyle={{ color: theme[2] }}
                onPress={() => {
                  props.navigation.navigate("Signup");
                }}
              />
            ) : null}

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-group-outline"
                  color={theme[2]}
                  size={size}
                />
              )}
              label="About"
              labelStyle={{ color: theme[2] }}
              onPress={() => {
                props.navigation.navigate("About");
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text style={{ color: theme[2] }}>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <></>
        {props.logincheck == 0 ? (
          <></>
        ) : (
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={theme[2]} size={size} />
            )}
            label="Sign Out"
            labelStyle={{ color: theme[2] }}
            onPress={() => clearData()}
          />
        )}
      </Drawer.Section>
    </View>
  );
}
