import { useState, useEffect } from "react";
import "./AddTask.css";
import { useNotification } from "../../context/NotificationContext";

function EditTask({
  task,
  projects,
  onUpdate,
  onClose,
}) {
  const [editTask, setEditTask] = useState(task);

  const {
    addNotification,
    removeNotification,
  } = useNotification();

  useEffect(() => {
    if (task) {
      setEditTask(task);
    }
  }, [task]);

  if (!task) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Project Name → Project ID
    if (name === "project") {
      const selectedProject = projects.find(
        (p) => p.name === value
      );

      setEditTask((prev) => ({
        ...prev,
        project: value,
        projectId: selectedProject
          ? Number(selectedProject.projectId)
          : "",
      }));

      return;
    }

    // Project ID → Project Name
    if (name === "projectId") {
      const selectedProject = projects.find(
        (p) =>
          Number(p.projectId) === Number(value)
      );

      setEditTask((prev) => ({
        ...prev,
        projectId: Number(value),
        project: selectedProject
          ? selectedProject.name
          : "",
      }));

      return;
    }

    setEditTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedTask = {
      ...editTask,
      projectId: Number(editTask.projectId),
    };

    // Update Only This Task
    onUpdate(updatedTask);

    // Remove Old Notification
    removeNotification(updatedTask.id);

    // Add Notification Again
    if (updatedTask.status !== "Completed") {
      addNotification(updatedTask);
    }

    onClose();
  };

  return (
    <div className="popup">
      <div className="popupBox">

        <h2>Edit Task</h2>

        {/* Project ID */}

        <select
          name="projectId"
          value={editTask.projectId}
          onChange={handleChange}
        >
          <option value="">
            Select Project ID
          </option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.projectId}
            >
              {project.projectId}
            </option>
          ))}
        </select>

        {/* Project Name */}

        <select
          name="project"
          value={editTask.project}
          onChange={handleChange}
        >
          <option value="">
            Select Project
          </option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.name}
            >
              {project.name}
            </option>
          ))}
        </select>

        {/* Task Name */}

        <input
          type="text"
          name="name"
          value={editTask.name}
          onChange={handleChange}
        />

        {/* Date */}

        <input
          type="date"
          name="date"
          value={editTask.date}
          onChange={handleChange}
        />

        {/* Priority */}

        <select
          name="priority"
          value={editTask.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* Status */}

        <select
          name="status"
          value={editTask.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        {/* Description */}

        <textarea
          name="description"
          value={editTask.description}
          onChange={handleChange}
        />

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

export default EditTask;