import "./ManufacturingTemplate.css";

import { useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useTemplate } from "../../context/TemplateContext";

function ManufacturingTemplate() {

  const {
    templates,
    addTemplate,
    deleteTemplate,
  } = useTemplate();

  const [section, setSection] =
    useState("BOM");

  const [title, setTitle] =
    useState("");

  const handleAdd = async () => {

    if (!title.trim()) {

      alert("Enter Template Point");

      return;

    }

    await addTemplate({

      section,

      title,

    });

    setTitle("");

  };

  const sections = [

    "BOM",

    "Mould Base",

    "Design",

    "Manufacturing",

    "Assembly",

    "Trial",

    "Dispatch",

    "Documentation",

  ];

  return (

    <div style={{display:"flex"}}>

      <Sidebar />

      <div className="template-page">

        <Navbar />

        <div className="template-header">

          <h1>

            Manufacturing Template

          </h1>

        </div>

        <div className="template-add">

          <select
            value={section}
            onChange={(e)=>
              setSection(e.target.value)
            }
          >
                      {sections.map((item) => (

            <option key={item}>
              {item}
            </option>

          ))}

          </select>

          <input
            type="text"
            placeholder="Template Point"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button
            className="add-template-btn"
            onClick={handleAdd}
          >
            + Add Point
          </button>

        </div>

        <div className="template-list">

          {sections.map((sec) => (

            <div
              className="template-card"
              key={sec}
            >

              <h2>{sec}</h2>

              {templates
                .filter(
                  (item) =>
                    item.section === sec
                )
                .map((item) => (

                  <div
                    className="template-item"
                    key={item.id}
                  >

                    <span>

                      {item.title}

                    </span>

                    <button
                      className="delete-template-btn"
                      onClick={() =>
                        deleteTemplate(item.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                ))}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default ManufacturingTemplate;