import "./ProjectSheet.css";

import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useProject } from "../../context/ProjectContext";
import { useState } from "react";
import AddWork from "../../components/ProjectWork/AddWork";

function ProjectSheet() {

  const navigate = useNavigate();

  const { id } = useParams();

  const { projects } = useProject();

  const project = projects.find(
    (item) => item.id === id
  );
  const [showAddWork, setShowAddWork] = useState(false);

const handleSaveWork = (work) => {
  console.log(work);

  // पुढच्या step मध्ये Firebase मध्ये save करू
};

  if (!project) {
    return (
      <div className="project-loading">

        <h2>Loading Project...</h2>

      </div>
    );
  }

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

          <h1>📋 Project Sheet</h1>

        </div>

        <div className="project-info-card">

          <div className="info-box">

            <span>Project Name</span>

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

            <span>Start Date</span>

            <h3>{project.start}</h3>

          </div>

          <div className="info-box">

            <span>End Date</span>

            <h3>{project.end}</h3>

          </div>

        </div>

        <div className="work-toolbar">

          <h2>Project Work Register</h2>

<button
  className="add-work-btn"
  onClick={() => setShowAddWork(true)}
>
  + Add Work
</button>

        </div>

        <div className="work-list">

                      <div className="empty-work">

            <div className="empty-icon">
              📋
            </div>
            {showAddWork && (

  <AddWork

    onClose={() => setShowAddWork(false)}

    onSave={handleSaveWork}

  />

)}

            <h3>No Work Added Yet</h3>

            <p>

              Click on

              <strong> + Add Work </strong>

              to start your Project Work Register.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProjectSheet;