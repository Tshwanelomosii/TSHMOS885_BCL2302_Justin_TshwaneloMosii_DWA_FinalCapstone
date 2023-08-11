import React, { useState } from "react";
import "./Header.css";
const Header = ({//header taking several props
  handleSort,
  sortDirection,
  handleSearch,
  handleGenreChange,
  selectedGenre,
}) => {//searchQuery using states and genremapping
  const [searchQuery, setSearchQuery] = useState("");
  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  //handleSearchInputChange that is triggered when the user changes the search input. It updates the searchQuery
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); // Call the handleSearch function passed from App
  };
  return (
    
    <header className="app-header">
      <div className="chanelName">
        <h1>News on News</h1>
      </div>
     
    
      {/* Sorting dropdown */}
      <div className="sort-dropdown">
        <select
          id="sort"
          value={sortDirection}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Search input */}
      <div className="search-box">
              <input
                id="input"
                type="text"
                placeholder="Search podcasts by title..."
                value={searchQuery}
                onChange={handleSearchInputChange} // Handle search input change
              />
              
            </div>

      {/* Genre selection dropdown */}
      <div className="genre-dropdown">
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a Genre</option>
          {Object.keys(genreMapping).map((genreId) => (
            <option key={genreId} value={genreId}>
              {genreMapping[genreId]}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
export default Header;