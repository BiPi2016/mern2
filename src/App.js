import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ExcerciseList from './components/ExcerciseList';
import CreateExcercise from './components/CreateExcercise';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
            <Route exact path="/">
              <ExcerciseList />
            </Route>
            <Route exact path="/excercises">
              <ExcerciseList />
            </Route>
            <Route path="/createExcercise/:id">
              <CreateExcercise />
            </Route>
            <Route path="/createExcercise">
              <CreateExcercise />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/createUser">
              <CreateUser />
            </Route>
      </Router>
    </div>
  );
}

export default App;
