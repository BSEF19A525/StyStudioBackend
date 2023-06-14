import { useLocation, useNavigate } from "react-router-dom";
import profile from "../../assets/salon_profile.jpg";
import Services from "./Services";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate(null);

  const [user, setUser] = useState({});

  const location = useLocation();
  const userRes = location.state?.user.user;
  console.log("Inside Location State: " + location.state?.user.user);
  // const userRes = location.state?.user.user;
  // const userRes = location.state;

  console.log("inside useRes " + userRes);

  useEffect(() => {
    setUser(userRes);
  }, []);


  const handleEditClick = () => {
    navigate("/edit-profile", {
      state: { user: userRes },
    });
  };

  console.log("User on profile page : ", user);
  return (
    <>
      <div className="profile-outer">
        <div className="profile-parent">
          <div className="profile-main">
            <div className="profile-img img-width">
              <img
                src={`http://localhost:8000/api/image/${user.profileImg}`}
                alt="Profile"
              />
            </div>
            <div className="profile-content cont-width">
              {user.isLoggedin == true ? (
                <>
                  <div className="p-btn">
                    <button onClick={handleEditClick}>Edit Profile</button>
                  </div>
                  <p>Welcome,</p>
                  <div className="title"> {user.name}</div>
                </>
              ) : (
                <>
                  <p>Welcome To,</p>
                  <div className="title"> {user.salon}</div>
                </>
              )}
              <div className="text">
                <p>{user.description}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Service Section */}
        <div className="service-title">
          <h1>Explore Our Services</h1>
          <Services
            services={user.services}
            salonName={user.salon}
            salonEmail={user.email}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;

{
  /* <div className="svc">
          {user.services?.map((item, index) => (
            <div className="svc-name" key={index}>
              {" "}
              {item}{" "}
            </div>
          ))}
        </div> */
}
