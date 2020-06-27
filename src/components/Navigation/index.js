import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
//import { selectUser, selectToken } from "./store/user/selectors";
// import { selectUser, selectToken } from "./store/user/selectors";

export default function Navigation() {
  const token = useSelector(selectToken);
  const seniorCitizen = useSelector(selectUser);
  console.log("seniorCitizen", seniorCitizen.roles);
  const history = useHistory();

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand as={NavLink} to='/'>
        Connect Happiness
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path='/' linkText='Home' />
          <NavbarItem path='/ourservices' linkText='Events' />
          {token === null ||
          seniorCitizen.roles === "general" ||
          seniorCitizen.roles === "volunteer" ? (
            history.push("/login")
          ) : (
            <NavbarItem path='/shopping' linkText='Shopping' />
          )}
          {token === null || seniorCitizen.roles === "general" ? (
            history.push("./login")
          ) : (
            <NavbarItem path='/shoppingDetails' linkText='Open Requests' />
          )}
          {token === null ||
          seniorCitizen.roles === "general" ||
          seniorCitizen.roles === "volunteer" ? (
            history.push("/login")
          ) : (
            <NavbarItem path='/eventform' linkText='Start an Event' />
          )}

          {loginLogoutControls}
          {/* <NavbarItem path='/shopping' linkText='Shopping' /> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
