import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./edit.css";

const Edit = () => {
  const [formData, setFormData] = useState({
    description: "",
  });
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState("");

  const location = useLocation();
  const user = location.state?.user;

  const navigate = useNavigate(null);
  const [services, setServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  console.log("form Data : ", formData);
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
  const onUpdateClick = async (e) => {
    e.preventDefault();

    const description = formData.description;

    const form = new FormData();
    form.append("description", description);
    form.append("profileImg", profileImg);
    // services that salon is providing
    form.append("services", JSON.stringify(services));
    form.append("id", user.id);

    console.log("form desc: ", form.get("description"));
    console.log("form services", form.get("services"));

    try {
      const response = await axios.post(
        "http://localhost:8000/edit-profile",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Data Update Successfully");

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
      console.log("Edit err : ", error);
    }
  };
  useEffect(() => {
    if (profileImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(profileImg);
    } else {
      setPreview(`http://localhost:8000/api/image/${user.profileImg}`);
    }
  }, [profileImg]);

  return (
    <>
      <div className="edit-Portfolio-main">
        <div className="edit-profile-img"></div>
        <div className="edit-outer">
          <h2 className="edit-title">Edit your Profile</h2>
          <div className="edit-parent">
            <div className="edit-main">
              <form method="POST" onSubmit={onUpdateClick}>
                {/* Image */}
                <div className="update-img">
                  <div className="upd-img_desc">
                    <div className="upd-salon-img">
                      <div>
                        {preview ? (
                          <img
                            src={preview}
                            className="upd-prev-img"
                            alt="Preview"
                          />
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
                  </div>
                  <label
                    htmlFor="profileImg"
                    className="custom-file-upload-upd"
                  >
                    Browse
                  </label>
                </div>
                {/* Description */}
                {/* <div className="text">
                <textarea
                  placeholder={user.description}
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                ></textarea>
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
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Perms"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">
                        Perms and Straightening
                      </span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="aromatherapy"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Aromatherapy</span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="eyebrow and eyeslashes"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">
                        EyeBrow and Eyelashes
                      </span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Styling"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Styling</span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Pedicures"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Pedicures</span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Nail Polish"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Nail Polish</span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Party Makeup"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Party Makeup</span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Massages"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Massages</span>
                    </label>
                    <label className="ser-width">
                      <input
                        type="checkbox"
                        name="service"
                        value="Waxing"
                        onChange={handleCheckBoxChange}
                      />
                      <span className="checkbox-label">Waxing</span>
                    </label>{" "}
                  </div>
                </div>
                <div className="p-btn">
                  <button type="submit">Update</button>
                </div>
              </div> */}
                <div className="update-text">
                  <textarea
                    placeholder={user.description}
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                  ></textarea>
                </div>
                {/* Designing CheckBoxes  */}

                <div className="updateService-parent">
                  <h6 className="updserv-text">
                    Choose services for your Salon
                  </h6>
                  <div className="update-services">
                    <div className="svc-grp1">
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Haircut"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Haircut</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Manicure"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Manicure</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Facial"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Facial</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Hair Style"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Hair Style</span>
                      </label>
                    </div>
                    <div className="svc-grp2">
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Bridal Makeup"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Bridal Makeup</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Perms"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">
                          Perms and Straightening
                        </span>
                      </label>

                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="aromatherapy"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Aromatherapy</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="eyebrow and eyeslashes"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">EyeBrow</span>
                      </label>
                    </div>
                    <div className="svc-grp3">
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Styling"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Styling</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Pedicures"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Pedicures</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Nail Polish"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Nail Polish</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Party Makeup"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Party Makeup</span>
                      </label>
                    </div>
                    <div className="svc-grp4">
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Massages"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Skin Polish</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Massages"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Eyelashes</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Massages"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Massages</span>
                      </label>
                      <label className="updser-width">
                        <input
                          type="checkbox"
                          name="service"
                          value="Waxing"
                          onChange={handleCheckBoxChange}
                        />
                        <span className="checkbox-label">Waxing</span>
                      </label>{" "}
                    </div>
                  </div>
                </div>
                <div className="update-btn">
                  <button type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
