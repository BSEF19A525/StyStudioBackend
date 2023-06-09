import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';


const Menuhide = ({ openSideBar, closeMenu, scrollBottom, scrollToAbout ,handleLogout}) => {
  const cookies = new Cookies();
  const userName = cookies.get('user');
  let firstName = "";
  if(userName){
  const nameParts = userName.split(" ");
  firstName = nameParts[0];
  }
  const location = useLocation();

  const handleLinkClick = () => {
    closeMenu();
  };

  const moveToContact = () => {
    scrollBottom();
    closeMenu();
  };

  const moveToAbout = () => {
    scrollToAbout();
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
            <Link to="/about" className="nav-link" onClick={moveToAbout}>
              {" "}
              About
            </Link>
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
              onClick={(handleLinkClick, moveToContact)}
            >
              {" "}
              Contact
            </NavLink>
          </li>
          {userName ?(
                <>
                <li>
                <FontAwesomeIcon icon={faUser} />
                <NavLink className="nav-link">{firstName}</NavLink>
                </li>
                <li>
                  <NavLink to="/logout" 
                  className="nav-link"
                  onClick={(handleLinkClick, handleLogout)}> Logout</NavLink>
                </li></>
               
                ):(<>
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
          </li></>)}
        </ul>
      </div>
    </>
  );
};

export default Menuhide;
