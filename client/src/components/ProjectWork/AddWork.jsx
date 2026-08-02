import "./AddWork.css";

import { useState } from "react";

function AddWork({ onClose, onSave }) {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const handleSave = () => {

    if (!title.trim()) {
      alert("Enter Work Name");
      return;
    }

    onSave({
      title,
      description,
    });

    setTitle("");
    setDescription("");

    onClose();

  };

  return (

    <div className="work-popup">

      <div className="work-modal">

        <h2>Add New Work</h2>
                <input
          type="text"
          placeholder="Work Name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          rows="5"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <div className="popup-buttons">

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
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

export default AddWork;