import React from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";

function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1 align-bottom bg-red justify-end p-5 bg-white">
      <View className="mb-5">
        <Text className="text-5xl font-semibold">MANAGE</Text>
        <Text className="text-5xl font-semibold">YOUR TASKS</Text>
        <Text className="text-5xl font-semibold">WITH</Text>
        <Text className="text-5xl font-semibold text-primary">OWITASKS</Text>
      </View>
      <Button
        text={"Let’s Start!"}
        onClick={() => {
          navigation.navigate("Login Screen");
        }}
      />
    </View>
  );
}

export default WelcomeScreen;
