import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProjectReportTable from "../../components/Tables/ProjectReportTable";

function Projects() {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          background: "var(--bg)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Navbar />

        <h1
          style={{
            color: "white",
            marginTop: "30px",
            marginBottom: "25px",
          }}
        >
          📁 Project Management
        </h1>

        <ProjectReportTable />

      </div>

    </div>
  );
}

export default Projects;  