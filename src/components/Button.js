import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

function Button({ text, customStyle, onClick, disabled, loading }) {
  return (
    <TouchableOpacity
      className={`rounded-2xl w-full h-14  justify-center items-center ${customStyle} ${
        disabled ? "bg-grey" : "bg-secondary"
      }`}
      onPress={onClick}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className="text-white font-semibold text-base">{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
