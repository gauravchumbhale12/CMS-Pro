import { useState } from "react";
import "./AddProject.css";

function AddProject({ onAdd }) {
  const [open, setOpen] = useState(false);

  const [project, setProject] = useState({
    id: "",
    name: "",
    client: "",
    status: "Pending",
    priority: "Medium",
    progress: 0,
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      project.id.trim() === "" ||
      project.name.trim() === "" ||
      project.client.trim() === "" ||
      project.start === "" ||
      project.end === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    await onAdd({
      id: project.id,
      name: project.name,
      client: project.client,
      status: project.status,
      priority: project.priority,
      progress: Number(project.progress),
      start: project.start,
      end: project.end,
    });

    alert("Project Added Successfully");

    setProject({
      id: "",
      name: "",
      client: "",
      status: "Pending",
      priority: "Medium",
      progress: 0,
      start: "",
      end: "",
    });

    setOpen(false);
  };

  return (
    <>
      <button
        className="openBtn"
        onClick={() => setOpen(true)}
      >
        ➕ Add Project
      </button>

      {open && (
        <div className="popup">
          <div className="popupBox">

            <h2>📁 Add New Project</h2>

            <input
              type="number"
              name="id"
              placeholder="Project ID"
              value={project.id}
              onChange={handleChange}
            />

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={project.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="client"
              placeholder="Client Name"
              value={project.client}
              onChange={handleChange}
            />

            <select
              name="status"
              value={project.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              name="priority"
              value={project.priority}
              onChange={handleChange}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

           

            <input
              type="date"
              name="start"
              value={project.start}
              onChange={handleChange}
            />

            <input
              type="date"
              name="end"
              value={project.end}
              onChange={handleChange}
            />

            <div className="buttons">

              <button
                className="saveBtn"
                onClick={handleSave}
              >
                💾 Save
              </button>

              <button
                className="cancelBtn"
                onClick={() => setOpen(false)}
              >
                ✖ Cancel
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default AddProject;