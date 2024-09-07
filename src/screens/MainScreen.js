import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Overlay from "react-native-modal-overlay";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import FilterIcon from "../assets/images/main/filter.svg";
import SearchIcon from "../assets/images/main/searchnormal.svg";
import ArrowDown from "../assets/images/main/sortArrowDown.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import MoreModal from "../components/Modals/MoreModal";
import TaskModal from "../components/Modals/TaskModal";
import Task from "../components/Task";
import { useAddTask } from "../hooks/useAddTask";
import { useDeleteTask } from "../hooks/useDeleteTasks";
import { useEditTask } from "../hooks/useEditTask";
import { useTasks } from "../hooks/useTasks";

function MainScreen() {
  const [task, setTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [moreModal, setMoreModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [sortModal, setSortModal] = useState(false);
  const [sorter, setSorter] = useState("Due-Date");

  const [selectedSort, setSelectedSort] = useState("Due-Date");

  const {
    data: tasks,
    isLoading,
    error,
  } = useTasks({ categories, priorities, searchText, selectedSort });
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: addTask, isLoadingAdd, errorAdd } = useAddTask();
  const { mutate: editTask, isLoadingEdit, errorEdit } = useEditTask();

  const [fullname, setFullname] = useState(null);

  const getUserFullname = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;

      if (user) {
        const uid = user.uid;
        const userDocRef = doc(FIRESTORE_DB, "users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          return userData.fullname;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchFullname = async () => {
      const name = await getUserFullname();
      setFullname(name);
    };

    fetchFullname();
  }, []);

  const onMoreClick = (item) => {
    setTask(item);
    setMoreModal(true);
  };

  const renderTask = ({ item }) => {
    return (
      <Task
        title={item.title}
        description={item.description}
        category={item.category}
        priority={item.priority}
        date={item.date}
        onMoreClick={() => onMoreClick(item)}
      />
    );
  };

  const Filter = ({ title, onCheck }) => {
    return (
      <View className="flex-row items-baseline w-full justify-between mt-5">
        <Text style={{ color: "#575757" }} className="text-sm">
          {title}
        </Text>
        <View>
          <BouncyCheckbox
            isChecked={
              categoryFilter.includes(title) || priorityFilter.includes(title)
            }
            size={24}
            style={{ marginBottom: 28, marginEnd: 5 }}
            fillColor="#D7D7D7"
            unFillColor="#FFFFFF"
            innerIconStyle={{
              borderColor: "#D7D7D7",
              borderRadius: 6,
            }}
            textStyle={{
              textDecorationLine: "none",
            }}
            iconStyle={{ borderRadius: 6 }}
            onPress={(isChecked) => {
              onCheck();
            }}
          />
        </View>
      </View>
    );
  };

  const Sorter = ({ title, onCheck }) => {
    return (
      <View className="flex-row items-baseline w-full justify-between mt-5">
        <Text style={{ color: "#575757" }} className="text-sm">
          {title}
        </Text>
        <View>
          <BouncyCheckbox
            isChecked={sorter.includes(title)}
            size={24}
            style={{ marginBottom: 28, marginEnd: 5 }}
            fillColor="#D7D7D7"
            unFillColor="#FFFFFF"
            innerIconStyle={{
              borderColor: "#D7D7D7",
              borderRadius: 60,
            }}
            textStyle={{
              textDecorationLine: "none",
            }}
            iconStyle={{ borderRadius: 60 }}
            onPress={(isChecked) => {
              onCheck();
            }}
          />
        </View>
      </View>
    );
  };

  const toggleCategory = (category) => {
    setCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const togglePriority = (priority) => {
    setPriorityFilter((prev) =>
      prev.includes(priority)
        ? prev.filter((pri) => pri !== priority)
        : [...prev, priority]
    );
  };
  return (
    <View className="flex-1 p-5 pt-8 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-semibold text-lg text-primary">
            Welcome Back!
          </Text>
          <Text className="font-semibold text-2xl text-black">{fullname}</Text>
        </View>
        <View className="rounded-full bg-black  justify-center items-center h-12 w-12">
          <Text className="font-semibold text-2xl text-white">
            {Array.from(fullname || "")[0]}
          </Text>
        </View>
      </View>
      {/* Search box */}
      <Input
        iconLeft={<SearchIcon />}
        placeholder={"Search tasks"}
        onChangeText={setSearchText}
        value={searchText}
      />
      {/* ---- */}
      <View>
        <View className="flex-row justify-between mt-8 items-center">
          <Text className="text-black font-semibold text-2xl">
            {tasks?.length || 0} Tasks
          </Text>
          <TouchableOpacity
            className="bg-grey p-3 rounded-2xl "
            onPress={() => setModalVisible(true)}
          >
            <Text className="font-semibold text-base text-black">
              Add new Tasks <Text className="text-2xl font-normal"> +</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mt-3 mb-5 items-center">
          <TouchableOpacity
            onPress={() => setSortModal(true)}
            className="flex-row justify-between items-center flex-1 mr-3 p-4 rounded-2xl h-14 border-solid border border-grey"
          >
            <Text>Sort by: {selectedSort}</Text>
            <ArrowDown />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterModal(true)}
            className="flex h-14 w-14 justify-center items-center rounded-2xl bg-primary"
          >
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading || isLoadingAdd || isLoadingEdit ? (
        <ActivityIndicator />
      ) : (
        <View className="flex-1">
          {tasks?.length > 0 && (
            <FlatList
              data={tasks}
              renderItem={renderTask}
              keyExtractor={(task) => task.id}
              ItemSeparatorComponent={<View className="mt-6" />}
            />
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        statusBarTranslucent
        presentationStyle="overFullScreen"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TaskModal
          item={task}
          editTask={editTask}
          addTask={addTask}
          setModalVisible={setModalVisible}
          setTask={setTask}
        />
      </Modal>
      <Overlay
        visible={moreModal}
        onClose={() => {
          setMoreModal(false);
          setTask("");
        }}
        closeOnTouchOutside
        containerStyle={{
          justifyContent: "flex-end",
          backgroundColor: "rgba(1, 64, 66, 0.8)",
          paddingBottom: 50,
        }}
        childrenWrapperStyle={{ borderRadius: 16 }}
      >
        <MoreModal
          setModalVisible={setModalVisible}
          setTask={setTask}
          task={task}
          setMoreModal={setMoreModal}
          deleteTask={deleteTask}
        />
      </Overlay>
      <Overlay
        visible={filterModal}
        onClose={() => {
          setFilterModal(false);
        }}
        closeOnTouchOutside
        containerStyle={{
          justifyContent: "flex-end",
          backgroundColor: "rgba(1, 64, 66, 0.8)",
          padding: 0,
        }}
        childrenWrapperStyle={{
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          alignItems: "flex-start",
        }}
      >
        <View className="w-full">
          <Text className="font-semibold text-primary text-lg mb-5">
            Filter By
          </Text>
          <Text className="text-darkBlue font-semibold text-lg">Category</Text>
          <View>
            <Filter title="All" onCheck={() => toggleCategory("All")} />
            <Filter
              title="Back-end"
              onCheck={() => toggleCategory("Back-end")}
            />
            <Filter
              title="Front-end"
              onCheck={() => toggleCategory("Front-end")}
            />
            <Filter title="DevOps" onCheck={() => toggleCategory("DevOps")} />
            <Filter title="UI/UX" onCheck={() => toggleCategory("UI/UX")} />
          </View>
          <Text className="text-darkBlue font-semibold text-lg mt-5">
            Priority
          </Text>
          <View className="mb-5">
            <Filter title="High" onCheck={() => togglePriority("High")} />
            <Filter title="Mid" onCheck={() => togglePriority("Mid")} />
            <Filter title="Low" onCheck={() => togglePriority("Low")} />
          </View>
          <Button
            text="Apply"
            onClick={() => {
              setCategories(categoryFilter);
              setPriorities(priorityFilter);
              setFilterModal(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setCategoryFilter(categories);
              setPriorityFilter(priorities);
              setFilterModal(false);
            }}
            className="items-center text-black font-medium text-base mt-5"
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        visible={sortModal}
        onClose={() => {
          setSortModal(false);
        }}
        se
        closeOnTouchOutside
        containerStyle={{
          justifyContent: "flex-end",
          backgroundColor: "rgba(1, 64, 66, 0.8)",
          padding: 0,
        }}
        childrenWrapperStyle={{
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          alignItems: "flex-start",
        }}
      >
        <View className="w-full">
          <Text className="font-semibold text-primary text-lg mb-3">
            Sort By
          </Text>
          <View className="mb-5">
            <Sorter
              title="A-Z Ascending"
              onCheck={() => setSorter("A-Z Ascending")}
            />
            <Sorter
              title="Z-A Descending"
              onCheck={() => setSorter("Z-A Descending")}
            />
            <Sorter title="Due-Date" onCheck={() => setSorter("Due-Date")} />
            <Sorter
              title="Priority High-Low"
              onCheck={() => setSorter("Priority High-Low")}
            />
            <Sorter
              title="Priority Low-High"
              onCheck={() => setSorter("Priority Low-High")}
            />
          </View>

          <Button
            text="Apply"
            onClick={() => {
              setSelectedSort(sorter);
              setSortModal(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSorter(selectedSort);
              setSortModal(false);
            }}
            className="items-center text-black font-medium text-base mt-5"
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
}

export default MainScreen;
