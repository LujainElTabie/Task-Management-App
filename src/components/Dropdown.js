import React from "react";
import { Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

function Dropdown({ setSelected, data, label, placeholder, defaultOption }) {
  return (
    <View>
      <Text className="text-black text-xs mb-2">{label}</Text>
      <SelectList
        search={false}
        boxStyles={{
          borderWidth: 1,
          borderColor: "#D1D5DB",
          borderStyle: "solid",
          borderRadius: 16,
          height: 56,
          alignItems: "center",
        }}
        inputStyles={{ color: "#7E92A2" }}
        placeholder={placeholder}
        setSelected={(val) => setSelected(val)}
        data={data}
        defaultOption={defaultOption}
      />
    </View>
  );
}

export default Dropdown;
