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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   toast.loading("Loading...");
  //   setTimeout(() => {
  //     toast.dismiss();
  //   }, 3000);

  //   const { email, pass } = loginDetails;

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/login",
  //       {
  //         email,
  //         pass,
  //       },
  //       { withCredentials: true }
  //     );
  //     await axios.get("http://localhost:8000/individual", {
  //       withCredentials: true,
  //     });

  //     if (response.status === 200) {
  //       setTimeout(() => {
  //         toast.success("Login Successfull");
  //       }, 2000);
  //       setTimeout(() => {
  //         navigate("/individual", { withCredentials: true });
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setTimeout(() => {
  //       setloginDetails({
  //         email: "",
  //         pass: "",
  //       });
  //       toast.error("Invalid Credentials, Please Try Again", {
  //         onClose: () => {
  //           inputRef.current.focus();
  //         },
  //       });
  //     }, 4000);
  //   }
  // };

  // Ali Malik Code
  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Loading...");

    try {
      const { email, pass } = loginDetails;

      const response = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          pass,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login Successful");

        // Make the API call to authenticate the user
        const authenticateResponse = await axios.get(
          "http://localhost:8000/individual",
          {
            withCredentials: true,
          }
        );

        if (authenticateResponse.status === 200) {
          toast.dismiss();

          // Move the user to the individual page
          // console.log("User authenticated");
          navigate("/individual", {
            state: { user: authenticateResponse.data },
          });
          console.log(authenticateResponse);
        } else {
          // throw new Error("User authentication failed");
          console.log("User Authentication Failed");
        }
      } else {
        // throw new Error("Invalid response from the server");
        console.log("Invalid response from the server");
      }
    } catch (error) {
      setloginDetails({
        email: "",
        pass: "",
      });

      toast.error("Invalid Credentials, Please Try Again", {
        onClose: () => {
          inputRef.current.focus();
        },
      });
    } finally {
      toast.dismiss();
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
