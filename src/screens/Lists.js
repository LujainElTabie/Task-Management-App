import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FIRESTORE_DB } from "../../FirebaseConfig";

const List = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(todos);
      },
    });

    // // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "todos"), {
        title: todo,
        done: false,
      });
      setTodo("");
    } catch (e) {}
  };

  const renderTodo = ({ item }) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && <Text>done</Text>}
          {!item.done && <Text>Not done</Text>}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </View>

      {todos.length > 0 && (
        <View>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(todo) => todo.id}
            // removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  todo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
  },
});

export default List;
