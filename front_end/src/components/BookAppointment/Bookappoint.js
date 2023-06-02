import React, { useState,useEffect } from "react";
import axios from "axios";
// import emailjs from "emailjs-com";
function Bookappoint() {
  const [bookData, setBookData] = useState({
    fullName: "",
    email: "",
    phone: "",
    salonName: "",
    date: "",
    service: "",
  });

  const handleBooking = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {salonName}=bookData;
    
    try {
      // Make an API request to your backend server
      const response = await axios.get(
        `http://localhost:8000/book/${salonName}`
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error retrieving salon data:", error.message);
    }
  };

  return (
    <>
      <div className="book-Wrapper">
        <div className="side-img0"></div>
        <div className="bookForm">
          <div className="backImg0"></div>
          <div className="form0">
            <h1 className="title0">Book your Appointment</h1>
            <form onSubmit={handleSubmit}>
              <div className="name-email0 flex-com0">
                <input
                  type="text"
                  value={bookData.fullName}
                  onChange={handleBooking}
                  placeholder="fullName"
                  name="fullName"
                  required
                />
                <input
                  type="email"
                  value={bookData.email}
                  onChange={handleBooking}
                  placeholder="Email Address"
                  name="email"
                  required
                />
              </div>
              {/* Password & Confirm Password */}
              <div className="pass-cpass0 flex-com0">
                <input
                  type="number"
                  value={bookData.phone}
                  onChange={handleBooking}
                  placeholder="Phone no"
                  name="phone"
                  required
                />
                <input
                  type="text"
                  value={bookData.salonName}
                  onChange={handleBooking}
                  placeholder="Salon Name"
                  name="salonName"
                  required
                />
              </div>
              {/* Salon Name */}
              <div className="sal-name0 sal-common0">
                <input
                  type="date"
                  value={bookData.date}
                  onChange={handleBooking}
                  placeholder="Date"
                  name="date"
                  required
                />
              </div>
              {/* Salon Location */}
              <div className="sal-loc0 sal-common0">
                <input
                  type="text"
                  value={bookData.service}
                  onChange={handleBooking}
                  placeholder="Service you want to avail"
                  name="service"
                  required
                />
              </div>

              <div className="sub-btn0">
                <button type="submit">Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookappoint;

// // Check if the salon exists and email address is retrieved
// if (data && data.salonEmail) {
//   // Send the email to the salon using EmailJS
//   emailjs
//     .send(
//       "service_viw95sc", // Replace with your EmailJS service ID
//       "booking_form", // Replace with your EmailJS template ID
//       {
//         salonName: bookData.salonName,
//         fullName: bookData.fullName,
//         email: data.salonEmail, // Salon's email address retrieved from the backend
//         phone: bookData.phone,
//         date: bookData.date,
//         service: bookData.service,
//       }
//       // "YOUR_USER_ID" // Replace with your EmailJS user ID
//     )
//     .then((response) => {
//       console.log(
//         "Booking request sent to salon:",
//         response.status,
//         response.text
//       );
//     })
//     .catch((error) => {
//       console.error("Error sending email to salon:", error);
//     });
// } else {
//   console.error("Salon not found");
// }
