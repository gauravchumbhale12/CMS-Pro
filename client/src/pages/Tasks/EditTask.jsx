import { useState, useEffect } from "react";
import "./AddTask.css";

function EditTask({ task, projects, onUpdate, onClose }) {
  const [editTask, setEditTask] = useState(task);

  useEffect(() => {
    setEditTask(task);
  }, [task]);

  const handleChange = (e) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdate(editTask);
    onClose();
  };

  if (!task) return null;

  return (
    <div className="popup">
      <div className="popupBox">

        <h2>Edit Task</h2>

        <input
          type="number"
          name="id"
          value={editTask.id}
          onChange={handleChange}
        />

        <select
          name="project"
          value={editTask.project}
          onChange={handleChange}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          value={editTask.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={editTask.date}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={editTask.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={editTask.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <textarea
          name="description"
          value={editTask.description}
          onChange={handleChange}
        />

        <div className="buttons">
          <button className="saveBtn" onClick={handleSave}>
            Update
          </button>

          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditTask;