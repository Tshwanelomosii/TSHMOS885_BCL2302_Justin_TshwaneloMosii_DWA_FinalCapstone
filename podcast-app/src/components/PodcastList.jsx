import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Header from './Header';
import CarouselComponent from './CarosuselComponent';
import './PodcastList.css'


const PodcastList = () => {

  const [previewData, setPreviewData] = useState([]);
  const [showData, setShowData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [loadingShow, setLoadingShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title'); 
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedPreviewId, setSelectedPreviewId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState('signUpPhase');
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [favoriteEpisodesSearchQuery, setFavoriteEpisodesSearchQuery] = useState('');
  const [favoriteEpisodesSortBy, setFavoriteEpisodesSortBy] = useState('title');
  

  const genreTitleMapping = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get('https://podcast-api.netlify.app/shows');
      const data = response.data;
      setPreviewData(data);
      setLoadingPreview(false);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const fetchShowDetails = async (showId) => {
    try {
      setLoadingShow(true);
      const response = await axios.get(`https://podcast-api.netlify.app/id/${showId}`);
      const data = response.data;
      setShowData(data);
      setSelectedSeason(null);
      setLoadingShow(false);
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };



  const addToFavoriteShows = (show) => {
    setFavoriteShows((prevFavorites) => [...prevFavorites, show]);
  };

  const removeFromFavoriteShows = (showId) => {
    setFavoriteShows((prevFavorites) => prevFavorites.filter((fav) => fav.id !== showId));
  };

  const addToFavoriteEpisodes = (episodeId) => {
    if (!favoriteEpisodes.some((fav) => fav.id === episodeId)) {
      const episodeToAdd = showData.seasons
        .flatMap((season) => season.episodes)
        .find((episode) => episode.id === episodeId);
  
      if (episodeToAdd) {
        setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episodeToAdd]);
      }
    }
  };

  const removeFromFavoriteEpisodes = (episodeId) => {
    setFavoriteEpisodes((prevFavorites) => prevFavorites.filter((fav) => fav.id !== episodeId));
  };

  const handleSortByGenre = (genreId) => {
    setSelectedGenre(genreId);
  };
  


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    if (newSortBy === 'genre') {
      handleSortByGenre('genre'); // Call handleSortByGenre with a genre ID
    }
  };
  
  

  const handleShowClick = (showId) => {
    fetchShowDetails(showId);
  };

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  useEffect(() => {
    let sortedShows = [...previewData];
  
    if (sortBy === 'asc' || sortBy === 'des') {
      // Sorting by title
      sortedShows = sortedShows.sort((a, b) =>
        sortBy === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    } else if (sortBy === 'genre') {
      // Sorting by genre ID
      sortedShows = sortedShows.sort((a, b) => a.genres - b.genres);
    } else if (sortBy === 'date') {
      // Sorting by release date
      sortedShows = sortedShows.sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    }
  
    // Apply genre filter
    if (selectedGenre) {
      sortedShows = sortedShows.filter((show) => show.genres.includes(selectedGenre));
    }
  
    // Apply search filter
    const filteredShows = sortedShows.filter((show) =>
      show.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setFilteredData(filteredShows);
  }, [previewData, searchQuery, sortBy, selectedGenre]);  
  
  
  const toggleDescription = (previewId) => {
    setSelectedPreviewId((prevId) => (prevId === previewId ? null : previewId));
  };
  

  if (loadingPreview) {
    return <div className="load"><h1>Loading...</h1></div>;
  }

  const filteredEpisodes = (selectedSeason) => {
    if (selectedSeason) {
      return showData.seasons.find((season) => season.number === selectedSeason)?.episodes || [];
    }
    return showData.episodes || [];
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const renderFavoriteEpisodes = () => {
    const filteredFavoriteEpisodes = favoriteEpisodes.filter((episode) =>
      episode.title.toLowerCase().includes(favoriteEpisodesSearchQuery.toLowerCase())
    );

    const sortedFavoriteEpisodes = [...filteredFavoriteEpisodes];

    if (favoriteEpisodesSortBy === 'title') {
      sortedFavoriteEpisodes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (favoriteEpisodesSortBy === 'date') {
      sortedFavoriteEpisodes.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }

    return (
      <ul>
        {sortedFavoriteEpisodes.map((episode) => (
          <li key={episode.id}>
            <h4>{episode.name}</h4>
            <p>{episode.title}</p>
            <audio controls>
              <source src={episode.file} />
            </audio>
            {favoriteEpisodes.some((fav) => fav.id === episode.id) ? (
              <button onClick={() => removeFromFavoriteEpisodes(episode.id)}>Remove from Favorites⭐</button>
            ) : (
              <button onClick={() => addToFavoriteEpisodes(episode.id)}>Add to Favorites🌟</button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  

  if (showData) {
    return (
      <div className="container">
        <button onClick={() => setShowData(null)}>Home 🏠</button>
        <div>
          <h2>{showData.title}</h2>
          {showData.seasons.map((season) => (
            <div key={season.number}>
              <h3>Season {season.number}</h3>
              {selectedSeason === season.number ? (
                <ul>
                  {season.episodes.map((episode) => (
                    <Fragment key={episode.id}>
                      <h4>{episode.name}</h4>
                      <p>{episode.title}</p>
                      <p>{episode.description}</p>
                      <audio controls>
                        <source src={episode.file} />
                      </audio>
                      {favoriteEpisodes.some((fav) => fav.id === episode.id) ? (
                        <button onClick={() => removeFromFavoriteEpisodes(episode.id)}>Remove from Favorites⭐</button>
                      ) : (
                        <button onClick={() => addToFavoriteEpisodes(episode.id)}>Add to Favorites🌟</button>
                      )}
                    </Fragment>
                  ))}
                </ul>
              ) : (
                <div>
                  <img className='photo' src={season.image} alt={`Season ${season.number}`} />
                  <div>{season.episodes.length} Episodes</div>
                  <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="favorites-list">
          <div className="favorite-episodes">
            <h2>Your Favorite Episodes</h2>
            {favoriteEpisodes.map((favEpisode) => (
              <div key={favEpisode.id}>
                <h3>{favEpisode.name}</h3>
                <p>{favEpisode.title}</p>
                <button onClick={() => removeFromFavoriteEpisodes(favEpisode.id)}>Remove from Favorites⭐</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  const carouselImages = filteredData.map((show) => show.image);

  return (
    
    <div className="Podcast-container">
      {isLoggedIn !== 'signUpPhase' ? (
        <Login />
      ) : (
        <>
      <Header
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          previewData={previewData} 
      />

      
<ul className="preview-list">
<CarouselComponent className='custom-carousel' images={carouselImages} />


  {filteredData.length === 0 ? (
    <h1>No results found.</h1>
  ) : (
    filteredData.map((show) => (
      <li key={show.id} className="preview-item">
        <div className="image">
          <img src={show.image} alt={show.title} className="preview-image" />
        </div>
        <div className="infos">
          <h3>Title: {show.title}</h3>
          <p>Genre: {genreTitleMapping[show.genres]}</p>
          <p>Seasons: {show.seasons}</p>
          <p>Last Updated: {formatDate(show.updated)}</p>
        </div>
        <button onClick={() => toggleDescription(show.id)}>
          {selectedPreviewId === show.id ? "Hide Description📕" : "Description📖"}
        </button>

        {selectedPreviewId === show.id && (
          <div className="preview-description">{show.description}</div>
        )}
        
        <button onClick={() => handleShowClick(show.id)}>Seasons📚</button>
        
        {favoriteShows.some((fav) => fav.id === show.id) ? (
          <button onClick={() => removeFromFavoriteShows(show.id)}>Remove from Favorites⭐</button>
        ) : (
          <button onClick={() => addToFavoriteShows(show)}>Add to Favorites🌟</button>
        )}
      </li>
    ))
  )}
</ul>

        </>
      )}
      <div className="favorite-shows">
        <h2>Your Favorite Shows</h2>
        {favoriteShows.map((favShow) => (
          <div key={favShow.id}>
            <h3>{favShow.title}</h3>
            <p>{favShow.seasons} Seasons</p>
            <button onClick={() => removeFromFavoriteShows(favShow.id)}>Remove from Favorites⭐</button>
          </div>
        ))}
      </div>
      <div className="favorite-episodes">
      <h2>Your Favorite Episodes</h2>
        <input
          type="text"
          placeholder="Search favorite episodes"
          value={favoriteEpisodesSearchQuery}
          onChange={(e) => setFavoriteEpisodesSearchQuery(e.target.value)}
        />
        <select value={favoriteEpisodesSortBy} onChange={(e) => setFavoriteEpisodesSortBy(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Date</option>
        </select>
        {renderFavoriteEpisodes()}
      </div>
    </div>
  );
};

export default PodcastList;