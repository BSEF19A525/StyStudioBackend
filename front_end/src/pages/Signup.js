import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/SignUp/Signup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
    cpass: "",
    salonName: "",
    location: "",
    description: "",
  });
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState("");

  const [services, setServices] = useState([]);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // for handling checkBox value
  const handleCheckBoxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServices((prevServices) => [...prevServices, value]);
    } else {
      setServices((prevServices) =>
        prevServices.filter((service) => service !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.pass !== formData.cpass) {
      toast.error("password and confirm-password should be same", {
        onClose: () => {
          inputRef.current.focus();
        },
      });
      setFormData({ ...formData, pass: "", cpass: "" });
    } else {
      toast.loading("Loading...");
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
    // checking which services user selected

    // data ko send krna or backend sy get krna
    const { username, email, pass, cpass, salonName, location, description } =
      formData;

    const form_Data = new FormData();
    form_Data.append("username", username);
    form_Data.append("email", email);
    form_Data.append("pass", pass);
    form_Data.append("cpass", cpass);
    form_Data.append("salonName", salonName);
    form_Data.append("location", location);
    form_Data.append("description", description);
    form_Data.append("profileImg", profileImg);
    // services that salon is providing
    form_Data.append("services", JSON.stringify(services));

    if (pass === cpass) {
      try {
        const response = await axios.post(
          "http://localhost:8000/signup",
          form_Data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 200) {
          console.log(response);
          setTimeout(() => {
            toast.success("Registration Successfull");
          }, 4000);
          setTimeout(() => {
            setFormData({
              username: "",
              email: "",
              pass: "",
              cpass: "",
              salonName: "",
              location: "",
              description: "",
            });
            setServices([]);
            setProfileImg(null);
          }, 4000);
          setTimeout(() => {
            navigate("/login");
          }, 10000);
        }
        if (response.status === 422 || !response.data) {
        } else if (response.status === 422 || !response.data) {
          toast.error("Looks like you are already registered");
        }
        // handle success
      } catch (error) {
        setTimeout(() => {
          toast.error("Looks like you are already registered");
        }, 4000);
      }
    }
  };

  // setting a preview for image

  useEffect(() => {
    if (profileImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(profileImg);
    } else {
      setPreview(null);
    }
  }, [profileImg]);

  return (
    <>
      <div className="signUp-Wrapper">
        <div className="side-img"></div>
        <div className="signUpForm">
          <div className="backImg"></div>
          <div className="form">
            <h1 className="title">Register</h1>
            <p className="signUp-title">Register your account in seconds</p>
            {/* Username & Email */}
            <form method="POST" onSubmit={handleSubmit}>
              <div className="name-email flex-com">
                <input
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  name="username"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  name="email"
                  required
                />
              </div>
              {/* Password & Confirm Password */}
              <div className="pass-cpass flex-com">
                <input
                  ref={inputRef}
                  type="password"
                  value={formData.pass}
                  onChange={handleChange}
                  placeholder="Password"
                  name="pass"
                  autoComplete="off"
                  required
                />
                <input
                  type="password"
                  value={formData.cpass}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  name="cpass"
                  autoComplete="off"
                  required
                />
              </div>
              {/* Salon Name */}
              <div className="sal-name sal-common">
                <input
                  type="text"
                  value={formData.salonName}
                  onChange={handleChange}
                  placeholder="Salon Name"
                  name="salonName"
                  required
                />
              </div>
              {/* CheckBox  */}

              <div className="choseService-parent">
                <h6 className="serv-text">
                  Choose services that your salon provides
                </h6>
                <div className="select-services">
                  <label className="ser-width">
                    <input
                      type="checkbox"
                      name="service"
                      value="Haircut"
                      onChange={handleCheckBoxChange}
                    />
                    <span className="checkbox-label">Haircut</span>
                  </label>
                  <label className="ser-width">
                    <input
                      type="checkbox"
                      name="service"
                      value="Manicure"
                      onChange={handleCheckBoxChange}
                    />
                    <span className="checkbox-label">Manicure</span>
                  </label>
                  <label className="ser-width">
                    <input
                      type="checkbox"
                      name="service"
                      value="Facial"
                      onChange={handleCheckBoxChange}
                    />
                    <span className="checkbox-label">Facial</span>
                  </label>
                  <label className="ser-width">
                    <input
                      type="checkbox"
                      name="service"
                      value="Hair Style"
                      onChange={handleCheckBoxChange}
                    />
                    <span className="checkbox-label">Hair Style</span>
                  </label>
                  <label className="ser-width">
                    <input
                      type="checkbox"
                      name="service"
                      value="Bridal Makeup"
                      onChange={handleCheckBoxChange}
                    />
                    <span className="checkbox-label">Bridal Makeup</span>
                  </label>{" "}
                </div>
              </div>
              {/* Salon Location */}
              <div className="sal-loc sal-common">
                <input
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  name="location"
                  required
                />
              </div>
              {/* Salon Image */}
              <div className="img_desc">
                <div className="salon-img">
                  <div>
                    {preview ? (
                      <img src={preview} className="prev-img" alt="Preview" />
                    ) : (
                      <label>Add Salon Image</label>
                    )}
                    <input
                      className="salImg"
                      id="profileImg"
                      type="file"
                      accept="image/*"
                      value={formData.profileImg}
                      name="profileImg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.substring(0, 5) === "image") {
                          setProfileImg(file);
                        } else {
                          setProfileImg(null);
                        }
                      }}
                      required
                    />
                  </div>
                </div>
                {/* Salon Short Description */}
                <div className="short-desc">
                  {/* Linked with Img Browse */}
                  {/* <label htmlFor="profileImg" className="custom-file-upload">
                    Browse
                  </label> */}
                  <textarea
                    placeholder="Add short description about salon"
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    required
                  ></textarea>
                </div>
              </div>
              <label htmlFor="profileImg" className="custom-file-upload">
                Browse
              </label>
              <div className="sub-btn">
                <button type="submit">Register</button>
              </div>
            </form>
            <span className="navtoLog">
              Already Have an account?
              <button
                className="moveToLogin"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
