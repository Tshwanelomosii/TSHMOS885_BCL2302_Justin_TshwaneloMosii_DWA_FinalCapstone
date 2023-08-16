import { useState, useEffect } from 'react';
import SearchAndSort from './SearchAndSort';
import './Header.css'



const Header = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
  const [niceTime, setNiceTime] = useState('');
  const [showAbout, setShowAbout] = useState(false); // State to control About visibility

  // Function to get the current date and time in a nice format
  const getNiceTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const niceHours = hours % 12 || 12;
    const niceMinutes = minutes.toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year} - ${niceHours}:${niceMinutes} ${ampm}`;
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  // Update the niceTime state every minute to keep the time up-to-date
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNiceTime(getNiceTime());
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className='tlhogo'>

      <nav className='search'>
        <div className="nice-time">
          {niceTime}
        </div>
        <SearchAndSort
// Pass the niceTime prop to the SearchAndSort component
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
      </nav>
      {showAbout && <About />} {/* Conditionally render the About component */}
    </header>
  );
};

export default Header;