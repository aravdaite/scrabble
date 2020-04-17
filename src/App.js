import React from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import './App.css';
import Scrabble from './containers/Scrabble';
import About from './containers/About';
import Register from './containers/auth/Register';
import Login from './containers/auth/Login';
import forgotPassword from './containers/auth/forgotPassword';
import resetPassword from './containers/auth/resetPassword';
import { Toolbar, Footer } from './components';

export const App = () => {
  return (
    <div className="body">
      <BrowserRouter>
        <Toolbar />
        <Route exact path="/" component={Scrabble} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/forgotpassword" component={forgotPassword} />
        <Route path="/resetpassword/:token" component={resetPassword} />
      </BrowserRouter>
      <Footer />
    </div>
  )
}
