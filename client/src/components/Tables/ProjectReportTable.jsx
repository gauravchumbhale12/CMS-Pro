import "./ProjectReportTable.css";
import { useState } from "react";
import AddProject from "../../pages/Projects/AddProject";
import EditProject from "../../pages/Projects/EditProject";
import { useProject } from "../../context/ProjectContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ProjectReportTable() {
  const {
    projects,
    addProject,
    deleteProject,
  } = useProject();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = (project) => {
    addProject(project);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?")) {
      deleteProject(id);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || project.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <>
      <div className="report-box">
        <div className="toolbar">
          <h2>Project Reports</h2>

          <div className="toolbar-right">
            <input
              type="text"
              placeholder="Search Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Running</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>

            <AddProject onAdd={handleAddProject} />
          </div>
        </div>
        

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Client</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.projectId}</td>
                <td>{project.name}</td>
                <td>{project.client}</td>

                <td>
                  <span className={project.status.toLowerCase()}>
                    {project.status}
                  </span>
                </td>

                <td>{project.start}</td>
                <td>{project.end}</td>

                <td>
                  <button
                    className="editBtn"
                    onClick={() => setSelectedProject(project)}
                  >
                    Edit
                  </button>


                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                                   <button
  className="excelBtn"
  onClick={exportExcel}
>
  Export Excel
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditProject
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(projects);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Projects"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(data, "Project_Report.xlsx");
};
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Project Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["ID", "Project", "Client", "Status", "Start", "End"]],
    body: projects.map((project) => [
      project.id,
      project.name,
      project.client,
      project.status,
      project.start,
      project.end,
    ]),
  });

  doc.save("Project_Report.pdf");
};
const printReport = () => {
  window.print();
};
const openProjectSheet = () => {
  window.open(
    "https://docs.google.com/spreadsheets/d/14x_yjvqcuhEJtVBM3gFkliGXtnVcGdgE/edit?gid=2095765999#gid=2095765999",
    "_blank"
  );
};

export default ProjectReportTable;