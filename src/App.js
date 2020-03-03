import React from 'react';
import './App.css';
import Scrabble from './containers/Scrabble';
import Toolbar from './components/navigation/Toolbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="body">
      <Toolbar />
      <Scrabble />
      <Footer />

    </div>
  );
}

export default App;
