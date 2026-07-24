import "./Navbar.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">

      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search projects, employees..." />
      </div>

      <div className="nav-right">

        <FaBell className="icon" />

        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;