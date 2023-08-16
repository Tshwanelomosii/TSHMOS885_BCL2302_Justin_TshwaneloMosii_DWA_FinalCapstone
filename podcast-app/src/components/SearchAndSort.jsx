//SearchAndSort


import { useState } from 'react';

const SearchAndSort = ({ searchQuery, handleSearchChange, sortBy, handleSortChange, handleGenreChange }) => {
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

  const [selectedGenre, setSelectedGenre] = useState(''); // State for selected genre

  return (
    <div className="search-sort-container"> {/* Add a class to the div container */}
      <input type="text" placeholder="🔍 Search shows" value={searchQuery} onChange={handleSearchChange} />

      <select value={sortBy} onChange={handleSortChange}>
        <option value="asc">Sort by Title A-Z </option>
        <option value="des">Sort by Title Z-A </option>
        <option value="title">Sort by Title </option>
        <option value="genre">Sort by Genre </option>
        <option value="date">Sort by Date</option>
        <option value=""></option>
      </select>

      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">All Genres</option>
        {Object.entries(genreTitleMapping).map(([genreId, genreTitle]) => (
          <option key={genreId} value={genreId}>
            {genreTitle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndSort;