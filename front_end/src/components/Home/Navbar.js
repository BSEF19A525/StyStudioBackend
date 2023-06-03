import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { NavLink, Link, useLocation } from "react-router-dom";
import Menuhide from "./Menuhide";
import { scroller } from "react-scroll";
import axios from 'axios';
import Cookies from 'universal-cookie';



function Navbar() {
  const cookie = new Cookies();
  const [user,setUser] = useState(null);
  const [scrollToAboutOnLoad, setScrollToAboutOnLoad] = useState(false);
  const getUserData = async () =>{
          const res = await fetch('' ,{
            method : "GET",
            headers : {
              Accept : "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include"
          })
  } 
  useEffect(() =>{
      getUserData();
  },[]);
  const location = useLocation();
 

  useEffect(() => {
    if (location.pathname === "/gallery" || location.pathname === "/") {
      setScrollToAboutOnLoad(true);
    }
  }, [location.pathname]);

  const scrollToAbout = () => {
    if (scrollToAboutOnLoad) {
      setTimeout(() => {
        scroller.scrollTo("aboutSection", {
          smooth: true,
          offset: -50,
        });
      }, 500); // Adjust the delay as needed
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const footerSection = document.getElementById("footersection");
      if (footerSection) {
        footerSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 900);
  };
   const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8000/logout', { withCredentials: true });

      if (response.status === 200) {
        console.log('User logged out');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  }
  return (
    <>
      <div className="top">
        <div className="navwidth">
          <div className="menubar">
            <div className="logoimgbox">
              <div className="bothlogo">
                <img className="logo" src={logo} alt="none" />
                <h1 className="name1">StyStudio</h1>
              </div>
            </div>
            <div className="navlinks">
              <div className="menuflex">
                <ul>
                  <li>
                    <NavLink exact to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <Link to="/about" onClick={scrollToAbout}>
                      About
                    </Link>
                  </li>
                  <li>
                    <NavLink to="/gallery">Gallery</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" onClick={scrollToBottom}>
                      Contact
                    </NavLink>
                  </li>
                  <li>
                     {}
                  </li>

                  <li>
                    <NavLink to="/logout" onClick={handleLogout}> LogOut</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Register</NavLink>
                  </li>
                
                </ul>
              </div>
            </div>
            {/* show  hide menubar */}
            {isOpen && (
              <Menuhide
                openSideBar={setIsOpen}
                closeMenu={closeMenu}
                scrollBottom={scrollToBottom}
                scrollToAbout={scrollToAbout}
              />
            )}
          </div>
        </div>
        <div className="headmenu">
          <i
            className="fa fa-align-justify"
            onClick={() => {
              setIsOpen(true);
            }}
          ></i>
        </div>
      </div>
      {/* <Menuhide/> */}
    </>
  );
}

export default Navbar;
