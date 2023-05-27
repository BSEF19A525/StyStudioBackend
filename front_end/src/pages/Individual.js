import React, { useEffect } from "react";
import NavBg from "../components/Individual/NavBg";
import Profile from "../components/Individual/Profile";
import Services from "../components/Individual/Services";
import Discount from "../components/Individual/Discount";
import "../components/Individual/individual.css";
import Bookandregister from "../components/Home/Bookandregister";
const Individual = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <>
      {/* <NavBg /> */}
      <Profile />
      <Services />
      {/* <Discount /> */}
      <Bookandregister />
    </>
  );
};

export default Individual;
