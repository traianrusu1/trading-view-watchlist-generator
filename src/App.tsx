import React, { ReactElement } from 'react';
import './App.css';
import Controls from './components/Controls';
import Trending from './components/Trending/Trending';

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TradingView Watchlist Generator</h1>
      </header>
      <main>
        <Controls />
        <div className="divider" />
        <Trending />
      </main>
    </div>
  );
}

export default App;
