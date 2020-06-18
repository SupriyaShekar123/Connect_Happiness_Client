import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import "./App.css";
import "./components/Home";
import "./components/OurServices";

import Home from "./components/Home";
import OurServices from "./components/OurServices";

function App() {
  return (
    <div className='App'>
      <nav>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          to='/'>
          Home
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "green",
          }}
          to='/ourservices'>
          OurServices
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "blue",
          }}
          to='/login'>
          Login
        </NavLink>
      </nav>
      <Switch>
        <Route exact path='/' component={Home} />

        {/* <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} /> */}
        <Route path='/ourservices' component={OurServices} />
      </Switch>
    </div>
  );
}

export default App;
