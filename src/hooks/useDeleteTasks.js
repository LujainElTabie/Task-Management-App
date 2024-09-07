import { deleteDoc, doc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { FIRESTORE_DB } from "../../FirebaseConfig";

const deleteTask = async (taskId) => {
  const taskRef = doc(FIRESTORE_DB, "tasks", taskId);
  await deleteDoc(taskRef);
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {},
  });
};
