import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import Menuhide from "./Menuhide";
import { scroller } from "react-scroll";
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate(null);

  const cookies = new Cookies();
  const userName = cookies.get("user");
  console.log("Cookies: " + userName);
  let firstName = "";
  if (userName) {
    const nameParts = userName.split(" ");
    firstName = nameParts[0];
  }
  const [scrollToAboutOnLoad, setScrollToAboutOnLoad] = useState(false);
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

  const handleIconClick = async () => {
    const authenticateResponse = await axios.get(
      "http://localhost:8000/individual",
      {
        withCredentials: true,
      }
    );
    if (authenticateResponse.status === 200) {
      toast.dismiss();

      // Move the user to the individual page
      // console.log("User authenticated");
      navigate("/individual", {
        state: { user: authenticateResponse.data },
      });
      console.log(authenticateResponse);
    } else {
      // throw new Error("User authentication failed");
      console.log("User Authentication Failed");
    }
  };

  //kinza's code
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/logout", {
        withCredentials: true,
      });

      // window.location.reload();
      //if user successfully logout
      if (response.status === 200) {
        console.log("User logged out");
        navigate("/login");
        //not move to back btn(any other page) after logout
        const disableBackButton = () => {
          window.history.pushState(null, "", window.location.pathname);
          window.addEventListener("popstate", handleBackButtonPress);
        };

        const handleBackButtonPress = () => {
          window.history.pushState(null, "", window.location.pathname);
        };
        disableBackButton();
        return () => {
          window.removeEventListener("popstate", handleBackButtonPress);
        };
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

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
                    <NavLink exact="true" to="/">
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

                  {userName ? (
                    <>
                      <li>
                        <FontAwesomeIcon icon={faUser} /> {"    "}
                        <NavLink
                          onClick={handleIconClick}
                          style={{ marginLeft: "3px" }}
                        >
                          {firstName}
                        </NavLink>
                        <br></br>
                        <br></br>
                      </li>

                      <li>
                        <NavLink to="/logout" onClick={handleLogout}>
                          Logout
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/login">Login</NavLink>
                      </li>
                      <li>
                        <NavLink to="/signup">Register</NavLink>
                      </li>
                    </>
                  )}
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
                handleLogout={handleLogout}
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
      <ToastContainer />
    </>
  );
}

export default Navbar;
