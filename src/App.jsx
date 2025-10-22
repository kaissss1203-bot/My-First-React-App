import React from 'react';
import logo from './logo.svg';
import './App.css';
import TennisBlueScoreboardStandalone from './TennisBlueScoreboardStandalone';
import Test from './Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{width: "50%"}}>
          <TennisBlueScoreboardStandalone/>
          <Test/>
        </div>
      </header>
    </div>
  );
}

export default App;
