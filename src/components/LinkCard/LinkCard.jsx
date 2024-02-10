/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import "./LinkCard.css";
import { toast } from "react-toastify";

const LinkCard = ({ originalURL, shortId, onDelete, clicks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedShortId, setEditedShortId] = useState("");
  const [error, setError] = useState("");

  const handleCopy = () => {
    const firstLink = document.querySelector(".links a:first-of-type");
    if (firstLink) {
      const href = firstLink.getAttribute("href");
      navigator.clipboard
        .writeText(href)
        .then(() => {
          console.log("URL copied to clipboard:", href);
        })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
        });
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    const regexExpression = /^[a-zA-Z0-9]{6,12}$/;
    if (!regexExpression.test(editedShortId.trim())) {
      setError("Enter a Valid ShortId");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/${shortId}`, {
        newShortId: editedShortId,
      });
      const result = response.data;
      toast.success(result.message);
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteShortId = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/${shortId}`
      );

      const result = await response.data;
      toast.success(result.message);
      onDelete(shortId);
    } catch (error) {
      console.log("Error in Deleting", error);
    }
  };

  return (
    <div className="linkCard">
      <div className="container">
        <div className="top">
          <h2>{originalURL}</h2>
          <div className="iconContainer">
            <button onClick={handleCopy}>
              <i>
                <FaRegCopy />
              </i>
              Copy
            </button>
            <button onClick={toggleEdit}>
              <i>
                <LuPencil />
              </i>
              Edit
            </button>
            <button onClick={deleteShortId}>
              <i>
                <MdDelete />
              </i>
              Delete
            </button>
          </div>
        </div>
        <div className="links">
          <a
            href={`http://localhost:3000/api/${shortId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            URL/{shortId}
          </a>
          <a href={originalURL} target="_blank" rel="noopener noreferrer">
            {originalURL}
          </a>
          <p>Total clicks : {clicks?.timeStamps.length}</p>
        </div>
        {isEditing && (
          <div className="editContainer">
            <h1>Edit ShortId :</h1>
            <div>
              <label htmlFor="edit">ShortId</label>
              <input
                type="text"
                id="edit"
                onChange={(e) => setEditedShortId(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Update</button>
            </div>
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkCard;
