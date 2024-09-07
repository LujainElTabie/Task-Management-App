import moment from "moment";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CalendarIcon from "../assets/images/main/datepickeCalendar.svg";

function Datepicker({ customStyle, iconRight, label, date, setDate }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Text className={`text-black text-xs mb-2 font-semibold`}>{label}</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        className={`flex-row rounded-2xl w-full h-14 pl-5 bg-white justify-between items-center border-solid border border-grey ${customStyle}`}
      >
        <Text>{moment(date).format("hh:mm a DD MMM. YYYY")}</Text>
        <View className="mx-5">
          <CalendarIcon />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default Datepicker;
