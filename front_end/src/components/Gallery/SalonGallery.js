import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Searchbar from "./Searhbar";
import "./gallery.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./Error";
import Bookandregister from "../Home/Bookandregister";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:8000/api/data";

const SalonGallery = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async (searchValue) => {
    let url;
    if (searchValue === "") {
      url = API_URL;
    } else {
      url = `${API_URL}/${searchValue}`;
    }
    try {
      setLoading(true);
      console.log("URL: " + url);
      const response = await axios.get(url);
      const result = response.data;
      setData(result);
      console.log(result);
      setError(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Show loader for 3 seconds
    } catch (error) {
      setError(true);
      setLoading(true);
      console.log("Salon Not Found");
      setTimeout(() => {
        setLoading(false);
      }, 5000); // Show loader for 5 seconds
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);

  // handle Search

  return (
    <>
      <div className="gallery-text">
        <h1> Gallery </h1>
      </div>

      <div className="bg-image">
        <div>
          <Searchbar searchSalon={fetchData} />
        </div>
        {/*salon listing starts here*/}
        {loading ? (
          <Loader />
        ) : (
          <div className="salon-container">
            {error ? (
              <Error />
            ) : (
              data.map((contents) => (
                <div className="salon-card" key={contents._id}>
                  <div>
                    <Link to={`/individual/${contents._id}`}>
                      <img
                        src={`http://localhost:8000/api/image/${contents.profileImg}`}
                        alt="Salon Image"
                        className="salon-image"
                      />
                    </Link>
                    <div className="salon-content">
                      <h3 className="salon-name"> {contents.salonName}</h3>
                      <p className="salon-description">
                        {" "}
                        {contents.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <Bookandregister />
      </div>
      <ToastContainer />
    </>
  );
};

export default SalonGallery;
