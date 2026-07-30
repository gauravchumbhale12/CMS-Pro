import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // ============================
  // ADD / UPDATE NOTIFICATION
  // ============================

  const addNotification = (task) => {
    setNotifications((prev) => {
      // त्या Task ची जुनी Notification Remove
      const filtered = prev.filter(
        (item) => item.taskId !== task.id
      );

      // Completed असेल तर Notification ठेवू नका
      if (task.status === "Completed") {
        return filtered;
      }

      const notification = {
        id: Date.now() + Math.random(),

        taskId: task.id,

        projectId: task.projectId,

        project: task.project,

        taskName: task.name,

        priority: task.priority,

        status: task.status,

        message:
          task.status === "Pending"
            ? `🟡 ${task.name}`
            : `🔵 ${task.name}`,

        time: new Date().toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        ),
      };

      return [notification, ...filtered];
    });
  };

  // ============================
  // REMOVE SINGLE TASK NOTIFICATION
  // ============================

  const removeNotification = (taskId) => {
    setNotifications((prev) =>
      prev.filter(
        (item) => item.taskId !== taskId
      )
    );
  };

  // ============================
  // REMOVE ALL NOTIFICATIONS OF PROJECT
  // ============================

  const removeProjectNotifications = (
    projectId
  ) => {
    setNotifications((prev) =>
      prev.filter(
        (item) =>
          Number(item.projectId) !==
          Number(projectId)
      )
    );
  };

  // ============================
  // CLEAR ALL NOTIFICATIONS
  // ============================

  const clearNotifications = () => {
    setNotifications([]);

    localStorage.removeItem(
      "notifications"
    );
  };
  

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        removeProjectNotifications,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () =>
  useContext(NotificationContext);