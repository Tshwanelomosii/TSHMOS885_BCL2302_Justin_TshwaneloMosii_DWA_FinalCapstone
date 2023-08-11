import React, { useState } from "react";
import "./PodcastItem.css"; // Import the custom CSS file


const PodcastItem = ({ podcast }) => {//podcast` prop, which is an object representing the details of the podcast to be displayed.

// This state determines whether an overlay with additional details should be shown for the podcast.
  const [showOverlay, setShowOverlay] = useState(false);

  const handleToggleOverlay = () => {// function is defined to toggle the visibility of the overlay. 
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  const genreMapping = {// object is used to map genre IDs to their corresponding names. 
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

  // array is created using the `map` function to retrieve the names of genres for the current podcast.
  const genreTitles = podcast.genres.map((genreId) => genreMapping[genreId]);

  //podcast  date value,convert it into date object used to be displayed
  const lastUpdatedDate = new Date(podcast.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });



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
          <img
        src={podcast.image}
        alt={`Podcast - ${podcast.title}`}
        height="200"
        width="200"
      />
          <p>{podcast.description}</p>
          <strong>
            <p>Genre: {genreTitles.join(", ")}</p>
            <p>Last Updated: {lastUpdatedDate}</p>
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
