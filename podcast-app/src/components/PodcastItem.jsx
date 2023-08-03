import React, { useState } from "react";
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleToggleOverlay = () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const genreTitles = podcast.genres.map((genreId) => genreMapping[genreId]);

  return (
    <div
      className={`podcast-item ${showOverlay ? "show-overlay" : ""}`}
      onClick={handleToggleOverlay}
    >
      {/* Display the podcast image with fixed height and width */}
      <h3>{podcast.title}</h3>
      <img
        src={podcast.image}
        alt={`Podcast - ${podcast.title}`}
        height="200"
        width="200"
      />

      <div className="overlay">
        <div
          className="podcast-item"
          onClick={() => handlePodcastClick(podcast)}
        >
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <strong>
            <p>Genre: {genreTitles.join(", ")}</p>
          </strong>
        </div>
      </div>

      <div className="seasons">
        <strong>
          <p>Seasons: {podcast.seasons}</p>
        </strong>
      </div>

    </div>
  );
};

export default PodcastItem;
