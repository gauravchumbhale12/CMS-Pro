import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {

  const [notifications, setNotifications] = useState([]);

  // Add / Update Notification
  const addNotification = (task) => {

    setNotifications((prev) => {

      // आधीची notification remove करा
      const filtered = prev.filter(
        (item) => item.id !== task.id
      );

      // Completed असेल तर Notification remove
      if (task.status === "Completed") {
        return filtered;
      }

      // Pending / In Progress Notification
      return [
        {
          id: task.id,

          message:
            task.status === "Pending"
              ? `🟡 ${task.name}`
              : `🔵 ${task.name}`,

          project: task.project,

          status: task.status,

          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },

        ...filtered,
      ];

    });

  };

  // Remove Notification
  const removeNotification = (id) => {

    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );

  };

  return (

    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>

  );

}

export const useNotification = () =>
  useContext(NotificationContext);