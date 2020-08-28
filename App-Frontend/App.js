import React, { useState } from "react";
import { View, Text, Button, Dimensions, StatusBar } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

//import screens
import AfterLoginScreen from "./screen/afterloginscreen";
import LoginScreen from "./screen/loginscreen";
import SignupScreen from "./screen/signupscreen";
import AboutScreen from "./screen/aboutscreen";
import HomeScreen from "./screen/homescreen";
import QuizScreen from "./screen/quizscreen";

//left drawer screen overlay
import DrawerContent  from "./screen/drawerscreen";

//import context
import LoginContext from "./context/isLogin";
import UsernameContext from "./context/username";
import RollnoContext from "./context/rollno";
import CurscoreContext from "./context/curscore";
import ThemeContext from "./context/theme";
import TokenContext from "./context/token";

const HomeStack = createStackNavigator();
const CheckLoginStack = createStackNavigator();
const CheckSignupStack = createStackNavigator();
const AboutStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

//<Drawer.Screen name="AfterLogin" component={AfterLoginScreen} />
//<Drawer.Screen name="Login" component={(isLogin,username,rollno) => {(isLogin==0) ? <LoginScreen /> : <AfterLoginScreen username={username} rollno={rollno} />}} />

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

export default function App() {
  const [isLogin, setisLogin] = useState(0);
  const [username, setusername] = useState("");
  const [rollno, setrollno] = useState("");
  const [curscore, setcurscore] = useState("00");
  const [token, settoken] = useState("");
  const [theme,settheme] = useState(["#84a9ac","#89c9b8","#393e46","#e0ece4","#000"]);
  
  //for managing the context
  const isLoginvalue = { isLogin, setisLogin };
  const usernamevalue = { username, setusername };
  const rollnovalue = { rollno, setrollno };
  const curscorevalue = { curscore, setcurscore };
  const themevalue = { theme, settheme };
  const tokenvalue = { token, settoken };

  const CheckLoginScreen = () =>
    isLogin == 0 ? (
      <>
        <LoginScreen />
      </>
    ) : (
      <>
        <AfterLoginScreen username={username} rollno={rollno} theme={theme} />
      </>
    );

  const CheckSignupScreen = () =>
    isLogin == 0 ? (
      <>
        <SignupScreen />
      </>
    ) : (
      <>
        <AfterLoginScreen username={username} rollno={rollno} />
      </>
    );

  const CheckQuizScreen = () => 
      isLogin == 1 ? (
      <>
        <AfterLoginScreen username={username} rollno={rollno} theme={theme}/>
      </>
    ) : (
      <>
        
      </>
    );

  const CheckLoginStackScreen = ({ navigation },props) => (
    <CheckLoginStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme[0],
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
          color: theme[2],
        },
      }}
    >
      <CheckLoginStack.Screen
        name="Login"
        component={CheckLoginScreen}
        options={{
          title: "Login",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={40}
              color={theme[2]}
              backgroundColor={theme[0]}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </CheckLoginStack.Navigator>
  );

  const CheckSignupStackScreen = ({ navigation }) => (
    <CheckSignupStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme[0],
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
          color: theme[2],
        },
      }}
    >
      <CheckSignupStack.Screen
        name="Signup"
        component={CheckSignupScreen}
        options={{
          title: "Signup",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={40}
              color={theme[2]}
              backgroundColor={theme[0]}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </CheckSignupStack.Navigator>
  );
  const HomeStackScreen = ({ navigation }, props) => (
  <HomeStack.Navigator
    screenOptions={{
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
        color: theme[2],
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        headerStyle: {
          backgroundColor: theme[0],
        },
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={40}
            color= {theme[2]}
            backgroundColor={theme[0]}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const AboutStackScreen = ({ navigation }) => (
  <AboutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme[0],
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
        color: theme[2],
      },
    }}
  >
    <AboutStack.Screen
      name="About"
      component={AboutScreen}
      options={{
        title: "About",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={40}
            color={theme[2]}
            backgroundColor={theme[0]}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AboutStack.Navigator>
);


  return (
    
    <LoginContext.Provider value={isLoginvalue}>
      <UsernameContext.Provider value={usernamevalue}>
        <RollnoContext.Provider value={rollnovalue}>
          <CurscoreContext.Provider value={curscorevalue}>
            <ThemeContext.Provider value={themevalue} >
            <TokenContext.Provider value={tokenvalue} >
            <StatusBar backgroundColor={theme[0]} barStyle={theme[0] == "#84a9ac" ? 'dark-content' : 'light-content'} />
            <NavigationContainer>
              <Tab.Screen name="Home" component={HomeStackScreen} />
              <Drawer.Navigator
                drawerContent={(props) => (
                  <DrawerContent
                    {...props}
                    logincheck={isLogin}
                    username={username}
                    rollno={rollno}
                    curscore={curscore}
                    theme={theme}
                  />
                )}
              >
                <Drawer.Screen name="Home" component={HomeStackScreen} />
                <Drawer.Screen name="Login" component={CheckLoginStackScreen}/>
                <Drawer.Screen name="Signup" component={CheckSignupStackScreen} />
                <Drawer.Screen name="About" component={AboutStackScreen} />
                <Drawer.Screen name="Quiz" component={CheckQuizScreen} />
              </Drawer.Navigator>
            </NavigationContainer>
            </TokenContext.Provider>
            </ThemeContext.Provider>
          </CurscoreContext.Provider>
        </RollnoContext.Provider>
      </UsernameContext.Provider>
    </LoginContext.Provider>
  );
}

