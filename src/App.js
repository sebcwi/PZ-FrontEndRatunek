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
import RegisterPage from './Pages/RegisterPage';
import MapPage from './Pages/MapPage';
import EditTastePage from './Pages/EditTastePage';
import AddTastePage from './Pages/AddTastePage';

function App() {
  return (
    <Router>
      <NavBarComponent/>
      <div>
        <Switch>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/mapa" component={MapPage}/>
          <Route exact path="/profile" component={ProfilePage}/>
          <Route exact path="/lodziarnia" component={LodziarniaPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/editTastePage" component={EditTastePage}/>
          <Route exact path="/addTastePage" component={AddTastePage}/>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
