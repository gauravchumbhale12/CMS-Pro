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

function Navbar() {

  const [profileImage, setProfileImage] = useState("");
  const [time, setTime] = useState(new Date());

  const [showPanel, setShowPanel] = useState(false);

  const { notifications } = useNotification();

  const fileInputRef = useRef(null);

  useEffect(() => {

    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setProfileImage(reader.result);

      localStorage.setItem(
        "profileImage",
        reader.result
      );

    };

    reader.readAsDataURL(file);

  };

  return (

    <div className="navbar">

      {/* Live Clock */}

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

      {/* Right Side */}

      <div className="nav-right">

        <div className="profile">

          <div
            className="profile-image-box"
            onClick={() =>
              fileInputRef.current.click()
            }
          >

            {profileImage ? (

              <img
                src={profileImage}
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

            <h4>Admin</h4>

            <p>Administrator</p>

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

      </div>

    </div>

  );

}

export default Navbar;