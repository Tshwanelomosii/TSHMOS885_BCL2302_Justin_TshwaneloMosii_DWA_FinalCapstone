import React, { useEffect, useState } from 'react';
import PodcastList from './components/PodcastList';
import Header from './components/Header';
import PodcastItem from './components/PodcastItem';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';

const App = () => {//component initializes several state variables using the `useState` hook
  const [podcasts, setPodcasts] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {//The `useEffect` hook is used to fetch podcast data from the URL 
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSort = () => {//The `handleSort` function is defined to toggle the `sortDirection` state between "asc" and "desc" based on the current value.
    setSortDirection((prevSortDirection) =>
      prevSortDirection === 'asc' ? 'desc' : 'asc'
    );
  };
  const handlePodcastClick = (podcast) => {// The `handlePodcastClick` function is defined to set the `selectedPodcast` state to the clicked
    setSelectedPodcast(podcast);
  };
  const handleGenreChange = (event) => {// The `handleGenreChange` function is defined to update the `selectedGenre
    setSelectedGenre(event.target.value);
  };
  const handleSearch = (query) => {//The `handleSearch` function is defined to update the `searchQuery` state based on the search input in the `Header` component.
    setSearchQuery(query);
  };
  return (
    <div className="app"> 

   {/*Header` component is rendered with props for handling sorting, genre selection, and search functionality.*/} 
      <Header 
        handleSort={handleSort}
        sortDirection={sortDirection}
        handleGenreChange={handleGenreChange}
        selectedGenre={selectedGenre}
        handleSearch={handleSearch}
      />


<div className="carousel-container"> 
        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true}>
          {podcasts.map((podcast) => (
            <div className="carousel-slide" key={podcast.id}>
              <img src={podcast.image} alt={`Podcast - ${podcast.title}`} />
            </div>
          ))}
        </Carousel>
      </div>


      
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