import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Settings.css";

import { useTheme } from "../../context/ThemeContext";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const { darkMode, setDarkMode } = useTheme();

 const {
  currentUser,
  refreshCurrentUser,
} = useAuth();

  const { changePassword } = useAdmin();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (currentPassword !== currentUser.password) {
      alert("Current Password is incorrect.");
      return;
    }

    if (newPassword.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

try {
  await changePassword(currentUser.id, newPassword);

  refreshCurrentUser();

  alert("Password Updated Successfully.");

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
} catch (error) {
  console.error(error);
  alert("Failed to update password.");
}
  };

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
              value={currentUser?.name || ""}
              disabled
            />

            <input
              type="email"
              value={currentUser?.email || ""}
              disabled
            />

            <button className="save-btn" disabled>
              Profile Locked
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
                <input type="checkbox" defaultChecked />

                <span className="slider"></span>
              </label>
            </div>

            <div className="switch-row">
              <span>Desktop Notification</span>

              <label className="switch">
                <input type="checkbox" />

                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Security */}

          <div className="setting-card">
            <h2>🔒 Security</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              className="save-btn"
              onClick={handlePasswordChange}
            >
              Update Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;