import React from "react";
import { Text, TextInput, View } from "react-native";

function Input({
  customStyle,
  placeholder,
  onChangeText,
  value,
  iconLeft,
  iconRight,
  label,
  boxStyle,
  multiline = false,
  variant = "primary",
  secureTextEntry = false,
}) {
  return (
    <View>
      <Text
        className={`text-black text-xs mb-2 ${
          variant === "task" ? "font-semibold" : ""
        }`}
      >
        {label}
      </Text>
      <View
        style={boxStyle}
        className={`flex-row rounded-2xl w-full h-14 bg-white justify-center items-center border-solid border border-grey ${customStyle}`}
      >
        <View className="mx-2">{iconLeft}</View>
        <TextInput
          secureTextEntry={secureTextEntry}
          value={value}
          returnKeyType="none"
          multiline={multiline}
          className="flex-1"
          placeholder={placeholder}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
        />
        <View className="mx-2">{iconRight}</View>
      </View>
    </View>
  );
}

export default Input;
