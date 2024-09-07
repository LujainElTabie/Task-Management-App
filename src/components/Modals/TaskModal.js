import React, { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../Button";
import Datepicker from "../Datepicker";
import Dropdown from "../Dropdown";
import Input from "../Input";

function TaskModal({ setModalVisible, addTask, item, setTask, editTask }) {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalTitle, setModalTitle] = useState("Add New Task");
  const [buttonText, setButtonText] = useState("Done");
  const [date, setDate] = useState(new Date());
  const [id, setID] = useState("");

  const taskID = item.id;

  useEffect(() => {
    if (item !== "") {
      setTitle(item.title);
      setDescription(item.description);
      setModalTitle("Edit task");
      setButtonText("Save changes");
      setID(item.id);
    }
  }, []);

  const categoryData = [
    { key: "Front-end", value: "Front-end" },
    { key: "Back-end", value: "Back-end" },
    { key: "UI/UX", value: "UI/UX" },
    { key: "DevOps", value: "DevOps" },
  ];

  const priorityData = [
    { key: "High", value: "High" },
    { key: "Mid", value: "Mid" },
    { key: "Low", value: "Low" },
  ];
  return (
    <>
      <View
        style={{
          backgroundColor: "rgba(1, 64, 66, 0.8)",
          opacity: 0.4,
          flex: 1,
        }}
        onTouchEnd={() => {
          setModalVisible(false);
          setTask("");
        }}
      />
      <TouchableWithoutFeedback
        style={{ zIndex: 1000 }}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View className="h-5/6 bg-white p-5">
          <Text
            className={`font-semibold text-2xl ${
              modalTitle === "Edit task" ? "text-grey" : "text-primary"
            }`}
          >
            {modalTitle}
          </Text>
          <ScrollView>
            <View className="mb-8" />
            <Input
              variant="task"
              onChangeText={setTitle}
              placeholder={"Enter task name"}
              label={"Task name"}
              value={title}
            />
            <View className="mb-4" />
            <Input
              variant="task"
              onChangeText={setDescription}
              placeholder={"Enter task Discerption"}
              label={"Enter task name"}
              multiline={true}
              boxStyle={{ height: 130, alignItems: "flex-start" }}
              value={description}
            />
            <View className="mb-4" />

            <Dropdown
              setSelected={setCategory}
              data={categoryData}
              label={"Category"}
              defaultOption={category}
            />
            <View className="mb-4" />

            <Dropdown
              setSelected={setPriority}
              data={priorityData}
              label={"Priority"}
            />
            <View className="mb-4" />
            <Datepicker date={date} setDate={setDate} />
            <Button
              disabled={
                category === "" ||
                priority === "" ||
                description === "" ||
                title === ""
              }
              onClick={() => {
                buttonText === "Done"
                  ? addTask({
                      title,
                      description,
                      category,
                      priority,
                      date,
                    })
                  : editTask({
                      id: id,
                      task: {
                        title,
                        description,
                        category,
                        priority,
                        date,
                      },
                    });
                setModalVisible(false);
                setTask("");
              }}
              text={buttonText}
              customStyle="mt-8"
            />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setTask("");
              }}
              className="items-center text-black font-medium text-base mt-5"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default TaskModal;
