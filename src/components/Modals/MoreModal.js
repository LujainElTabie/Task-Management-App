import React from "react";
import { View } from "react-native";

function MoreModal({ setModalVisible, deleteTask, editTask }) {
  return (
    <View className="flex-1 bg-red">
      <View
        style={{ backgroundColor: "#000000", opacity: 0.4, flex: 1 }}
        onTouchEnd={() => setModalVisible(false)}
      />

      <View className="w-full bg-red p-5 m-5 rounded-2xl"></View>
    </View>
  );
}

export default MoreModal;
