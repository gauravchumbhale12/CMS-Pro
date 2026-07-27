import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

function ExportButtons() {
  const { projects } = useProject();
  const { tasks } = useTask();

  // ===========================
  // Export Excel
  // ===========================
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    const projectSheet = XLSX.utils.json_to_sheet(projects);
    XLSX.utils.book_append_sheet(workbook, projectSheet, "Projects");

    const taskSheet = XLSX.utils.json_to_sheet(tasks);
    XLSX.utils.book_append_sheet(workbook, taskSheet, "Tasks");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "CMS_Report.xlsx");
  };

  // ===========================
  // Export PDF
  // ===========================
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("CMS Project Report", 14, 20);

    doc.setFontSize(11);

    doc.text(
      `Generated : ${new Date().toLocaleDateString()}`,
      14,
      30
    );

    doc.text(`Total Projects : ${projects.length}`, 14, 40);
    doc.text(`Total Tasks : ${tasks.length}`, 14, 48);

    autoTable(doc, {
      startY: 60,
      head: [["ID", "Project", "Client", "Status"]],
      body: projects.map((p) => [
        p.id,
        p.name,
        p.client,
        p.status,
      ]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 12,
      head: [["ID", "Task", "Project", "Status"]],
      body: tasks.map((t) => [
        t.id,
        t.name,
        t.project,
        t.status,
      ]),
    });

    doc.save("CMS_Report.pdf");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "flex-end",
        marginBottom: "20px",
      }}
    >
      <button className="pdfBtn" onClick={exportPDF}>
        📄 Export PDF
      </button>

      <button className="excelBtn" onClick={exportExcel}>
        📊 Export Excel
      </button>
    </div>
  );
}

export default ExportButtons;