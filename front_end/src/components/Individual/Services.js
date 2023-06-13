import { React } from "react";
import { useNavigate } from "react-router-dom";
import sal_service from "../../assets/sal_service.jpg";
import Booking from "../../pages/Booking";

const Services = ({ services, salonName, salonEmail }) => {
  const navigate = useNavigate(null);

  console.log("inside Service Component: " + services);
  console.log(salonName);

  return (
    <>
      <div className="service-parent">
        <div className="service-width">
          <div className="service-main">
            <div className="svc">
              {services?.map((salonService, index) => (
                <>
                  <div className="svc-card">
                    <div className="svc-img">
                      <img src={sal_service} alt="Service" />
                      <div className="svc-name" key={index}>
                        {" "}
                        <h5>{salonService}</h5>
                        <button
                          className="svc-btn"
                          onClick={() => {
                            navigate("/Book", {
                              state: { salonService, salonName, salonEmail },
                            });
                          }}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
