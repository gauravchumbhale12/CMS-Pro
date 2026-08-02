import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";
import Admins from "./pages/Admins/Admins";

import { useAuth } from "./context/AuthContext";
import ProjectSheet from "./pages/ProjectSheet/ProjectSheet";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute permission="dashboard">
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/projects"
  element={
    <ProtectedRoute permission="projects">
      <Projects />
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks"
  element={
    <ProtectedRoute permission="tasks">
      <Tasks />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute permission="reports">
      <Reports />
    </ProtectedRoute>
  }
/>

<Route
  path="/admins"
  element={
    <ProtectedRoute permission="admins">
      <Admins />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute permission="settings">
      <Settings />
    </ProtectedRoute>
    
          }
        />


        <Route
  path="/project-sheet/:id"
  element={<ProjectSheet />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;