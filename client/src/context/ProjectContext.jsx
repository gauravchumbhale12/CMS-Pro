import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
    query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // Realtime Listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setProjects(list);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add Project
  const addProject = async (project) => {
    try {
      await addDoc(collection(db, "projects"), {
        projectId: Number(project.id),
        name: project.name,
        client: project.client,
        status: project.status,
        priority: project.priority,
        progress: Number(project.progress),
        start: project.start,
        end: project.end,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Update Project
  const updateProject = async (project) => {
    try {
      const projectRef = doc(db, "projects", project.id);

      await updateDoc(projectRef, {
        projectId: Number(project.projectId),
        name: project.name,
        client: project.client,
        status: project.status,
        start: project.start,
        end: project.end,
      });

      console.log("Project Updated Successfully");
    } catch (err) {
      console.log("Update Error:", err);
      alert("Project Update Failed");
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    if (!window.confirm("Delete Project?")) return;
    // Add Work
const addWork = async (projectId, work) => {
  try {

    await addDoc(collection(db, "projectWorks"), {

      projectId,

      title: work.title,

      description: work.description,

      checked: false,

      createdAt: Date.now(),

    });

  } catch (err) {

    console.log(err);

  }
};
// Get Works
const getWorks = async (projectId) => {

  const q = query(

    collection(db, "projectWorks"),

    where("projectId", "==", projectId)

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({

    id: doc.id,

    ...doc.data(),

  }));

};

    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      console.log(err);
    }
  };

return (
  <ProjectContext.Provider
    value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
    
    }}
  >
    {children}
  </ProjectContext.Provider>
);
};

export const useProject = () => useContext(ProjectContext);