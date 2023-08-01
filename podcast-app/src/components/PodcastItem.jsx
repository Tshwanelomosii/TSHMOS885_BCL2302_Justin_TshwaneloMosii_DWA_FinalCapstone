// src/components/PodcastItem.js
import React from 'react';
import '../components/PodcastItem.css';

const PodcastItem = ({ podcast }) => {
  return (
    <div className="podcast-item">
      <h3>{podcast.title}</h3>
      <img src={podcast.image} alt={podcast.title} />
      <p>{podcast.description}</p>
    </div>
  );
};

export default PodcastItem;
