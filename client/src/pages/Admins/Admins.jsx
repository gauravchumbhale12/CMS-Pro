import "./Admins.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";

function Admins() {
  const {
    admins,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    toggleStatus,
  } = useAdmin();

  const { currentUser } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          background: "#020617",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Navbar />

        <div className="admins-header">
          <h1>👥 Admin Management</h1>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search Admin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {currentUser.role === "Super Admin" && (
              <AddAdmin onAdd={addAdmin} />
            )}
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>

              {currentUser.role === "Super Admin" && (
                <th>Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    currentUser.role === "Super Admin"
                      ? 6
                      : 5
                  }
                  style={{
                    textAlign: "center",
                    padding: "25px",
                    color: "#94a3b8",
                  }}
                >
                  No Admin Found
                </td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>

                  <td>{admin.name}</td>

                  <td>{admin.email}</td>

                  <td>{admin.role}</td>

                  <td>
                    {currentUser.role ===
                    "Super Admin" ? (
                      <button
                        className={
                          admin.status === "Active"
                            ? "activeBtn"
                            : "inactiveBtn"
                        }
                        onClick={() =>
                          toggleStatus(admin.id)
                        }
                      >
                        {admin.status}
                      </button>
                    ) : (
                      <span>{admin.status}</span>
                    )}
                  </td>

                  {currentUser.role ===
                    "Super Admin" && (
                    <td>
                      <button
                        className="editBtn"
                        onClick={() =>
                          setSelectedAdmin(admin)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="deleteBtn"
                        onClick={() =>
                          deleteAdmin(admin.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedAdmin && (
          <EditAdmin
            admin={selectedAdmin}
            onUpdate={updateAdmin}
            onClose={() =>
              setSelectedAdmin(null)
            }
          />
        )}
      </div>
    </div>
  );
}

export default Admins;