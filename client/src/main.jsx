import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "react-calendar/dist/Calendar.css";

import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <NotificationProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </NotificationProvider>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  </AdminProvider>
);