import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // ===========================
  // Add Task
  // ===========================
  const addTask = (task) => {
    setTasks((prev) => {
      // Duplicate ID असेल तर नवीन ID द्या
      const exists = prev.some(
        (t) => t.id === task.id
      );

      const newTask = exists
        ? {
            ...task,
            id:
              Date.now() +
              Math.floor(Math.random() * 10000),
          }
        : task;

      return [...prev, newTask];
    });
  };

  // ===========================
  // Update Only Selected Task
  // ===========================
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );
  };

  // ===========================
  // Delete Only Selected Task
  // ===========================
  const deleteTask = (id) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);