import React from 'react';
import './components/LetterCard.css'
import Scrabble from './containers/Scrabble';
import { Toolbar, Footer } from './components'

export const App = () => (
  <div className="body">
    <Toolbar />
    <Scrabble />
    <Footer />
  </div>
)