import React from "react";
import NavBg from "../components/Individual/NavBg";
import Profile from "../components/Individual/Profile";
import Services from "../components/Individual/Services";
import Discount from "../components/Individual/Discount";
import "../components/Individual/individual.css";
const Individual = () => {
  return (
    <>
      <NavBg />
      <Profile />
      <Services />
      <Discount />
    </>
  );
};

export default Individual;
