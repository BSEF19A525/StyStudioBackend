import React from "react";
import About from "../components/Home/About";
import Footer from "../components/Home/Footer";
import HomeGallery from "../components/Home/HomeGallery";
import Testimonials from "../components/Home/Testimonials";
import Welcome from "../components/Home/Welcome";
import "../components/Home/Home.css";
import Bookandregister from "../components/Home/Bookandregister";
function Home() {
  return (
    <>
      <Welcome />
      <section id="about">
        <About />
      </section>
      <HomeGallery />
      <Testimonials />
      <Bookandregister/>
    </>
  );
}

export default Home;
