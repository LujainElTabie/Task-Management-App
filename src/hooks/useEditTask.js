import { doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { FIRESTORE_DB } from "../../FirebaseConfig";

const editTask = async ({ id, task }) => {
  const taskRef = doc(FIRESTORE_DB, "tasks", id);
  await updateDoc(taskRef, task);
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation(editTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {},
  });
};
