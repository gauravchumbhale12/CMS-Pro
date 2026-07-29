import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardCards from "../../components/Cards/DashboardCards";
import ProjectChart from "../../components/Charts/ProjectChart";
import ProjectCalendar from "../../components/Calendar/ProjectCalendar";
import UpcomingDeadlines from "../../components/Deadlines/UpcomingDeadlines";


function SuperAdmin() {

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />


      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          background: "#020617",
          minHeight: "100vh",
          padding: "30px",
        }}
      >


        <Navbar />


        <h1 style={{color:"white"}}>
          Super Admin Dashboard
        </h1>


        <DashboardCards />


        <ProjectChart />


        <UpcomingDeadlines />


        <ProjectCalendar />


      </div>


    </div>

  );

}


export default SuperAdmin;