import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaUsersCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-icon.png";

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
    <aside className="sidebar">

      {/* =========================
          COMPANY LOGO
      ========================= */}

      <div className="sidebar-logo">

        <img
          src={logo}
          alt="Om-Sai Logo"
        />

        <h2>OM-SAI</h2>

        <p>Moulds & Plastics</p>

      </div>

    

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav>

        {permissions.dashboard && (
          <NavLink to="/dashboard" className="menu">
            <span className="menu-icon">🏠</span>
            <span>Dashboard</span>
          </NavLink>
        )}

        {permissions.projects && (
          <NavLink to="/projects" className="menu">
            <span className="menu-icon">📁</span>
            <span>Projects</span>
          </NavLink>
        )}

        {permissions.tasks && (
          <NavLink to="/tasks" className="menu">
            <span className="menu-icon">✅</span>
            <span>Tasks</span>
          </NavLink>
        )}

        {permissions.reports && (
          <NavLink to="/reports" className="menu">
            <span className="menu-icon">📊</span>
            <span>Reports</span>
          </NavLink>
        )}

        {permissions.admins && (
          <NavLink to="/admins" className="menu">
            <span className="menu-icon">
              <FaUsersCog />
            </span>

            <span>Admins</span>
          </NavLink>
        )}

        {permissions.settings && (
          <NavLink to="/settings" className="menu">
            <span className="menu-icon">⚙️</span>
            <span>Settings</span>
          </NavLink>
        )}

      </nav>

    </aside>
  );
}

export default Sidebar;