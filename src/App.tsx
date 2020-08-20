import React, { ReactElement } from 'react';
import './App.css';
import Controls from './components/Controls';

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading View Watchlist Generator</h1>
      </header>
      <main>
        <h2>Select from the exchanges below</h2>
        <Controls />
      </main>
    </div>
  );
}

export default App;
