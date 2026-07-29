import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaUsersCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const permissions =
    currentUser.role === "Super Admin"
      ? {
          dashboard: true,
          projects: true,
          tasks: true,
          reports: true,
          admins: true,
          settings: true,
        }
      : currentUser.permissions || {
          dashboard: true,
        };

  return (
    <div className="sidebar">
      <h1 className="logo">CMS Pro</h1>

      <nav>

        {permissions.dashboard && (
          <NavLink to="/dashboard" className="menu">
            🏠 <span>Dashboard</span>
          </NavLink>
        )}

        {permissions.projects && (
          <NavLink to="/projects" className="menu">
            📁 <span>Projects</span>
          </NavLink>
        )}

        {permissions.tasks && (
          <NavLink to="/tasks" className="menu">
            ✅ <span>Tasks</span>
          </NavLink>
        )}

        {permissions.reports && (
          <NavLink to="/reports" className="menu">
            📊 <span>Reports</span>
          </NavLink>
        )}

        {permissions.admins && (
          <NavLink to="/admins" className="menu">
            <FaUsersCog />
            <span>Admins</span>
          </NavLink>
        )}

        {permissions.settings && (
          <NavLink to="/settings" className="menu">
            ⚙️ <span>Settings</span>
          </NavLink>
        )}

      </nav>
    </div>
  );
}

export default Sidebar;