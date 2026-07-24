import { useProject } from "../../context/ProjectContext";
import "./ProjectChart.css";


function ProjectChart(){

  const { projects } = useProject();


  const running = projects.filter(
    (p)=>p.status==="Running"
  ).length;


  const completed = projects.filter(
    (p)=>p.status==="Completed"
  ).length;


  const pending = projects.filter(
    (p)=>p.status==="Pending"
  ).length;


  const total = projects.length;


  return (

    <div className="chart-box">

      <h2>Project Status Overview</h2>


      <div className="progress-container">


        <div className="progress-item">

          <div className="progress-label">
            Running
            <span>{running}</span>
          </div>

          <div className="bar">
            <div 
              className="running-bar"
              style={{
                width:`${total ? (running/total)*100 : 0}%`
              }}
            ></div>
          </div>

        </div>



        <div className="progress-item">

          <div className="progress-label">
            Completed
            <span>{completed}</span>
          </div>

          <div className="bar">
            <div 
              className="completed-bar"
              style={{
                width:`${total ? (completed/total)*100 : 0}%`
              }}
            ></div>
          </div>

        </div>



        <div className="progress-item">

          <div className="progress-label">
            Pending
            <span>{pending}</span>
          </div>

          <div className="bar">
            <div 
              className="pending-bar"
              style={{
                width:`${total ? (pending/total)*100 : 0}%`
              }}
            ></div>
          </div>

        </div>


      </div>


    </div>

  );

}


export default ProjectChart;