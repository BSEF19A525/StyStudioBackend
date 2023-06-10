import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {

    const location = useLocation();
    const user = location.state?.user;
    console.log("User on edit", location.state?.user);
    

    console.log()
  
  return (
    <>
       <div className="profile-outer">
        <div className="profile-parent">
          <div className="profile-main">
            <div className="profile-img img-width">
              <img src={`http://localhost:8000/api/image/${user.profileImg}`} alt="Profile" />
            </div>   
              <div className="text">
                <textarea>
                 {user.description}
                  </textarea>

                  <div className="p-btn">
                <button>Update</button>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Edit;
