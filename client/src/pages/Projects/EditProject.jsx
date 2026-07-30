import "./EditProject.css";
import { useEffect, useState } from "react";
import { useProject } from "../../context/ProjectContext";

function EditProject({ project, onClose }) {
  const { updateProject } = useProject();

  const [form, setForm] = useState({
    id: "",
    projectId: "",
    name: "",
    client: "",
    status: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        id: project.id,
        projectId: project.projectId || "",
        name: project.name || "",
        client: project.client || "",
        status: project.status || "",
        start: project.start || "",
        end: project.end || "",
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

  const saveProject = async () => {
    await updateProject(form);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popupBox">

        <h2>Edit Project</h2>

        <input
          type="text"
          name="projectId"
          placeholder="Project ID"
          value={form.projectId}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={form.client}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Running">Running</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <input
          type="date"
          name="start"
          value={form.start}
          onChange={handleChange}
        />

        <input
          type="date"
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