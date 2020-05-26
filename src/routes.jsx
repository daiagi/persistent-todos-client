import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './login/login';
import App from './app/app';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/home">
        <App />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>


    </Switch>


  );
}

export default Routes;
