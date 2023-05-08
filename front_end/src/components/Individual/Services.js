import React from "react";
import hair_oil from "../../assets/hair_oil.jpg";
import hair_style from "../../assets/hair_style.jpg";
import facial from "../../assets/facial.jpg";
const Services = () => {
  return (
    <>
      <div className="service-parent">
        <div className="service-width">
          <div className="service-title">Explore Our Services</div>
          <div className="service-main">
            {/* Service 1 */}
            <div className="service-1 sv-width">
              <div className="svc-img">
                <img src={hair_oil} alt="hairOil" />
              </div>
              <div className="svc-name">Hair Oil</div>
            </div>
            {/* Service 2 */}
            <div className="service-2 sv-width">
              <div className="svc-img">
                <img src={facial} alt="Facial" />
              </div>
              <div className="svc-name">Facial</div>
            </div>
            {/* Service 3 */}
            <div className="service-3 sv-width">
              <div className="svc-img">
                <img src={hair_style} alt="hairStyle" />
              </div>
              <div className="svc-name">Hair Style</div>
            </div>
          </div>
          <div className="see-more">
            <button>See More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
