import './App.css';
import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBarComponent from './component/NavBarComponent';

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage';
import LodziarniaPage from "./Pages/LodziarniaPage"

function App() {
  return (
    <Router>
      <NavBarComponent/>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/profile" component={ProfilePage}/>
          <Route exact path="/lodziarnia" component={LodziarniaPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
