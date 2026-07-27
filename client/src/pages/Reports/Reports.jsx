import Sidebar from "../../components/Sidebar/Sidebar";
import "./Reports.css";

import ReportCards from "../../components/Reports/ReportCards";
import ProjectPieChart from "../../components/Reports/ProjectPieChart";
import TaskBarChart from "../../components/Reports/TaskBarChart";
import RecentActivity from "../../components/Reports/RecentActivity";
import ExportButtons from "../../components/Reports/ExportButtons";

function Reports() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="reports-page">

        <h1 className="reports-title">
          📊 Reports Dashboard
        </h1>

        <div className="reports-content">

          <ReportCards />

          <div className="export-row">
            <ExportButtons />
          </div>

          <div className="chart-row">
            <ProjectPieChart />
            <TaskBarChart />
          </div>

          <RecentActivity />

        </div>

      </div>
    </div>
  );
}

export default Reports;