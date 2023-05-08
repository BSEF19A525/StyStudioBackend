import React from "react";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <div className="testimonialtop">
      <div className="testwidth">
        <div className="reviewbox bgreen">
          <div className="logoimgbox">
            <img className="logo" src={logo} alt="none" />
          </div>
          <div>
            <h1 className="footerhead">StyStudio</h1>
          </div>
          <div className="quicklinks">
            <h2>Quick links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Gallery</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
              <li>
                <a href="/">Testimonials</a>
              </li>
            </ul>
          </div>
          <div className="footerdata">
            <h2 className="bold">Get in touch</h2>
            <p>Stystudio@example.com</p>
            <p>777-123-4567</p>
          </div>
          <div className="footerdata">
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
