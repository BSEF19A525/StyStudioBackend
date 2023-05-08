import React from "react";
import About from "../components/Home/About";
import Footer from "../components/Home/Footer";
import HomeGallery from "../components/Home/HomeGallery";
import Testimonials from "../components/Home/Testimonials";
import Welcome from "../components/Home/Welcome";
import "../components/Home/Home.css";
function Home() {
  return (
    <>
      <Welcome />
      <section id="about">
        <About />
      </section>
      <HomeGallery />
      <Testimonials />
    </>
  );
}

export default Home;
