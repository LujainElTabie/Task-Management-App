import { collection, onSnapshot, query } from "firebase/firestore";
import { useQuery } from "react-query";
import { FIRESTORE_DB } from "../../FirebaseConfig";

const fetchTasks = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const {
    categories = [],
    priorities = [],
    searchText = "",
    selectedSort = "",
  } = filters || {};

  let tasksQuery = query(collection(FIRESTORE_DB, "tasks"));

  const filterTasks = (
    tasks,
    categories,
    priorities,
    searchText = "",
    selectedSort = ""
  ) => {
    let filteredTasks = tasks;
    let filteredCat = categories;
    let filteredPrio = priorities;

    if (categories.length > 0)
      filteredCat = tasks.filter((i) => categories.includes(i.category));

    if (priorities.length > 0)
      filteredPrio = tasks.filter((i) => priorities.includes(i.priority));

    if (filteredCat.length > 0 && filteredPrio.length > 0)
      filteredTasks = filteredCat.filter((value) =>
        filteredPrio.includes(value)
      );
    else if (filteredCat.length > 0) {
      filteredTasks = filteredCat;
    } else if (filteredPrio.length > 0) {
      filteredTasks = filteredPrio;
    } else {
      filteredTasks = tasks;
    }

    if (searchText != "") {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchText.toLowerCase()) ||
          task.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedSort === "Due-Date") {
      filteredTasks = filteredTasks.sort(
        (a, b) => new Date(a.date.toDate()) - new Date(b.date.toDate())
      );
    } else if (selectedSort === "A-Z Ascending") {
      filteredTasks = filteredTasks.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (selectedSort === "Z-A Descending") {
      filteredTasks = filteredTasks.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (selectedSort === "Priority High-Low") {
      const high = filteredTasks.filter((i) => i.priority === "High");
      const mid = filteredTasks.filter((i) => i.priority === "Mid");
      const low = filteredTasks.filter((i) => i.priority === "Low");

      filteredTasks = [...high, ...mid, ...low];
    } else if (selectedSort === "Priority Low-High") {
      const high = filteredTasks.filter((i) => i.priority === "High");
      const mid = filteredTasks.filter((i) => i.priority === "Mid");
      const low = filteredTasks.filter((i) => i.priority === "Low");

      filteredTasks = [...low, ...mid, ...high];
    }

    return filteredTasks;
  };

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        let tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        tasks = filterTasks(
          tasks,
          categories,
          priorities,
          searchText,
          selectedSort
        );
        resolve(tasks);
      },
      reject
    );

    return () => unsubscribe();
  });
};

export const useTasks = (filters) => {
  return useQuery(["tasks", filters], fetchTasks, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    keepPreviousData: true,
  });
};
