import "./EditWork.css";

import { useState } from "react";

function EditWork({
  work,
  onClose,
  onUpdate,
}) {

  const [title, setTitle] = useState(work.title);

  const [description, setDescription] = useState(
    work.description
  );

  const handleUpdate = () => {

    if (!title.trim()) {
      alert("Enter Work Name");
      return;
    }

    onUpdate(work.id, {
      title,
      description,
    });

    onClose();

  };

  return (

    <div className="work-popup">

      <div className="work-modal">

        <h2>Edit Work</h2>

                <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          rows="5"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <div className="popup-buttons">

          <button
            className="save-btn"
            onClick={handleUpdate}
          >
            Save Changes
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default EditWork;