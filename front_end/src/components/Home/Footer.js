import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
function Footer() {
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
  const topOfScreen = () => {
    window.scrollTo(0, 0);
  };

  return (
    // testimonialtop
    // testwidth
    // reviewbox

    <div className="footer-top" id="footersection">
      <div className=" footer-width">
        <div className=" bgreen">
          <div className="logoimgbox fsec-w">
            <img className="logo f-logo" src={logo} alt="none" />
            <h1 className="footerhead">StyStudio</h1>
          </div>
          <div className="quicklinks fsec-w">
            <h2>Quick links</h2>
            <ul>
              <li>
                {" "}
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <Link to="/about" onClick={scrollToAbout}>
                  {" "}
                  About
                </Link>
              </li>
              <li>
                <NavLink to="/gallery" onClick={topOfScreen}>
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={topOfScreen}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footerdata fsec-w">
            <h2 className="bold">Get in touch</h2>
            <p><a href="mailto:stystudio@example.com">Stystudio@example.com</a></p>
            <p><a href="tel:777-123-4567">777-123-4567</a></p>
          </div>
          <div className="footerdata fsec-w">
            <h2 className="bold">Get the latest news</h2>
            <input type="text" placeholder="Your email here..." />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
