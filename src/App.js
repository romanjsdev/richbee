import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import './index.css';
import MainScreen from './components/MainScreen';
import MovieScreen from './components/MovieScreen';

function App(){
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <MainScreen/>
                </Route>
                <Route path="/:id" >
                    <MovieScreen/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;