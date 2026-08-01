import "./Navbar.css";

import {
  FaBell,
  FaUserCircle,
  FaCamera,
} from "react-icons/fa";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const [time, setTime] = useState(new Date());

  const [showPanel, setShowPanel] =
    useState(false);

  const fileInputRef = useRef(null);

  const { notifications } =
    useNotification();

  const {
    currentUser,
    logout,
    refreshCurrentUser,
  } = useAuth();

  const {
    updateProfilePhoto,
  } = useAdmin();

  const navigate = useNavigate();

  // ===========================
  // Live Clock
  // ===========================

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    },1000);

    return () => clearInterval(timer);

  },[]);

  // ===========================
  // Upload Profile Photo
  // ===========================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Please select an image.");

      return;

    }

    const reader = new FileReader();

    reader.onloadend = async () => {

      try{

        await updateProfilePhoto(

          currentUser.id,

          reader.result

        );

        refreshCurrentUser();

        alert(
          "Profile Photo Updated Successfully."
        );

      }

      catch(error){

        console.error(error);

        alert(
          "Failed to update profile photo."
        );

      }

    };

    reader.readAsDataURL(file);

  };

  // ===========================
  // Logout
  // ===========================

  const handleLogout = () => {

    logout();

    navigate("/");

  };
  return (
  <div className="navbar">

    {/* ===========================
        Live Clock
    =========================== */}

    <div className="live-clock">

      <h2>
        {time.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </h2>

      <p>
        {time.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

    </div>

    {/* ===========================
        Right Side
    =========================== */}

    <div className="nav-right">

      {/* Profile */}

      <div className="profile">

        <div
          className="profile-image-box"
          onClick={() =>
            fileInputRef.current.click()
          }
        >

          {currentUser?.photo ? (

            <img
              src={currentUser.photo}
              alt="Profile"
              className="profile-image"
            />

          ) : (

            <FaUserCircle className="profile-icon" />

          )}

          <div className="camera-icon">
            <FaCamera />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

        </div>

        <div className="profile-text">

          <h4>
            {currentUser?.name || "Guest"}
          </h4>

          <p>
            {currentUser?.role || ""}
          </p>

        </div>

      </div>

      {/* Notification */}

      <div
        className="notification-box"
        onClick={() =>
          setShowPanel(!showPanel)
        }
      >

        <FaBell className="icon" />

        {notifications.length > 0 && (

          <span className="notification-badge">

            {notifications.length}

          </span>

        )}

        {showPanel && (

          <div className="notification-panel">

            <h4>Notifications</h4>

            {notifications.length === 0 ? (

              <p className="empty">

                No Notifications

              </p>

            ) : (

              notifications.map((item) => (

                <div
                  key={item.id}
                  className="notification-item"
                >

                  <strong>

                    {item.message}

                  </strong>

                  <small>

                    {item.time}

                  </small>

                </div>

              ))

            )}

          </div>

        )}

      </div>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >

        Logout

      </button>

    </div>

  </div>
);

}

export default Navbar;