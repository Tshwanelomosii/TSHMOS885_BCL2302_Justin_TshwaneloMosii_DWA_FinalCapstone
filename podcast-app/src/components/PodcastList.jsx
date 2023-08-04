import React, { useState, useEffect } from 'react';
import PodcastItem from './PodcastItem';
import './PodcastList.css';
const PodcastList = ({ podcasts, sortDirection, selectedGenre, searchQuery }) => {
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  useEffect(() => {
    // Apply sorting
    const sorted = [...podcasts];
    sorted.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortDirection === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    // Apply filtering based on selectedGenre
    const filteredPodcasts = selectedGenre
      ? sorted.filter((podcast) => podcast.genres.includes(parseInt(selectedGenre)))
      : sorted;
    // Apply filtering based on searchQuery
    const searchedPodcasts = searchQuery
      ? filteredPodcasts.filter((podcast) =>
          podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredPodcasts;
    setSortedPodcasts(searchedPodcasts);
  }, [podcasts, sortDirection, selectedGenre, searchQuery]);
  return (
    <div className="podcast-list">
      {sortedPodcasts.map((podcast) => (
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};
export default PodcastList;