import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomePage";
import MemberSelectApp from "../components/MemberSelectionApp";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Tap & Traps",
        }}
      />
      <Stack.Screen
        name="MemberSelect"
        component={MemberSelectApp}
        options={{
          title: "Select Member",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
