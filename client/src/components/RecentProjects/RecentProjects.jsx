import { useProject } from "../../context/ProjectContext";
import "./RecentProjects.css";


function RecentProjects(){

  const { projects } = useProject();


  return(

    <div className="recent-box">

      <h2>Recent Projects</h2>


      <table>

        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>


        <tbody>

        {
          projects.map((project)=>(

            <tr key={project.id}>

              <td>{project.name}</td>

              <td>{project.client}</td>

              <td>
                <span className={
                  project.status.toLowerCase()
                }>
                  {project.status}
                </span>
              </td>

              <td>{project.start}</td>

              <td>{project.end}</td>

            </tr>

          ))
        }


        </tbody>


      </table>


    </div>

  )

}


export default RecentProjects;