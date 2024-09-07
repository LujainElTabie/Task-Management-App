import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CalendarIcon from "../assets/images/task/calendar.svg";
import CalendarLateIcon from "../assets/images/task/calendarred.svg";
import MoreIcon from "../assets/images/task/more-fill.svg";

function Task({
  date,
  status,
  title,
  description,
  priority,
  category,
  onMoreClick,
}) {
  const Tag = ({ text, color }) => {
    return (
      <View
        className={`rounded-md p-2 mr-2`}
        style={{ backgroundColor: color }}
      >
        <Text>{text}</Text>
      </View>
    );
  };

  const categoryColorConverter = () => {
    if (category === "Front-end") return "#E6FBEC";
    if (category === "Back-end") return "#F0E1FF";
    if (category === "UI/UX") return "#E6F0FB";
    if (category === "DevOps") return "#E4E4E4";
    else return "";
  };

  const priorityColorConverter = () => {
    if (priority === "High") return "#FFE5DF";
    if (priority === "Mid") return "#F0F4CE";
    if (priority === "Low") return "#C1E1E8";
    else return "";
  };

  const isLate = date && moment(date.toDate()).isAfter(moment());
  return (
    <View className="border-solid border border-grey rounded-2xl p-4">
      <View className="flex-row justify-between mb-4">
        <View className="flex-row">
          {isLate ? <CalendarIcon /> : <CalendarLateIcon />}
          <Text
            className={`text-xs ml-1 ${
              isLate ? "text-inTime" : "text-pastDue"
            }`}
          >
            {date ? moment(date.toDate()).format("DD MMM YYYY") : ""}
          </Text>
        </View>
        <TouchableOpacity onPress={onMoreClick}>
          <MoreIcon />
        </TouchableOpacity>
      </View>
      <Text className="text-black font-semibold text-lg mb-3">{title}</Text>
      <Text className="text-greyText text-sm mb-5">{description}</Text>
      <View className="flex-row">
        <Tag text={category} color={categoryColorConverter()} />
        <Tag text={priority} color={priorityColorConverter()} />
      </View>
    </View>
  );
}

export default Task;
