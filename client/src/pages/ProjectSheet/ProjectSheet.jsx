import "./ProjectSheet.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import AddWork from "../../components/ProjectWork/AddWork";
import EditWork from "../../components/ProjectWork/EditWork";
import SectionCard from "../../components/ProjectWork/SectionCard";

import { useProject } from "../../context/ProjectContext";
import { useProjectWork } from "../../context/ProjectWorkContext";

function ProjectSheet() {

  const navigate = useNavigate();

  const { id } = useParams();

  const { projects } = useProject();

  const {
    addWork,
    getProjectWorks,
    toggleWork,
    deleteWork,
    updateWork,
  } = useProjectWork();

  const [showAddWork, setShowAddWork] =
    useState(false);

  const [selectedSection, setSelectedSection] =
    useState("BOM");

  const [selectedWork, setSelectedWork] =
    useState(null);

  const project = projects.find(
    (item) => item.id === id
  );

  if (!project) {

    return (
      <div className="project-loading">
        <h2>Loading Project...</h2>
      </div>
    );

  }

  const works = getProjectWorks(project.id);

  const getSectionWorks = (section) =>
    works.filter(
      (item) => item.section === section
    );

  const handleSaveWork = async (work) => {

    await addWork({

      projectId: project.id,

      section: work.section,

      title: work.title,

      description: work.description,

    });

    setShowAddWork(false);

  };

  const handleUpdateWork = async (
    id,
    data
  ) => {

    await updateWork(id, data);

    setSelectedWork(null);

  };

  return (

    <div className="project-sheet-layout">

      <Sidebar />

      <div className="project-sheet-main">

        <Navbar />

        <div className="sheet-header">

          <button
            className="back-btn"
            onClick={() => navigate("/projects")}
          >
            ← Back
          </button>

          <h1>📋 Project Work Register</h1>

        </div>

        <div className="project-info-card">

          <div className="info-box">
            <span>Project</span>
            <h3>{project.name}</h3>
          </div>

          <div className="info-box">
            <span>Customer</span>
            <h3>{project.client}</h3>
          </div>

          <div className="info-box">
            <span>Status</span>
            <h3>{project.status}</h3>
          </div>

          <div className="info-box">
            <span>Start</span>
            <h3>{project.start}</h3>
          </div>

          <div className="info-box">
            <span>End</span>
            <h3>{project.end}</h3>
          </div>

        </div>
                {/* Sections */}

        <SectionCard
          title="BOM"
          icon="📦"
          works={getSectionWorks("BOM")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("BOM");
            setShowAddWork(true);
          }}
        />

        <SectionCard
          title="Mould Base"
          icon="🧱"
          works={getSectionWorks("Mould Base")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("Mould Base");
            setShowAddWork(true);
          }}
        />

        <SectionCard
          title="Design"
          icon="📐"
          works={getSectionWorks("Design")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("Design");
            setShowAddWork(true);
          }}
        />

        <SectionCard
          title="Manufacturing"
          icon="⚙️"
          works={getSectionWorks("Manufacturing")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("Manufacturing");
            setShowAddWork(true);
          }}
        />

        <SectionCard
          title="Assembly"
          icon="🔩"
          works={getSectionWorks("Assembly")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("Assembly");
            setShowAddWork(true);
          }}
        />

        <SectionCard
          title="Trial"
          icon="🧪"
          works={getSectionWorks("Trial")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("Trial");
            setShowAddWork(true);
          }}
        />

        <SectionCard
          title="Dispatch"
          icon="🚚"
          works={getSectionWorks("Dispatch")}
          onToggle={toggleWork}
          onEdit={setSelectedWork}
          onDelete={deleteWork}
          onAddWork={() => {
            setSelectedSection("Dispatch");
            setShowAddWork(true);
          }}
        />

        {showAddWork && (
          <AddWork
            defaultSection={selectedSection}
            onClose={() => setShowAddWork(false)}
            onSave={handleSaveWork}
          />
        )}

        {selectedWork && (
          <EditWork
            work={selectedWork}
            onClose={() => setSelectedWork(null)}
            onUpdate={handleUpdateWork}
          />
        )}

      </div>

    </div>

  );

}

export default ProjectSheet;