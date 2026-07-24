import { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");

    if (saved) {
      return JSON.parse(saved);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

const addProject = (project) => {
  setProjects((prev) => [...prev, project]);
};

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

const updateProject = (updatedProject) => {
  setProjects((prev) => {
    const updated = prev.map((project) =>
      project.id === Number(updatedProject.oldId)
        ? {
            ...updatedProject,
            id: Number(updatedProject.id),
          }
        : project
    );

    return updated;
  });
};
  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);