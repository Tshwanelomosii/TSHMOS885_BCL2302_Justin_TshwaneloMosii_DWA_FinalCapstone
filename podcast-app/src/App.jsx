import React, { useEffect, useState } from 'react';
import PodcastList from './components/PodcastList';
import Header from './components/Header';
import PodcastItem from './components/PodcastItem';
const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className="app">
      <Header
        handleSort={handleSort}
        sortDirection={sortDirection}
        handleGenreChange={handleGenreChange}
        selectedGenre={selectedGenre}
        handleSearch={handleSearch}
      />
      <h1>Mic Drop Moments</h1>
      <PodcastList
        podcasts={podcasts}
        sortDirection={sortDirection}
        selectedGenre={selectedGenre}
        searchQuery={searchQuery}
        handlePodcastClick={handlePodcastClick}
      />
      {selectedPodcast && <PodcastItem selectedPodcast={selectedPodcast} />}
    </div>
  );
};
export default App;