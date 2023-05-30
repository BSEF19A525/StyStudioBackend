import React, { useState, useEffect } from "react";
import axios from "axios";
import lines from "../../assets/curllines.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeGallery = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate(null);

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
          <div className="salonsdata">
            <div className="salongal">
              {data.slice(0, 3).map((item) => {
                return (
                  <div className="galimg" key={item._id}>
                    <div className="image-container">
                      <Link to={`/individual/${item._id}`}>
                        <img
                          src={`http://localhost:8000/api/image/${item.profileImg}`}
                          alt="Salon Image"
                          className="img-style"
                        />
                      </Link>

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
    </>
  );
};

export default HomeGallery;
