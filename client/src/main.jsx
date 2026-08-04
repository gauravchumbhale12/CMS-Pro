import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import "react-calendar/dist/Calendar.css";

import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { TemplateProvider } from "./context/TemplateContext";
import { ProjectProvider } from "./context/ProjectContext";
import { ProjectWorkProvider } from "./context/ProjectWorkContext";
import { TaskProvider } from "./context/TaskContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AdminProvider>

    <AuthProvider>

      <TemplateProvider>

        <ProjectProvider>

          <ProjectWorkProvider>

            <TaskProvider>

              <NotificationProvider>

                <ThemeProvider>

                  <App />

                </ThemeProvider>

              </NotificationProvider>

            </TaskProvider>

          </ProjectWorkProvider>

        </ProjectProvider>

      </TemplateProvider>

    </AuthProvider>

  </AdminProvider>
);