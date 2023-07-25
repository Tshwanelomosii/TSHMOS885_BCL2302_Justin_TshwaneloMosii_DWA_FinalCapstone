// src/components/PodcastList.js
import React, { useState, useEffect } from 'react';
import PodcastItem from './PodCastItem';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  return (
    <div>
      <h2>Podcast List</h2>
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
