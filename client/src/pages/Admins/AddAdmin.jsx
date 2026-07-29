import { useState } from "react";
import "./AddAdmin.css";
import { useAdmin } from "../../context/AdminContext";

function AddAdmin({ onAdd }) {
  const { admins } = useAdmin();

  const [open, setOpen] = useState(false);

  const [admin, setAdmin] = useState({
    id: Date.now(),
    name: "",
    email: "",
    password: "",
    role: "Admin",
    status: "Active",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      admin.name.trim() === "" ||
      admin.email.trim() === "" ||
      admin.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // Duplicate Email Check
    const exists = admins.find(
      (item) =>
        item.email.toLowerCase() ===
        admin.email.toLowerCase()
    );

    if (exists) {
      alert("Email already exists.");
      return;
    }

    onAdd({
      ...admin,
      id: Date.now(),
    });

    alert("Admin Added Successfully");

    setAdmin({
      id: Date.now(),
      name: "",
      email: "",
      password: "",
      role: "Admin",
      status: "Active",
    });

    setOpen(false);
  };

  return (
    <>
      <button
        className="add-admin-btn"
        onClick={() => setOpen(true)}
      >
        + Add Admin
      </button>

      {open && (
        <div className="popup">
          <div className="popupBox">
            <h2>Add Admin</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={admin.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={admin.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={admin.password}
              onChange={handleChange}
            />

            <select
              name="role"
              value={admin.role}
              onChange={handleChange}
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Super Admin</option>
            </select>

            <select
              name="status"
              value={admin.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div className="buttons">
              <button
                className="saveBtn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancelBtn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddAdmin;