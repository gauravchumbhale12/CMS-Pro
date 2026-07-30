import "./TaskTable.css";
import { useState } from "react";

import { useTask } from "../../context/TaskContext";
import { useProject } from "../../context/ProjectContext";
import { useNotification } from "../../context/NotificationContext";

import AddTask from "../../pages/Tasks/AddTask";
import EditTask from "../../pages/Tasks/EditTask";

function TaskTable() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useTask();

  const { projects } = useProject();

  const { removeNotification } =
    useNotification();

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState("All");

  const handleAddTask = (task) => {
    addTask(task);
  };

  // Delete Task + Notification
  const handleDelete = (task) => {
    if (
      !window.confirm(
        "Delete this task?"
      )
    )
      return;

    deleteTask(task.id);

    removeNotification(task.id);
  };

  const filteredTasks = tasks.filter(
    (task) => {
      const matchSearch =
        task.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        task.project
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchFilter =
        filter === "All"
          ? true
          : task.status === filter;

      return (
        matchSearch &&
        matchFilter
      );
    }
  );

  return (
    <div className="taskBox">
      <div className="taskToolbar">
        <h2>Today's Tasks</h2>

        <div className="toolbarRight">
          <input
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Pending</option>
            <option>
              In Progress
            </option>
            <option>
              Completed
            </option>
          </select>

          <AddTask
            onAdd={handleAddTask}
            projects={projects}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project</th>
            <th>Task</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.length ===
          0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign:
                    "center",
                  color: "white",
                  padding:
                    "30px",
                }}
              >
                No Tasks Found
              </td>
            </tr>
          ) : (
            filteredTasks.map(
              (task) => (
                <tr
                  key={task.id}
                >
                  <td>
                    {
                      task.projectId
                    }
                  </td>

                  <td>
                    {task.project}
                  </td>

                  <td>
                    {task.name}
                  </td>

                  <td>
                    {task.date}
                  </td>

                  <td>
                    {
                      task.priority
                    }
                  </td>

                  <td>
                    <span
                      className={task.status
                        .replace(
                          /\s/g,
                          ""
                        )
                        .toLowerCase()}
                    >
                      {
                        task.status
                      }
                    </span>
                  </td>

                  <td>
                    <button
                      className="editBtn"
                      onClick={() =>
                        setSelectedTask(
                          task
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="deleteBtn"
                      onClick={() =>
                        handleDelete(
                          task
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      {selectedTask && (
        <EditTask
          task={selectedTask}
          projects={projects}
          onUpdate={
            updateTask
          }
          onClose={() =>
            setSelectedTask(
              null
            )
          }
        />
      )}
    </div>
  );
}

export default TaskTable;