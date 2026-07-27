import { useProject } from "../../context/ProjectContext";
import "./ProjectChart.css";

function ProjectChart() {
  const { projects } = useProject();

  const running = projects.filter(
    (p) => p.status === "Running" || p.status === "In Progress"
  ).length;

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const pending = projects.filter(
    (p) => p.status === "Pending"
  ).length;

  const total = projects.length;

  return (
    <div className="chart-box">

      <div className="chart-header">
        <div>
          <h2>📊 Project Analytics</h2>
          <p>Live overview of project progress</p>
        </div>

        <span className="total-projects">
          {total} Projects
        </span>
      </div>

      <div className="progress-container">

        <div className="progress-item">

          <div className="progress-label">
            <span>🚀 Running</span>
            <span>{running}</span>
          </div>

          <div className="bar">
            <div
              className="running-bar"
              style={{
                width: `${total ? (running / total) * 100 : 0}%`,
              }}
            ></div>
          </div>

        </div>

        <div className="progress-item">

          <div className="progress-label">
            <span>✅ Completed</span>
            <span>{completed}</span>
          </div>

          <div className="bar">
            <div
              className="completed-bar"
              style={{
                width: `${total ? (completed / total) * 100 : 0}%`,
              }}
            ></div>
          </div>

        </div>

        <div className="progress-item">

          <div className="progress-label">
            <span>⏳ Pending</span>
            <span>{pending}</span>
          </div>

          <div className="bar">
            <div
              className="pending-bar"
              style={{
                width: `${total ? (pending / total) * 100 : 0}%`,
              }}
            ></div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectChart;