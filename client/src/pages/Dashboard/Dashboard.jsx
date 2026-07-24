import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardCards from "../../components/Cards/DashboardCards";
import ProjectChart from "../../components/Charts/ProjectChart";
import UpcomingDeadlines from "../../components/Deadlines/UpcomingDeadlines";
function Dashboard() {

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


        <DashboardCards />

        <ProjectChart />

        <UpcomingDeadlines />


      </div>


    </div>

  );

}


export default Dashboard;