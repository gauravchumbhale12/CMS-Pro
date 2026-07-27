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

  const handleSave = () => {
    if (
      project.id === "" ||
      project.name === "" ||
      project.client === "" ||
      project.start === "" ||
      project.end === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    onAdd({
      ...project,
      id: Number(project.id),
      progress: Number(project.progress),
    });

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

            <div className="progressBox">

              <label>
                Progress : {project.progress}%
              </label>

              <input
                type="range"
                min="0"
                max="100"
                name="progress"
                value={project.progress}
                onChange={handleChange}
              />

            </div>

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