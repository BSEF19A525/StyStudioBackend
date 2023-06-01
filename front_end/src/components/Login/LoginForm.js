import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginDetails, setloginDetails] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate(null);

  // handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const inputRef = useRef(null);

  // onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Loading...");
    setTimeout(() => {
      toast.dismiss();
    }, 3000);

    const { email, pass } = loginDetails;

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        pass,
      });
      if (response.status === 200) {
        setTimeout(() => {
          
          toast.success("Login Successfull");
          const {loggedIn, username} = response.data;
          console.log("Logged in ? : ", loggedIn);
          console.log("user email : ", username);
        }, 4000);
        setTimeout(() => {
          navigate("/individual");
        }, 10000);
      }
    } catch (error) {
      setTimeout(() => {
        setloginDetails({
          email: "",
          pass: "",
        });
        toast.error("Invalid Credentials, Please Try Again", {
          onClose: () => {
            inputRef.current.focus();
          },
        });
      }, 4000);
    }
  };

  return (
    <>
      <div className="Login-Wrapper">
        <div className="login-sideImg"></div>
        <div className="loginForm">
          <div className="form">
            <h1 className="title">Login</h1>
            <p>Please enter your login details to sign in</p>
            <form method="POST" onSubmit={handleSubmit} className="login">
              {/* Email & Passowrd */}
              <div className="mail">
                <input
                  type="email"
                  ref={inputRef}
                  value={loginDetails.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  name="email"
                  required
                />
              </div>
              {/* Password & Confirm Password */}
              <div className="pass">
                <input
                  type="password"
                  value={loginDetails.pass}
                  onChange={handleChange}
                  placeholder="Password"
                  name="pass"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="forget-pass">
                <button
                  onClick={() => {
                    navigate("/changePass");
                  }}
                >
                  Forget Password?
                </button>
              </div>
              <div className="loginsub-btn">
                <button type="submit">Login</button>
              </div>
            </form>
            <span className="navtoLog">
              Don't have an Account?
              <button
                className="moveToLogin"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </button>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
