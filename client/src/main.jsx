import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationProvider } from "./context/NotificationContext";

import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import "react-calendar/dist/Calendar.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <ThemeProvider>
    <NotificationProvider>

      <ProjectProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ProjectProvider>

    </NotificationProvider>
  </ThemeProvider>
</React.StrictMode>
);