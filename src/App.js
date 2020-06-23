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
import SSEClient from "./components/SSEClient";

import Home from "./components/Home";
import OurServices from "./components/OurServices";
import EventsDetails from "./components/EventsDetails";
import ShoppingLists from "./components/ShoppingLists";
import ShoppingDetails from "./components/ShoppingDetails";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  // const evtSource = new EventSource("http://localhost:4000/stream");
  // evtSource.onmessage = function (e) {
  //   console.log(e.data);
  // };
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className='App'>
      <SSEClient />
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
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "blue",
          }}
          to='/shopping'>
          Shopping
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "blue",
          }}
          to='/shoppingDetails'>
          ShoppingDetails
        </NavLink>
      </nav>

      <Navigation />
      <MessageBox />

      {isLoading ? <Loading /> : null}

      <Switch>
        {/* <Route exact path='/sse' component={SSEClient} /> */}
        <Route exact path='/' component={Home} />

        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/ourservices' component={OurServices} />
        <Route path='/events/:id' component={EventsDetails} />
        <Route path='/shopping' component={ShoppingLists} />
        <Route path='/shoppingDetails' component={ShoppingDetails} />
      </Switch>
    </div>
  );
}

export default App;
