import { useProject } from "../../context/ProjectContext";
import "./UpcomingDeadlines.css";


function UpcomingDeadlines(){

  const { projects } = useProject();


  const upcomingProjects = [...projects]
    .sort((a,b)=> new Date(a.end) - new Date(b.end))
    .slice(0,5);



  return (

    <div className="deadline-box">


      <h2>Upcoming Deadlines</h2>


      {
        upcomingProjects.length === 0 ? (

          <p>No Projects Available</p>

        ) : (


          upcomingProjects.map((project)=>(

            <div 
              className="deadline-card"
              key={project.id}
            >

              <div>

                <h3>
                  {project.name}
                </h3>

                <p>
                  Client: {project.client}
                </p>

              </div>


              <div className="date">

                📅 {project.end}

              </div>


            </div>


          ))

        )
      }


    </div>

  );

}


export default UpcomingDeadlines;