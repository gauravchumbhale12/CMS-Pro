import { useState, useEffect } from "react";
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

  const {
    admins,
    changePassword,
    updateProfile,
  } = useAdmin();

  // -----------------------------
  // Tabs
  // -----------------------------

  const [activeTab, setActiveTab] =
    useState("profile");

  // -----------------------------
  // Profile
  // -----------------------------

  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  // Future

  const [phone, setPhone] =
    useState("");

  const [company, setCompany] =
    useState("");

  // -----------------------------
  // Password
  // -----------------------------

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  // -----------------------------
  // Load User
  // -----------------------------

  useEffect(() => {

    if (!currentUser) return;

    setName(currentUser.name || "");

    setEmail(currentUser.email || "");

    setPhone(
      currentUser.phone || ""
    );

    setCompany(
      currentUser.company || ""
    );

  }, [currentUser]);

  // -----------------------------
  // Save Profile
  // -----------------------------

  const handleProfileSave =
    async () => {

      if (!name.trim()) {

        alert("Enter Name");

        return;

      }

      if (!email.trim()) {

        alert("Enter Email");

        return;

      }

      const emailExists =
        admins.find(
          (admin) =>
            admin.email
              .toLowerCase()
              .trim() ===
              email
                .toLowerCase()
                .trim() &&
            admin.id !==
              currentUser.id
        );

      if (emailExists) {

        alert(
          "Email already exists."
        );

        return;

      }

      try {

        await updateProfile(

          currentUser.id,

          name.trim(),

          email.trim()

        );

        refreshCurrentUser();

        alert(
          "Profile Updated Successfully."
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to Update Profile."
        );

      }

    };

  // -----------------------------
  // Change Password
  // -----------------------------

  const handlePasswordChange =
    async () => {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {

        alert(
          "Please fill all fields."
        );

        return;

      }

      if (
        currentPassword !==
        currentUser.password
      ) {

        alert(
          "Current Password Incorrect."
        );

        return;

      }

      if (
        newPassword.length < 4
      ) {

        alert(
          "Password minimum 4 characters."
        );

        return;

      }

      if (
        newPassword !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match."
        );

        return;

      }

      try {

        await changePassword(

          currentUser.id,

          newPassword

        );

        refreshCurrentUser();

        alert(
          "Password Updated Successfully."
        );

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

      } catch (err) {

        console.log(err);

        alert(
          "Failed to Update Password."
        );

      }

    };

  return (<div style={{ display: "flex" }}>
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

    {/* Premium Header */}


    {/* Tabs */}

    <div className="settings-tabs">

      <button
        className={
          activeTab === "profile"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("profile")
        }
      >
        👤 Profile
      </button>

      <button
        className={
          activeTab === "security"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("security")
        }
      >
        🔒 Security
      </button>

      <button
        className={
          activeTab === "appearance"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("appearance")
        }
      >
        🎨 Appearance
      </button>

      <button
        className={
          activeTab === "notification"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("notification")
        }
      >
        🔔 Notification
      </button>

      <button
        className={
          activeTab === "backup"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("backup")
        }
      >
        💾 Backup
      </button>

    </div>

    <div className="settings-content">

      {/* PROFILE */}

      {activeTab === "profile" && (

        <div className="setting-card">

          <h2>👤 Profile</h2>

          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          />

          <button
            className="save-btn"
            onClick={handleProfileSave}
          >
            Save Profile
          </button>

        </div>

      )}

      {/* SECURITY */}

      {activeTab === "security" && (

        <div className="setting-card">

          <h2>🔒 Security</h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            className="save-btn"
            onClick={handlePasswordChange}
          >
            Update Password
          </button>

        </div>

      )}
            {/* APPEARANCE */}

      {activeTab === "appearance" && (

        <div className="setting-card">

          <h2>🎨 Appearance</h2>

          <div className="switch-row">

            <span>Dark Mode</span>

            <label className="switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          <br />

          <h3>Theme</h3>

          <div className="theme-colors">

            <button className="blue"></button>

            <button className="green"></button>

            <button className="orange"></button>

            <button className="purple"></button>

          </div>

        </div>

      )}

      {/* NOTIFICATION */}

      {activeTab === "notification" && (

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

          <div className="switch-row">

            <span>Task Notification</span>

            <label className="switch">

              <input
                type="checkbox"
                defaultChecked
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>

      )}

      {/* BACKUP */}

      {activeTab === "backup" && (

        <div className="setting-card">

          <h2>💾 Backup & Restore</h2>

          <button className="save-btn">

            📁 Export Projects

          </button>

          <button className="save-btn">

            📋 Export Tasks

          </button>

          <button className="save-btn">

            ☁ Backup Data

          </button>

          <button className="save-btn">

            ♻ Restore Backup

          </button>

        </div>

      )}

    </div>

  </div>

</div>

  );

}

export default Settings;