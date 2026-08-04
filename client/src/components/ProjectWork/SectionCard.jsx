import "./SectionCard.css";
import { useState } from "react";

function SectionCard({
  title,
  icon,
  works,
  onToggle,
  onEdit,
  onDelete,
  onAddWork,
}) {

  const [open, setOpen] = useState(true);

  return (

    <div className="section-card">

      <div
        className="section-header"
        onClick={() => setOpen(!open)}
      >

        <div className="section-title">

          <span className="section-icon">
            {icon}
          </span>

          <h3>{title}</h3>

        </div>

        <button className="collapse-btn">

          {open ? "▼" : "▶"}

        </button>

      </div>

      {open && (

        <div className="section-body">
                      {works.length === 0 ? (

            <div className="section-empty">

              No Work Available

            </div>

          ) : (

            works.map((work) => (

              <div
                className="section-work"
                key={work.id}
              >

                <div className="work-left">

                  <input
                    type="checkbox"
                    checked={work.checked}
                    onChange={() => onToggle(work)}
                  />

                  <div className="work-info">

                    <h4>{work.title}</h4>

                    {work.description && (

                      <p>{work.description}</p>

                    )}

                  </div>

                </div>

                <div className="work-right">

                  <button
                    className="editBtn"
                    onClick={() => onEdit(work)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() => onDelete(work.id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))

          )}

          <button
            className="section-add-btn"
            onClick={() => onAddWork(title)}
          >
            + Add Custom Work
          </button>

        </div>

      )}

    </div>

  );

}

export default SectionCard;