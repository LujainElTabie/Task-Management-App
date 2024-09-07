import { addDoc, collection } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { FIRESTORE_DB } from "../../FirebaseConfig";

const addTask = async (task) => {
  await addDoc(collection(FIRESTORE_DB, "tasks"), task);
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {},
  });
};
