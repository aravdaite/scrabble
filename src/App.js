import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Scrabble from './containers/Scrabble';
import About from './containers/About';
import { Toolbar, Footer } from './components';


export const App = () => (
  <div className="body">
    <BrowserRouter>
      <Toolbar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Scrabble} />
      </Switch>
    </BrowserRouter>
    <Footer />
  </div>
)