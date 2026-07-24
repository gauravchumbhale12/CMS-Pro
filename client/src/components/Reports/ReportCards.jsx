import "./ReportCards.css";
import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

function ReportCards() {

  const { projects } = useProject();
  const { tasks } = useTask();

  const totalProjects = projects.length;

  const runningProjects = projects.filter(
    (p) => p.status === "Running"
  ).length;

  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const totalTasks = tasks.length;

  return (

    <div className="reportCards">

      <div className="reportCard">
        <h4>Total Projects</h4>
        <h1>{totalProjects}</h1>
      </div>

      <div className="reportCard">
        <h4>Running Projects</h4>
        <h1>{runningProjects}</h1>
      </div>

      <div className="reportCard">
        <h4>Completed Projects</h4>
        <h1>{completedProjects}</h1>
      </div>

      <div className="reportCard">
        <h4>Total Tasks</h4>
        <h1>{totalTasks}</h1>
      </div>

    </div>

  );

}

export default ReportCards;