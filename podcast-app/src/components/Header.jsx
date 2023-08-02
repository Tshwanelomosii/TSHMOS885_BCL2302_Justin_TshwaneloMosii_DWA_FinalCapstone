import React from 'react';
import { SlButton,SlInput } from '@shoelace-style/shoelace/dist/react';
import './Header.css';


const Header = () => {
  return (
    <div className='navbar'>
      <nav >
        <ul>
          <li><SlButton>Home</SlButton></li>
          <li><SlButton>Discovery</SlButton></li>
          <li><SlButton>favourites</SlButton></li>
        </ul>
      </nav>
          <div className='searchButton'>
            <SlInput  type='text'  placeholder='Search Podcast' width='30px'/>
            <SlButton>Search</SlButton>
          </div>
      
      

      

    </div>
  )
}

export default Header;