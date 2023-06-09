import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Desktop3 = () => {
  const [chpassData, setchPassData] = useState({
    email: "",
    newpass: "",
    confpass: "",
  });
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const navigate = useNavigate(null);

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
    const { email, newpass, confpass } = chpassData;
    //if password and cnfrmpassword are not same
    if (chpassData.newpass !== chpassData.confpass) {
      setchPassData({ ...chpassData, newpass: "", confpass: "" });
      toast.error("Password and Confirm-password should be same", {
        onClose: () => {
          passRef.current.focus();
        },
      });
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    } else {
      try {
        // Make an API request to your backend server
        const response = await axios.get(
          `http://localhost:8000/changePass/${email}`
        );
        const data = response.data;

        if (data) {
          const { email } = data;
          try {
            const response = await axios.post(
              "http://localhost:8000/changePass",
              {
                email: email,
                newpass: newpass,
              }
            );
            // console.log(response);
            if (response.status == 200) {
              setchPassData({
                ...chpassData,
                email: "",
                newpass: "",
                confpass: "",
              });
              toast.success("Pass Changed Successfully");
              setTimeout(() => {
                toast.dismiss();
                navigate("/login");
              }, 3000);
            }
            console.log("email: " + email);
            console.log("new pass: " + newpass);
          } catch (error) {
            // console.error(error.message); // Handle error response
          }
        }
        // else{

        //password successfully changed
        console.log("Password successfully changed");
      } catch (error) {
        toast.error("Enter Valid Email");
        emailRef.current.focus();
        setTimeout(() => {
          toast.dismiss();
        }, 3000);
        setchPassData({ ...chpassData, email: "" });

        // console.log("Email Not Exist");
      }
    }
  };

  return (
    <>
      <div className="changepassflex">
        <div className="changepasswidth">
          <div className="changepassjustify">
            <form onSubmit={handleSubmit}>
              <div className="changeinput">
                <input
                  className="chpsin"
                  ref={emailRef}
                  type="email"
                  value={chpassData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  name="email"
                  required
                />
              </div>
              <div className="changeinput">
                <input
                  className="chpsin"
                  ref={passRef}
                  type="password"
                  value={chpassData.newpass}
                  onChange={handleChange}
                  placeholder="New Password"
                  name="newpass"
                  required
                />
              </div>
              <div className="changeinput">
                <input
                  className="chpsin"
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
        <ToastContainer />
      </div>
    </>
  );
};

export default Desktop3;
