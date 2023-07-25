// src/components/PodcastList.jsx
import React, { useState, useEffect } from 'react';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://podcast-api.netlify.app')
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  return (
    <div>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>{podcast.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastList;
