import "./ReportCards.css";
import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

function ReportCards() {
  const { projects } = useProject();
  const { tasks } = useTask();

  const totalProjects = projects.length;

  const runningProjects = projects.filter(
    (p) => p.status === "Running" || p.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const totalTasks = tasks.length;

  const cards = [
    {
      icon: "📁",
      title: "Total Projects",
      value: totalProjects,
      subtitle: "All registered projects",
    },
    {
      icon: "🚀",
      title: "Running Projects",
      value: runningProjects,
      subtitle: "Currently active",
    },
    {
      icon: "✅",
      title: "Completed",
      value: completedProjects,
      subtitle: "Successfully finished",
    },
    {
      icon: "📝",
      title: "Total Tasks",
      value: totalTasks,
      subtitle: "Tasks available",
    },
  ];

  return (
    <div className="reportCards">
      {cards.map((card, index) => (
        <div className="reportCard" key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h4>{card.title}</h4>

            <span
              style={{
                fontSize: "34px",
              }}
            >
              {card.icon}
            </span>
          </div>

          <h1>{card.value}</h1>

          <p>{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default ReportCards;