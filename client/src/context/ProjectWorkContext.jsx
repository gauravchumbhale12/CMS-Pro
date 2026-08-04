import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const ProjectWorkContext = createContext();

export function ProjectWorkProvider({ children }) {

  const [works, setWorks] = useState([]);

  useEffect(() => {

    const q = query(

      collection(db,"projectWorks"),

      orderBy("createdAt","asc")

    );

    const unsubscribe = onSnapshot(q,(snapshot)=>{

      const list = snapshot.docs.map(item=>({

        id:item.id,

        ...item.data(),

      }));

      setWorks(list);

    });

    return ()=>unsubscribe();

  },[]);

    // Add Work
  const addWork = async (work) => {

    try {

      await addDoc(collection(db, "projectWorks"), {

        ...work,

        checked: false,

        createdAt: Date.now(),

      });

    } catch (err) {

      console.log(err);

    }

  };

  // Update Work
  const updateWork = async (id, data) => {

    try {

      await updateDoc(
        doc(db, "projectWorks", id),
        data
      );

    } catch (err) {

      console.log(err);

    }

  };

  // Delete Work
  const deleteWork = async (id) => {

    if (!window.confirm("Delete this Work?"))
      return;

    try {

      await deleteDoc(
        doc(db, "projectWorks", id)
      );

    } catch (err) {

      console.log(err);

    }

  };

  // Toggle Checkbox
  const toggleWork = async (work) => {

    try {

      await updateDoc(
        doc(db, "projectWorks", work.id),
        {
          checked: !work.checked,
        }
      );

    } catch (err) {

      console.log(err);

    }

  };

  // Project Wise Works
  const getProjectWorks = (projectId) => {

    return works.filter(
      (item) => item.projectId === projectId
    );

  };

  return (

    <ProjectWorkContext.Provider
      value={{
        works,
        addWork,
        updateWork,
        deleteWork,
        toggleWork,
        getProjectWorks,
      }}
    >

      {children}

    </ProjectWorkContext.Provider>

  );

}

export const useProjectWork = () =>
  useContext(ProjectWorkContext);