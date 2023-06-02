import React, { useState, useRef } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bookappoint() {
  const [bookData, setBookData] = useState({
    fullName: "",
    email: "",
    phone: "",
    salonName: "",
    date: "",
    service: "",
  });

  const phoneRef = useRef(null);
  const dateRef = useRef(null);
  const serviceRef = useRef(null);

  const handleBooking = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  // Date validation function
  const validateDate = (date) => {
    console.log("Before: " + date);

    // Create a new Date object using the date value
    const myDate = new Date(date);

    console.log(myDate);

    // Get the current date
    const currentDate = new Date();

    // Set both dates to the same time of day to compare only the dates
    myDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Compare the selected date with the current date
    if (myDate.getTime() === currentDate.getTime() || myDate > currentDate) {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = myDate.toLocaleDateString("en-US", options);
      console.log("After: " + formattedDate); // Output: "June 22, 2023"
      return formattedDate;
    } else {
      return -1;
    }
  };

  // phone Validation Function
  // const validatePhone = (phone) => {
  //   const phoneNum = phone.length;
  //   if (phoneNum < 12 && phoneNum >= 9) {
  //     return phoneNum;
  //   } else {
  //     toast.error("Phone Number Should range from 9 - 11 digits");
  //     setBookData({ ...bookData, phone: "" });
  //     .current.focus();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phone, date, salonName, service } = bookData;

    const bookingDate = validateDate(date);

    // Phone Number Validity
    if (phone.length < 12 && phone.length >= 9) {
      // Date Validity --> No Past Date allowed
      if (bookingDate != -1) {
        // Service Validity --> Only Alphabets, whitespace character, including spaces, tabs, and line breaks.
        const alphabetsRegex = /^[A-Za-z\s]+$/;
        if (alphabetsRegex.test(service)) {
          try {
            // Make an API request to your backend server
            const response = await axios.get(
              `http://localhost:8000/book/${salonName}`
            );
            const data = response.data;

            if (data) {
              const { email, salonName } = data;
              console.log("email: " + email);
              console.log("salonName: " + salonName);
              toast.loading("Loading...");
              setTimeout(() => {
                toast.dismiss();
              }, 3000);
              try {
                // Send the email to the salon using EmailJS
                const emailResponse = await emailjs.send(
                  process.env.REACT_APP_EMAILJS_SERVICE_ID,
                  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                  {
                    salonName: salonName,
                    salonEmail: email, // Salon's email address retrieved from the backend
                    fullName,
                    email: bookData.email,
                    phone,
                    date: bookingDate,
                    service,
                  },
                  process.env.REACT_APP_EMAILJS_USER_ID
                );

                if (emailResponse.status === 200) {
                  setBookData({
                    fullName: "",
                    email: "",
                    phone: "",
                    salonName: "",
                    date: "",
                    service: "",
                  });
                  setTimeout(() => {
                    toast.success(`Booking request sent to salon`);
                  }, 3000);
                }
                console.log(
                  "Booking request sent to salon:",
                  emailResponse.status,
                  emailResponse.text
                );
              } catch (error) {
                console.error("Error sending email to salon:", error);
              }
            }
          } catch (error) {
            console.error("Error retrieving salon data:", error.message);
          }
        } else {
          toast.error("Accepting Alphabetic Characters Only");
          setBookData({ ...bookData, service: "" });
          serviceRef.current.focus();
        }
      } else {
        toast.error("Choose Today or Future Date");
        setBookData({ ...bookData, date: "" });
        dateRef.current.focus();
      }
    } else {
      toast.error("Phone numbers should contain 9 to 11 digits.");
      setBookData({ ...bookData, phone: "" });
      phoneRef.current.focus();
    }
  };

  return (
    <>
      <div className="book-Wrapper">
        <div className="side-img0"></div>
        <div className="bookForm">
          <div className="backImg0"></div>
          <div className="form0">
            <h1 className="title0">Book Appointment</h1>
            <form onSubmit={handleSubmit}>
              <div className="name-email0 flex-com0">
                <input
                  type="text"
                  value={bookData.fullName}
                  onChange={handleBooking}
                  placeholder="Full Name"
                  className="margin"
                  name="fullName"
                  required
                  autoComplete="off"
                />
                <input
                  type="email"
                  value={bookData.email}
                  onChange={handleBooking}
                  placeholder="Email Address"
                  className="margin"
                  name="email"
                  required
                  autoComplete="off"
                />
              </div>
              {/* Password & Confirm Password */}
              <div className="pass-cpass0 flex-com0">
                <input
                  type="number"
                  value={bookData.phone}
                  onChange={handleBooking}
                  className="margin"
                  placeholder="Phone no"
                  ref={phoneRef}
                  name="phone"
                  min={10}
                  required
                  autoComplete="off"
                />
                <input
                  type="text"
                  value={bookData.salonName}
                  onChange={handleBooking}
                  placeholder="Salon Name"
                  className="margin"
                  name="salonName"
                  required
                  autoComplete="off"
                />
              </div>
              {/* Salon Name */}
              <div className="sal-name0 sal-common0">
                <input
                  type="date"
                  ref={dateRef}
                  className="margin"
                  value={bookData.date}
                  onChange={handleBooking}
                  placeholder="Date"
                  name="date"
                  required
                  autoComplete="off"
                />
              </div>
              {/* Salon Location */}
              <div className="sal-loc0 sal-common0">
                <input
                  type="text"
                  ref={serviceRef}
                  className="margin"
                  value={bookData.service}
                  onChange={handleBooking}
                  placeholder="Service you want to avail"
                  name="service"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="sub-btn0">
                <button type="submit">Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Bookappoint;
