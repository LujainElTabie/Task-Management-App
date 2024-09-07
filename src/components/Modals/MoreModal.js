import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DeleteIcon from "../../assets/images/main/delete.svg";
import EditIcon from "../../assets/images/main/edit.svg";
function MoreModal({
  setModalVisible,
  deleteTask,
  setMoreModal,
  setTask,
  task,
}) {
  return (
    <View>
      <View>
        <TouchableOpacity
          className="flex-row justify-between w-full py-4 items-center"
          onPress={() => {
            setMoreModal(false);
            setModalVisible(true);
          }}
        >
          <Text className="font-semibold text-lg text-darkBlue">Edit Task</Text>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1 }} className="w-full bg-lightGrey" />
      <View>
        <TouchableOpacity
          className="flex-row justify-between w-full py-4 items-center"
          onPress={() => {
            deleteTask(task.id);
            setMoreModal(false);
            setTask("");
          }}
        >
          <Text className="font-semibold text-lg text-darkBlue">
            Delete Task
          </Text>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MoreModal;
