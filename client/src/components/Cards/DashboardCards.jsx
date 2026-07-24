import { useProject } from "../../context/ProjectContext";
import "./DashboardCards.css";


function DashboardCards() {

  const { projects } = useProject();


  const totalProjects = projects.length;

  const runningProjects = projects.filter(
    (p) => p.status === "Running"
  ).length;


  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;


  const pendingProjects = projects.filter(
    (p) => p.status === "Pending"
  ).length;



  return (

    <div className="cards-container">


      <div className="card">

        <div className="card-title">
          📁 Total Projects
        </div>

        <h1>{totalProjects}</h1>

      </div>



      <div className="card">

        <div className="card-title">
          🟢 Running
        </div>

        <h1>{runningProjects}</h1>

      </div>



      <div className="card">

        <div className="card-title">
          🔵 Completed
        </div>

        <h1>{completedProjects}</h1>

      </div>



      <div className="card">

        <div className="card-title">
          🟡 Pending
        </div>

        <h1>{pendingProjects}</h1>

      </div>


    </div>

  );

}


export default DashboardCards;