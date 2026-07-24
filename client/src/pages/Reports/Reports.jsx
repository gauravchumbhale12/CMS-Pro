import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Reports.css";
import ReportCards from "../../components/Reports/ReportCards";
import ProjectPieChart from "../../components/Reports/ProjectPieChart";
import TaskBarChart from "../../components/Reports/TaskBarChart";

function Reports() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="reports-page">
        <Navbar />

        <h1 className="reports-title">📊 Reports Dashboard</h1>

        <div className="reports-content">

  <div className="chart-row">
  <ProjectPieChart />
  <TaskBarChart />
</div>

   <TaskBarChart />

          <div className="report-section">
            Recent Activity
          </div>

          <div className="export-section">
            Export Buttons
          </div>
          

        </div>

      </div>
    </div>
  );
}

export default Reports;