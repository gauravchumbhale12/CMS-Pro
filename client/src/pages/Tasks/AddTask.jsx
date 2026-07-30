import { useState } from "react";
import "./AddTask.css";
import { useNotification } from "../../context/NotificationContext";

function AddTask({ onAdd, projects }) {
  const [open, setOpen] = useState(false);

  const { addNotification } = useNotification();

  // Today's Date
  const getToday = () => new Date().toISOString().split("T")[0];

  const createTask = () => ({
    id: Date.now() + Math.floor(Math.random() * 100000),
    projectId: "",
    project: "",
    name: "",
    date: getToday(), // Auto Fill Today's Date
    priority: "Medium",
    status: "Pending",
    description: "",
  });

  const [task, setTask] = useState(createTask);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectId") {
      const selectedProject = projects.find(
        (p) => String(p.projectId) === value
      );

      setTask((prev) => ({
        ...prev,
        projectId: value,
        project: selectedProject ? selectedProject.name : "",
      }));
      return;
    }

    if (name === "project") {
      const selectedProject = projects.find(
        (p) => p.name === value
      );

      setTask((prev) => ({
        ...prev,
        project: value,
        projectId: selectedProject ? selectedProject.projectId : "",
      }));
      return;
    }

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      task.projectId === "" ||
      task.project === "" ||
      task.name.trim() === "" ||
      task.date === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      ...task,
      projectId: Number(task.projectId),
    };

    onAdd(newTask);
    addNotification(newTask);

    alert("Task Added Successfully");

    setTask(createTask());
    setOpen(false);
  };

  const handleOpen = () => {
    setTask(createTask()); // Every time popup opens, today's date is refreshed
    setOpen(true);
  };

  return (
    <>
      <button className="openBtn" onClick={handleOpen}>
        + Add Task
      </button>

      {open && (
        <div className="popup">
          <div className="popupBox">

            <h2>Add Task</h2>

            <select
              name="projectId"
              value={task.projectId}
              onChange={handleChange}
            >
              <option value="">Select Project ID</option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.projectId}
                >
                  {project.projectId}
                </option>
              ))}
            </select>

            <select
              name="project"
              value={task.project}
              onChange={handleChange}
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.name}
                >
                  {project.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={task.name}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
            />

            <div className="buttons">
              <button
                className="saveBtn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancelBtn"
                onClick={() => {
                  setTask(createTask());
                  setOpen(false);
                }}
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

export default AddTask;