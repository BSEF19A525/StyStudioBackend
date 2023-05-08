import React from "react";
import review1 from "../../assets/review1.png";
import review2 from "../../assets/review2.png";
import review3 from "../../assets/review3.png";

function Testimonials() {
  return (
    <div className="testimonialtop">
      <div className="testwidth">
        <div className="gallerytext">
          <p>TESTIMONIALS</p>
          <h2 className="testrev">Read What Others Have To Say</h2>
        </div>
        <div className="reviewcenter">
          <div className="reviewbox">
            <div className="revwidth">
              <div className="revimg ">
                <img src={review1} alt="none" />
              </div>
              <h3 className="reviewname">Olivia Cole</h3>
              <p className="revdesc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                ullamcorper scelerisque mi, in malesuada felis malesuada vel.{" "}
              </p>
            </div>
            <div className="revwidth">
              <div className="revimg ">
                <img src={review2} alt="none" />
              </div>
              <h3 className="reviewname">Evan White</h3>
              <p className="revdesc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                ullamcorper scelerisque mi, in malesuada felis malesuada vel.{" "}
              </p>
            </div>
            <div className="revwidth">
              <div className="revimg ">
                <img src={review3} alt="none" />
              </div>
              <h3 className="reviewname">Jessica Page</h3>
              <p className="revdesc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                ullamcorper scelerisque mi, in malesuada felis malesuada vel.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="booked">
          <h2>Want to become the best salon in your area?</h2>
          <button>Register Now!!</button>
        </div>
        <div className="booked">
          <h2>Book your Appointment today in one of the best salons</h2>
          <button>Book An Appointment</button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
