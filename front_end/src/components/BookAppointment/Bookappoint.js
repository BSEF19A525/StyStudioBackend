import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bookappoint() {
  // for getting salonName and service from individual page

  console.log("------------  INSIDE BOOKING --------------");

  const [bookInfo, setBookInfo] = useState({
    salService: "",
    salName: "",
    salEmail: "",
  });

  const navigate = useNavigate(null);

  const location = useLocation();
  const salonService = location.state?.salonService;
  const salnName = location.state?.salonName;
  const salonEmail = location.state?.salonEmail;

  useEffect(() => {
    window.scrollTo(0, 0);
    setBookInfo({
      salService: salonService,
      salName: salnName,
      salEmail: salonEmail,
    });
  }, []);

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

  const handleBookingService = async (e) => {
    e.preventDefault();
    const { fullName, phone, date } = bookData;
    const { salName, salService, salEmail } = bookInfo;
    const bookingDate = validateDate(date);

    // Phone Number Validity
    if (phone.length < 12 && phone.length >= 9) {
      // Date Validity --> No Past Date allowed
      if (bookingDate !== -1) {
        // Service Validity --> Only Alphabets, whitespace character, including spaces, tabs, and line breaks.
        const alphabetsRegex = /^[A-Za-z\s]+$/;
        if (alphabetsRegex.test(salService)) {
          try {
            console.log("default: " + salService);
            console.log(salService);
            // Show loading toast

            toast.loading("Loading...");
            setTimeout(() => {
              toast.dismiss();
            }, 2000);

            // Send the email to the salon using EmailJS
            const emailResponse = await emailjs.send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID,
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
              {
                salonName: salName,
                salonEmail: salEmail,
                fullName,
                email: bookData.email,
                phone,
                date: bookingDate,
                service: salService,
              },
              process.env.REACT_APP_EMAILJS_USER_ID
            );

            if (emailResponse.status === 200) {
              // Clear form data and show success toast after 3 seconds
              setTimeout(() => {
                toast.success("Booking Successfull");
              }, 2000);
              // toast.dismiss();

              setBookData({
                fullName: "",
                email: "",
                phone: "",
                date: "",
                service: "",
                salonName: "",
              });
              setBookInfo({
                salName: "", // Reset salon name to null
                salService: "", // Reset salon service to null
                salEmail: "",
              });
            }

            console.log(
              "Booking request sent to salon:",
              emailResponse.status,
              emailResponse.text
            );
          } catch (error) {
            console.error("Error retrieving salon data:", error.message);
          } finally {
            // Dismiss loading toast
            toast.dismiss();
            // for moving back to navigate page
          }
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
            <form onSubmit={handleBookingService}>
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

                {bookInfo.salName ? (
                  <input
                    type="text"
                    value={bookInfo.salName}
                    placeholder="Salon Name"
                    readOnly
                    className="margin readOnly"
                    name="salonName"
                    title="You can't edit this"
                  />
                ) : (
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
                )}
              </div>
              {/* Date Of Booking */}
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
              {/* Service Name */}

              {bookInfo.salService ? (
                <div className="sal-loc0 sal-common0">
                  <input
                    type="text"
                    title="You can't edit this"
                    ref={serviceRef}
                    className="margin readOnly"
                    readOnly
                    value={bookInfo.salService}
                    placeholder="Service you want to avail"
                    name="service"
                  />
                </div>
              ) : (
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
              )}

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
