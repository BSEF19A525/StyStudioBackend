import React from "react";
import { useNavigate } from "react-router-dom";
function Bookandregister() {
  const navigate = useNavigate(null);

  return (
    <div className="testimonialtop book-register">
      <div className="testwidth">
        <div className="booked">
          <h2>Want to become the best salon in your area?</h2>
          <button
            onClick={() => {
              navigate("/signup");
              window.scrollTo(0, 0);
            }}
          >
            Register Now!!
          </button>
        </div>
        <div className="booked">
          <h2>Book your Appointment today in one of the best salons</h2>
          <button
            onClick={() => {
              navigate("/book");
              window.scrollTo(0, 0);
            }}
          >
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bookandregister;
