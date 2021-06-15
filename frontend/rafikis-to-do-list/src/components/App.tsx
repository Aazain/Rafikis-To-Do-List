import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from './List';
import UserInputs from './UserInputs';


function App() {
  return (
    <Router>
      <Route path={["/", "/login"]} exact component={UserInputs}></Route>
      <Route path="/signup" component={UserInputs}></Route>
      <Route path="/list" component={List}></Route>
    </Router>
  );
}

export default App;
