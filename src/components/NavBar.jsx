import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <NavLink
        exact
        to="/"
        className="navbar-link"
        activeClassName="navbar-link-active"
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/dashboard"
        className="navbar-link"
        activeClassName="navbar-link-active"
      >
        Dashboard
      </NavLink>
      <NavLink
        exact
        to="/students"
        className="navbar-link"
        activeClassName="navbar-link-active"
      >
        Students
      </NavLink>
      <NavLink
        exact
        to="/enroll-student"
        className="navbar-link"
        activeClassName="navbar-link-active"
      >
        Enroll student
      </NavLink>
      <NavLink
        exact
        to="/profile"
        className="navbar-link"
        activeClassName="navbar-link-active"
      >
        Profile
      </NavLink>
      <h1>You're Logged In As An Admin!</h1>
    </div>
  );
}

export default NavBar;
