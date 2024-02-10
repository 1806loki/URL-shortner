/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import "./LinkContainer.css";

import { FaRegCopy } from "react-icons/fa";

const LinkContainer = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortID, setShortID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleURLChange = (e) => {
    setOriginalURL(e.target.value);
    setError("");
  };

  const handleOriginalURL = async () => {
    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (originalURL.trim() === "" || !urlRegex.test(originalURL.trim())) {
      return setError("Enter a valid URL");
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api", {
        originalURL: originalURL,
      });
      const shortURL = response.data.shortId;
      setShortID(shortURL);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Failed to shorten the URL. Please try again later.");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const inputText = document.getElementById("short-url").innerText;
    navigator.clipboard.writeText(inputText);
  };

  return (
    <div className="url-shorten-container">
      <h2 className="title">Paste the URL to be Shortened</h2>
      <div className="input-container">
        <input
          type="text"
          className="url-input"
          placeholder="Enter your URL here"
          value={originalURL}
          onChange={handleURLChange}
          name="url-input"
        />
        <button
          className="shorten-button"
          onClick={handleOriginalURL}
          disabled={loading}
        >
          {loading ? "Loading..." : "Shorten the URL"}
        </button>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="shortened-url-container">
          <p className="shortened-url-label">Shortened URL:</p>
          <a
            href={`http://localhost:3000/api/${shortID}`}
            className="shortened-url"
            id="short-url"
          >
            {shortID && `http://localhost:3000/api/${shortID}`}
          </a>
          <button onClick={handleCopy}>
            <FaRegCopy />
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkContainer;
