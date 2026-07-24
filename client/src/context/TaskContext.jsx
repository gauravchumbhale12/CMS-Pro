import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState(() => {

    const saved = localStorage.getItem("tasks");

    if (saved) {
      return JSON.parse(saved);
    }

    return [];

  });

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  const addTask = (task) => {

    setTasks((prev) => [...prev, task]);

  };

  const updateTask = (updatedTask) => {

    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

  };

  const deleteTask = (id) => {

    setTasks(tasks.filter((task) => task.id !== id));

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