import React from "react";
import lines from "../../assets/curllines.png";
import asalon from "../../assets/asalon.jpg";
import bsalon from "../../assets/bsalon.jpg";
import csalon from "../../assets/csalon.jpg";

function HomeGallery() {
  return (
    <div className="gallerytop">
      <div className="gallerywidth">
        <div className="gallerytext">
          <h1>Here you can find</h1>
          <h3>The best salons in your area</h3>
        </div>
        <div className="salonsdata">
          <div className="salongal">
            <div className="galimg">
              <img src={asalon} alt="none" />
            </div>
            <div className="galimg">
              <img src={bsalon} alt="none" />
            </div>
            <div className="galimg">
              <img src={csalon} alt="none" />
            </div>
          </div>
        </div>
        <div className="upbtn">
          <button className="btn">See more</button>
        </div>
        <div className="curlines">
          <img src={lines} alt="none" />
        </div>
      </div>
    </div>
  );
}

export default HomeGallery;
