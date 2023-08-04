import React, { useState, useEffect } from 'react';
import PodcastItem from './PodcastItem';
import './PodcastList.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        // Apply filtering based on selectedGenre and searchQuery
        const filteredPodcasts = data.filter((podcast) => {
          const genreMatch = !selectedGenre || podcast.genres.includes(parseInt(selectedGenre));
          const titleMatch = !searchQuery || podcast.title.toLowerCase().includes(searchQuery.toLowerCase());
          return genreMatch && titleMatch;
        });

        // Apply sorting based on sortDirection
        const sortedPodcasts = filteredPodcasts.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          return sortDirection === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });

        setPodcasts(sortedPodcasts);
      });
  }, [sortDirection, selectedGenre, searchQuery]);

  const handleSearch = () => {
    // Apply filtering based on searchQuery
    // (This will trigger useEffect to update the podcast list)
    setPodcasts(podcasts);
  };

  return (
    <div>
      <h2>Podcast List</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item-container">
            <PodcastItem podcast={podcast} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
