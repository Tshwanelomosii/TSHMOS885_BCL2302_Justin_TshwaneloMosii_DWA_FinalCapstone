import React, { useState, Fragment } from "react";
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [view, setView] = useState('startPhase');
  const [loading, setLoading] = useState(false);
  const [favoriteShows, setFavoriteShows] = useState([]); // Added favoriteShows state
  const [selectedGenre, setSelectedGenre] = useState(null);

  const BASE_URL = 'https://podcast-api.netlify.app/';

  const handleToggleOverlay = () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  const genreMapping = {
    1: "Personal Growth",
    
  };

  const genreTitles = podcast.genres.map((genreId) => genreMapping[genreId]);

  const lastUpdatedDate = new Date(podcast.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchShowDetails = async (showId) => {
    try {
      const response = await fetch(`${BASE_URL}/id/${showId}`);
      const data = await response.json();
      data.seasons = data.seasons || [];
      return data;
    } catch (error) {
      console.error('Error fetching show details:', error);
      throw error;
    }
  };

  const addToFavoriteShows = (show) => {
    setFavoriteShows((prevFavorites) => [...prevFavorites, show]);
  };

  const removeFromFavoriteShows = (showId) => {
    setFavoriteShows((prevFavorites) => prevFavorites.filter((fav) => fav.id !== showId));
  };

  const handleShowClick = async (showId) => {
    try {
      setLoading(true);
      const data = await fetchShowDetails(showId);
      setSelectedShow(data);
      setView('showDetail');
    } catch (error) {
      console.error('Error fetching show details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  return (
    <div 
          className={`podcast-item ${showOverlay ? "show-overlay" : ""} ${selectedSeason !== null ? "show-seasons" : ""}`}
          onClick={handleToggleOverlay}
        >
                {loading && <p>Loading...</p>}
      
          <h3>{podcast.title}</h3>
          <img
            src={podcast.image}
            alt={`Podcast - ${podcast.title}`}
            height="200"
            width="200"
          />


          <div className="overlay">
            <div className="podcast-item">
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
              
              <button onClick={() => handleShowClick(podcast.id)} className="View-seasons">View Seasons</button>
            </div>
          </div>

          <div className="seasons">
            <strong>
              <p>{podcast.title}</p>
              <p>Seasons: {podcast.seasons}</p>
              {favoriteShows.some((fav) => fav.id === show.id) ? (
              <button onClick={() => removeFromFavoriteShows(show.id)}>Remove from Favorites</button>
            ) : (
              <button onClick={() => addToFavoriteShows(show)}>Add to Favorites</button>
            )} 

            </strong>
          </div>

          {view === 'showDetail' && selectedShow ? (
            <div className="episodes-container">
              <button onClick={() => setView('startPhase')}>Back to Show List</button>
              <div>
                <h2>{selectedShow.title}</h2>
                {selectedShow.seasons.map((season) => (
                  <div key={season.number}>
                    <h3>Season {season.number}</h3>
                    {selectedSeason === season.number ? (
                      <ul>
                        {season.episodes.map((episode) => (
                          <Fragment key={episode.id}>
                            <h4>{episode.name}</h4>
                            <li>{episode.title}</li>
                            <p>{episode.description}</p>
                            <audio controls>
                              <source src={episode.file} />
                            </audio>
                          </Fragment>
                        ))}
                      </ul>
                    ) : (
                      <div className="image--">
                        <img className="showImg" src={season.image} alt={`Season ${season.number}`} />
                        <div>{season.episodes.length} Episodes</div>
                        <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
                      </div>
                    )}
                  </div>
                  
                ))}
              </div>
            </div>
            
          ) : null}
    </div>
    
  );
};

export default PodcastItem;
