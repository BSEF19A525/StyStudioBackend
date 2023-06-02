import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Desktop3 = () => {
  const [chpassData, setchPassData] = useState({
    email: "",
    newpass: "",
    confpass: "",
  });
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setchPassData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email,newpass,confpass } = chpassData;
//if password and cnfrmpassword are not same
    if (chpassData.newpass !== chpassData.confpass) {
      console.log("password and confirm-password should be same")
      setchPassData({ ...chpassData, newpass: "", confpass: "" });
    } else {
      try {
        // Make an API request to your backend server
        const response = await axios.get( `http://localhost:8000/changePass/${email}`);
        const data = response.data;

        if (data) {
          const { email} = data;
          console.log("email: " + email);
          console.log("newpass: " + newpass);
          // toast.loading("Loading...");
          // setTimeout(() => {
          //   toast.dismiss();
          // }, 3000);
          try {
            const response = await axios.post('http://localhost:8000/changePass', {
              email: email,
              newpass: newpass
            });
            console.log(response.data); // Handle success response
          } catch (error) {
            console.error(error.message); // Handle error response
          }
        }
        //password successfully changed
      console.log("Password successfully changed")
    }catch(error){
      console.error("Error retrieving salon data:", error.message);
    }
    }
}
  
  return (
    <div className="changepassflex">
      <div className="changepasswidth">
        <div className="changepassjustify">
            <form action="" onSubmit={handleSubmit}>
            <div className="changeinput">
            <input className="chpsin"
                  type="email"
                  value={chpassData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  name="email"
                  required
                /> 
                </div>
                <div className="changeinput">
                <input className="chpsin"
                  type="password"
                  value={chpassData.newpass}
                  onChange={handleChange}
                  placeholder="New Password"
                  name="newpass"
                  required
                />
                </div>
                <div className="changeinput">
                <input className="chpsin"
                  type="password"
                  value={chpassData.confpass}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  name="confpass"
                  required
                />
                </div>
                <div className="changebtn changeinput">
                <button type="submit">Change Password</button>
                 </div>            
            </form>
        </div>
      </div>
    </div>
  );
};

export default Desktop3;
