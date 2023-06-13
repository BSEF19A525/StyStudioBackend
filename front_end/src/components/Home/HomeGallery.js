import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeGallery = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate(null);

  const handleCardClick = async (id) => {
    console.log("inside card click, the id is ", id);
    try {
      // Make the API call to authenticate the user
      const response = await axios.get(
        `http://localhost:8000/individual/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.dismiss();

        // Move the user to the individual page
        // console.log("User authenticated");
        navigate("/individual", {
          state: { user: response.data },
        });
        console.log("response in Saloon galler", response);
      }
    } catch (err) {
      console.log("error in Salon Gallery : ", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/data");
      const result = response.data;
      setData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const moveToGallery = () => {
    navigate("/gallery");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="gallerytop" id="gallerysection">
        <div className="gallerywidth">
          <div className="gallerytext">
            <h1>Here you can find</h1>
            <h3>The best salons in your area</h3>
          </div>
          <div className="green-bg"></div>
          <div className="salonsdata">
            <div className="salongal">
              {data.slice(0, 3).map((item) => {
                return (
                  <div
                    className="galimg"
                    key={item._id}
                    onClick={() => {
                      handleCardClick(item._id);
                    }}
                  >
                    <div className="image-container">
                      <img
                        src={`http://localhost:8000/api/image/${item.profileImg}`}
                        alt="Salon Image"
                        className="img-style"
                      />

                      <div className="overlay">
                        <h3 className="salon-name">{item.salonName}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="upbtn">
            <button className="btngallery" onClick={moveToGallery}>
              See more
            </button>
          </div>
          {/* <div className="curlines">
            <img src={lines} alt="none" />
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomeGallery;
