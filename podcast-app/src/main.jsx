import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@shoelace-style/shoelace/dist/themes/light.styles.js'
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
