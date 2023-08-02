// src/components/App.js
import React from 'react';
import PodcastList from '../src/components/PodcastList';
import Header from './components/Header';


// App.jsx
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.6.0/cdn/');
 


const App = () => {
  return (
    <div>
      <Header />
      <h1>Podcast App</h1>
      <PodcastList />
    </div>
  );
};

export default App;
