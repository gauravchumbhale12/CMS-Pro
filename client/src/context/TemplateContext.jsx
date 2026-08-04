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
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const TemplateContext = createContext();

export function TemplateProvider({ children }) {

  const [templates, setTemplates] = useState([]);

  useEffect(() => {

    const q = query(

      collection(db,"workTemplates"),

      orderBy("section","asc")

    );

    const unsubscribe = onSnapshot(q,(snapshot)=>{

      const data = snapshot.docs.map(item=>({

        id:item.id,

        ...item.data(),

      }));

      setTemplates(data);

    });

    return ()=>unsubscribe();

  },[]);

  // Add Template Point
  const addTemplate = async (template) => {

    try {

      await addDoc(collection(db, "workTemplates"), {

        section: template.section,

        title: template.title,

        order: template.order || 0,

        createdAt: Date.now(),

      });

    } catch (err) {

      console.log(err);

    }

  };

  // Update Template
  const updateTemplate = async (id, data) => {

    try {

      await updateDoc(
        doc(db, "workTemplates", id),
        data
      );

    } catch (err) {

      console.log(err);

    }

  };

  // Delete Template
  const deleteTemplate = async (id) => {

    if (!window.confirm("Delete this template point?"))
      return;

    try {

      await deleteDoc(
        doc(db, "workTemplates", id)
      );

    } catch (err) {

      console.log(err);

    }

  };

  // Get Points By Section
  const getSectionPoints = (section) => {

    return templates.filter(
      (item) => item.section === section
    );

  };

  return (

    <TemplateContext.Provider
      value={{

        templates,

        addTemplate,

        updateTemplate,

        deleteTemplate,

        getSectionPoints,

      }}
    >

      {children}

    </TemplateContext.Provider>

  );

}

export const useTemplate = () =>
  useContext(TemplateContext);