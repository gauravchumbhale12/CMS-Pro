import "./EditProject.css";
import { useEffect, useState } from "react";
import { useProject } from "../../context/ProjectContext";

function EditProject({ project, onClose }) {
  const { updateProject } = useProject();

  const [form, setForm] = useState({
    id: "",
    name: "",
    client: "",
    status: "",
    start: "",
    end: "",
  });

 useEffect(() => {
  if (project) {
    setForm({
      ...project,
      oldId: project.id,
    });
  }
}, [project]);

  if (!project) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProject = () => {
    updateProject(form);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popupBox">

        <h2>Edit Project</h2>

        <input
  type="number"
  name="id"
  placeholder="Project ID"
  value={form.id}
  onChange={handleChange}
/>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="client"
          value={form.client}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Running</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>

        <input
          name="start"
          value={form.start}
          onChange={handleChange}
        />

        <input
          name="end"
          value={form.end}
          onChange={handleChange}
        />

        <div className="buttons">

          <button
            className="saveBtn"
            onClick={saveProject}
          >
            Save
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

export default EditProject;