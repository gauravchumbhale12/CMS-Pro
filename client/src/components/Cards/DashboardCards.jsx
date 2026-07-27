import { useProject } from "../../context/ProjectContext";
import "./DashboardCards.css";

function DashboardCards() {
  const { projects } = useProject();

  const totalProjects = projects.length;

  const runningProjects = projects.filter(
    (p) => p.status === "Running" || p.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const pendingProjects = projects.filter(
    (p) => p.status === "Pending"
  ).length;

  const cards = [
    {
      icon: "📁",
      title: "Total Projects",
      value: totalProjects,
      sub: "All Projects",
    },
    {
      icon: "🚀",
      title: "Running",
      value: runningProjects,
      sub: "Currently Active",
    },
    {
      icon: "✅",
      title: "Completed",
      value: completedProjects,
      sub: "Successfully Finished",
    },
    {
      icon: "⏳",
      title: "Pending",
      value: pendingProjects,
      sub: "Waiting",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="card" key={index}>

          <div className="card-top">
            <span className="card-icon">{card.icon}</span>
            <span className="card-title">{card.title}</span>
          </div>

          <h1>{card.value}</h1>

          <p>{card.sub}</p>

        </div>
      ))}
    </div>
  );
}

export default DashboardCards;