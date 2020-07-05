import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
// import logo from "../../images/logo.png";

export default function Navigation() {
  const token = useSelector(selectToken);
  const seniorCitizen = useSelector(selectUser);

  const history = useHistory();

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar className='nav_bar' bg='light' expand='lg'>
      <Navbar.Brand as={NavLink} to='/'>
        <div className='div_sapn_nav'>
          <span className='connect_span'>Connect </span> -
          <span className='happiness_span'>Happiness .</span>
        </div>
        {/* <div className='app-logo'>
          <img src={logo} />
        </div> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem exact path='/' linkText='Home' />
          <NavbarItem exact path='/ourservices' linkText='Events' />

          {token === null || seniorCitizen.roles !== "seniorCitizen" ? (
            history.push("/login")
          ) : (
            <NavbarItem exact path='/shopping' linkText='Request' />
          )}
          {token === null ||
          seniorCitizen.roles === "general" ||
          seniorCitizen.roles === "seniorCitizen" ? (
            history.push("./login")
          ) : (
            <NavbarItem
              exact
              path='/shoppingDetails'
              linkText='Open Requests'
            />
          )}
          {token === null || seniorCitizen.roles !== "seniorCitizen" ? (
            history.push("./login")
          ) : (
            <NavbarItem exact path='/myrequest' linkText='My Requests' />
          )}
          {token === null || seniorCitizen.roles !== "seniorCitizen" ? (
            history.push("/login")
          ) : (
            <NavbarItem exact path='/eventform' linkText='Start an Event' />
          )}

          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
