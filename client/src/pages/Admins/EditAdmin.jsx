import { useState, useEffect } from "react";
import "./AddAdmin.css";

function EditAdmin({ admin, onUpdate, onClose }) {
  const [data, setData] = useState(admin);

  useEffect(() => {
    setData(admin);
  }, [admin]);

  if (!admin) return null;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermission = (e) => {
    setData({
      ...data,
      permissions: {
        ...data.permissions,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleSave = () => {
    onUpdate(data);
    alert("Admin Updated Successfully");
    onClose();
  };

  return (
    <div className="popup">
      <div className="popupBox">

        <h2>Edit Admin</h2>

        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <input
          type="text"
          value={data.role}
          readOnly
        />

        <select
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {data.role !== "Super Admin" && (
          <>
            <h3 style={{ marginTop: "20px" }}>
              Permissions
            </h3>

            <label>
              <input
                type="checkbox"
                name="dashboard"
                checked={data.permissions?.dashboard || false}
                onChange={handlePermission}
              />
              Dashboard
            </label>

            <label>
              <input
                type="checkbox"
                name="projects"
                checked={data.permissions?.projects || false}
                onChange={handlePermission}
              />
              Projects
            </label>

            <label>
              <input
                type="checkbox"
                name="tasks"
                checked={data.permissions?.tasks || false}
                onChange={handlePermission}
              />
              Tasks
            </label>

            <label>
              <input
                type="checkbox"
                name="reports"
                checked={data.permissions?.reports || false}
                onChange={handlePermission}
              />
              Reports
            </label>

            <label>
              <input
                type="checkbox"
                name="settings"
                checked={data.permissions?.settings || false}
                onChange={handlePermission}
              />
              Settings
            </label>

            <label>
              <input
                type="checkbox"
                name="admins"
                checked={data.permissions?.admins || false}
                onChange={handlePermission}
              />
              Admin Management
            </label>
          </>
        )}

        <div className="buttons">

          <button
            className="saveBtn"
            onClick={handleSave}
          >
            Update
          </button>

          <button
            className="cancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditAdmin;