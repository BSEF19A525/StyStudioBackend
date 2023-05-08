import React from "react";
import eyes from "../../assets/bgeyes.png";
import lines from "../../assets/curllines.png";

function Welcome() {
  return (
    <>
      <div className="welcometop top">
        <div className="welcomeflex navwidth">
          <div className="textwidth">
            <h1 className="welcometext">
              Want all your local area Salons at one place?{" "}
            </h1>
          </div>
          <div>
            <img src={eyes} alt="none" />
          </div>
        </div>
      </div>
      <div className="curline">
        <img src={lines} alt="none" />
      </div>
    </>
  );
}

export default Welcome;
