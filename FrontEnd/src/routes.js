import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import UserAccount from './components/UserAccount.jsx';
import LogIn from './components/LogIn.jsx';
import UploadMovie from './components/UploadMovie.jsx';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';

class Routes extends Component {
  render() {
    return (
        <div>
          <Switch >                
            <Route exact path = { `/` } component = { HomePage }/> 
            <Route path = { `/Login` } component = { LogIn }/>
            <Route path = { `/UserAccount` } component = { UserAccount }/>                           
            <Route path = { `/UploadMovie` } component = {UploadMovie} />
            <Route path = { `/MovieDetail/:movieId` } component = {MovieDetail} />
            <Route path = { `/MovieByKey/:key` } component = {MovieList} />
            <Route path = { `/MovieByCategory/:category` } component = {MovieList} />
            <Route path = { `/MovieByCategory/:category/:key` } component = {MovieList} />     
          </Switch>
        </div>
    );
  }
}

export default Routes;
