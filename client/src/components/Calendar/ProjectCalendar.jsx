import { useState } from "react";
import Calendar from "react-calendar";
import { useProject } from "../../context/ProjectContext";
import "./ProjectCalendar.css";

function ProjectCalendar() {
  const [date, setDate] = useState(new Date());

  const { projects } = useProject();

  return (
    <div className="calendar-box">
      <h2>📅 Project Calendar</h2>

      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          // yyyy-mm-dd format
          const currentDate = date.toISOString().split("T")[0];

          const project = projects.find(
            (p) => p.end === currentDate
          );

          if (!project) return null;

          let dotClass = "";

          if (
            new Date(project.end) < new Date() &&
            project.status !== "Completed"
          ) {
            dotClass = "overdue-dot";
          } else if (project.status === "Running") {
            dotClass = "running-dot";
          } else if (project.status === "Completed") {
            dotClass = "completed-dot";
          } else {
            dotClass = "pending-dot";
          }

          return (
            <div
              className={dotClass}
              title={`${project.name} (${project.status})`}
            ></div>
          );
        }}
      />

      <div className="deadline-list">
        <h3>📌 Upcoming Deadlines</h3>

        {projects.length === 0 ? (
          <p className="no-project">No Projects Available</p>
        ) : (
          [...projects]
            .sort((a, b) => new Date(a.end) - new Date(b.end))
            .map((project) => (
              <div
                key={project.id}
                className="deadline-item"
              >
                <div>
                  <strong>{project.name}</strong>
                  <p>{project.client}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    className={`status ${project.status.toLowerCase()}`}
                  >
                    {project.status}
                  </span>

                  <p style={{ marginTop: "8px" }}>
                    📅 {project.end}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default ProjectCalendar;