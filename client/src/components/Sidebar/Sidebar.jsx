import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h1 className="logo">CMS Pro</h1>

      <nav>

        <NavLink to="/dashboard" className="menu">
          🏠 <span>Dashboard</span>
        </NavLink>

        <NavLink to="/projects" className="menu">
          📁 <span>Projects</span>
        </NavLink>


        <NavLink to="/tasks" className="menu">
          ✅ <span>Tasks</span>
        </NavLink>

        <NavLink to="/reports" className="menu">
          📊 <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className="menu">
          ⚙️ <span>Settings</span>
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;