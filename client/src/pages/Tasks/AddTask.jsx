import { useState } from "react";
import "./AddTask.css";
import { useNotification } from "../../context/NotificationContext";

function AddTask({ onAdd, projects }) {

  const [open, setOpen] = useState(false);

  const { addNotification } = useNotification();

  const [task, setTask] = useState({
    id: "",
    project: "",
    name: "",
    date: "",
    priority: "Medium",
    status: "Pending",
    description: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {

    if (
      task.id === "" ||
      task.project === "" ||
      task.name === "" ||
      task.date === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      ...task,
      id: Number(task.id),
    };

    onAdd(newTask);

    // Notification Add
    addNotification(`🆕 New Task Added : ${task.name}`);

    setTask({
      id: "",
      project: "",
      name: "",
      date: "",
      priority: "Medium",
      status: "Pending",
      description: "",
    });

    setOpen(false);

  };

  return (
    <>
      <button
        className="openBtn"
        onClick={() => setOpen(true)}
      >
        + Add Task
      </button>

      {open && (

        <div className="popup">

          <div className="popupBox">

            <h2>Add Task</h2>

            <input
              type="number"
              name="id"
              placeholder="Task ID"
              value={task.id}
              onChange={handleChange}
            />

            <select
              name="project"
              value={task.project}
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
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
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

export default AddTask;