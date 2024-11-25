import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Countries from './components/Countries/Countries';
import Details from './components/Details/Details';
import './App.css';

function App() {
  return (
    <Router>
      <div className="box">
        <div className="mainContent">
          <Countries />
          <Details />
        </div>
      </div>
    </Router>
  );
}

export default App;
