import React from "react";
import { NavLink } from "react-router-dom";

const Menuhide = ({ openSideBar, scrollToAbout, closeMenu }) => {
  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      <div className="sidebar-menu">
        <ul>
          <li className="cross">
            <i
              className="fa fa-times"
              onClick={() => {
                openSideBar(false);
              }}
            ></i>
          </li>
          <li>
            {" "}
            <NavLink to="/" className="nav-link" onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-link"
              onClick={{ scrollToAbout, handleLinkClick }}
            >
              {" "}
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="nav-link"
              onClick={handleLinkClick}
            >
              {" "}
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link" onClick={handleLinkClick}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menuhide;
