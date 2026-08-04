import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import ProjectSheet from "./pages/ProjectSheet/ProjectSheet";
import Tasks from "./pages/Tasks/Tasks";
import Reports from "./pages/Reports/Reports";
import Admins from "./pages/Admins/Admins";
import Settings from "./pages/Settings/Settings";
import ManufacturingTemplate from "./pages/ManufacturingTemplate/ManufacturingTemplate";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({
  children,
  superAdminOnly = false,
}) {

  const { currentUser } = useAuth();

  // Login नसल्यास Login Page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // फक्त Super Admin ला Access
  if (
    superAdminOnly &&
    currentUser.role !== "Super Admin"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;

}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Projects */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* Project Sheet */}

        <Route
          path="/project-sheet/:id"
          element={
            <ProtectedRoute>
              <ProjectSheet />
            </ProtectedRoute>
          }
        />

        {/* Tasks */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* Reports */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Manufacturing Template - Super Admin Only */}

        <Route
          path="/manufacturing-template"
          element={
            <ProtectedRoute superAdminOnly>
              <ManufacturingTemplate />
            </ProtectedRoute>
          }
        />

        {/* Admins */}

        <Route
          path="/admins"
          element={
            <ProtectedRoute superAdminOnly>
              <Admins />
            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute superAdminOnly>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Invalid Route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;