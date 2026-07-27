import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Settings.css";
import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
  background: "var(--bg)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Navbar />

        <h1 className="settings-title">⚙️ Settings</h1>

        <div className="settings-grid">

          {/* Profile */}

          <div className="setting-card">
            <h2>👤 Profile</h2>

            <input
              type="text"
              placeholder="Admin Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <button className="save-btn">
              Save Profile
            </button>
          </div>

          {/* Appearance */}

          <div className="setting-card">
            <h2>🎨 Appearance</h2>

            <div className="switch-row">
              <span>Dark Mode</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />

                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Notifications */}

          <div className="setting-card">
            <h2>🔔 Notifications</h2>

            <div className="switch-row">
              <span>Email Notification</span>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />

                <span className="slider"></span>
              </label>
            </div>

            <div className="switch-row">
              <span>Desktop Notification</span>

              <label className="switch">
                <input
                  type="checkbox"
                />

                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Security */}

          <div className="setting-card">
            <h2>🔒 Security</h2>

            <input
              type="password"
              placeholder="New Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <button className="save-btn">
              Update Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;