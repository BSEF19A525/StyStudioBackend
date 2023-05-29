import React from "react";
import face from "../../assets/bgface.png";

function About() {
  return (
    <div className="top">
      <div className="navwidth">
        <div className="welcomeflex about-flex">
          <div className="faceimg">
            <img src={face} alt="none" />
          </div>
          <div className="abouttext">
            <h3>Welcome To</h3>
            <h1>StyStudio</h1>
            <p>
              Empowering salons to showcase their services on a centralized
              platform. Streamlining salon discovery and connecting salons with
              customers. A comprehensive solution for salons to register, create
              profiles, and attract a broader customer base. User-friendly
              interface and extensive features for seamless salon promotion. The
              go-to platform for discovering and booking top-notch salon
              services.
            </p>
            <button className="btn">See More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
