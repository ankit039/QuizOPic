import React, { useContext } from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import QuizScreen from "./quizscreen";
import LeaderScreen from "./leaderboardscreen";
import HintScreen from "./hintscreen";

const QuizStack = createStackNavigator();
const LeaderStack = createStackNavigator();
const HintStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

import ThemeContext from "../context/theme";

export default function AfterLoginScreen(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator barStyle={{ backgroundColor: theme[1] }}>
      <Tab.Screen
        name="Quiz"
        component={QuizStackScreen}
        options={{
          tabBarLabel: "Quiz",
          tabBarColor: "black",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-bulb" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Leader"
        component={LeaderStackScreen}
        options={{
          tabBarLabel: "Leader Board",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-trophy" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Hint"
        component={HintStackScreen}
        options={{
          tabBarLabel: "Hint",
          tabBarColor: "#000",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-information-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const QuizStackScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <QuizStack.Navigator
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
      <QuizStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: "Quiz",
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
    </QuizStack.Navigator>
  );
};

const LeaderStackScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <LeaderStack.Navigator
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
      <LeaderStack.Screen
        name="Leader"
        component={LeaderScreen}
        options={{
          title: "Leader Board",
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
    </LeaderStack.Navigator>
  );
};

const HintStackScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <HintStack.Navigator
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
      <HintStack.Screen
        name="Hint"
        component={HintScreen}
        options={{
          title: "Hint",
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
    </HintStack.Navigator>
  );
};
