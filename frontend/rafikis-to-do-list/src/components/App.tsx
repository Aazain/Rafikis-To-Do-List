import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import List from './List';
import UserRegistration from './UserRegistration';


function App() {
  return (
    <Router>
      <Route path={["/", "/login"]} component={UserRegistration} exact></Route>
      <Route path="/signup" component={UserRegistration}></Route>
      <Route path="/list" component={List}></Route>
    </Router>
  );
}

export default App;
