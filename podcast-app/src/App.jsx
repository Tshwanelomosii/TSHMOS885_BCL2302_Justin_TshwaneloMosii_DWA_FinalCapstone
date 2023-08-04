import React, { useEffect, useState } from 'react';
import PodcastList from './components/PodcastList';
import Header from './components/Header';

const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSort = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="app">
      <Header handleSort={handleSort} sortDirection={sortDirection}
      handleGenreChange={handleGenreChange}
      selectedGenre={selectedGenre} />
      <h1>News on </h1>
      <PodcastList podcasts={podcasts} sortDirection={sortDirection} 
      selectedGenre={selectedGenre}
      handlePodcastClick={handlePodcastClick}/>
      {selectedPodcast && (
        <PodcastDetails selectedPodcast={selectedPodcast} />
      )}
    </div>
  );
};

export default App;