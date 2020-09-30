import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom";
import CarMakeList from './components/CarMakeList';
import CarModelListComponent from './components/CarModelListComponent';

const App = () => {
  return (
    <div className="App">
      <Router>

        <nav className="navigetion">
          <NavLink className="navigetionLink" to="/makes">Makes</NavLink>
          <NavLink className="navigetionLink" to="/models">Models</NavLink>
        </nav>

        <Switch>
          <Route exact path="/">
            <Redirect to="/makes" />
          </Route>
          <Route path="/makes">
            <CarMakeList />
          </Route>
          <Route path="/models">
            <CarModelListComponent />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
