// src/components/PodcastItem.js
import React from 'react';
import '../components/PodcastItem.css';

const PodcastItem = ({ podcast }) => {
  return (
    <div className="podcast-item">
      <h3>{podcast.title}</h3>
      <img src={podcast.image} alt={podcast.title} />
      <p>{podcast.description.slice(0,50)}</p>
      <h4>Genre:{podcast.genre}</h4>
      <h4>Seasons:{podcast.seasons}</h4>
      <h4>Episodes: {podcast.episodes}</h4>
    </div>
  );
};

export default PodcastItem;
