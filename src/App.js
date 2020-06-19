// import React from "react";
// import { Switch, Route, NavLink } from "react-router-dom";

// import "./App.css";
// import "./components/Home";
// import "./components/OurServices";
// import Login from "./pages/Login";
// import SignUp from "./pages/Signup";

import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import Home from "./components/Home";
import OurServices from "./components/OurServices";
import EventsDetails from "./components/EventsDetails";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

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

      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}

      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/ourservices' component={OurServices} />
        <Route path='/events/:id' component={EventsDetails} />
      </Switch>
    </div>
  );
}

export default App;
