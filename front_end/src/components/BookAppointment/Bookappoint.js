import React from 'react'

function Bookappoint() {
  return (
    <>
    <div className="book-Wrapper">
      <div className="side-img0"></div>
      <div className="bookForm">
        <div className="backImg0"></div>
        <div className="form0">
          <h1 className="title0">Book your Appointment</h1>
          <form>
            <div className="name-email0 flex-com0">
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />
            </div>
            {/* Password & Confirm Password */}
            <div className="pass-cpass0 flex-com0">
              <input
                type="number"
                placeholder="Phone no"
                name="phone"
                required
              />
              <input
                type="text"
                placeholder="Salon Name"
                name="salonname"
                required
              />
            </div>
            {/* Salon Name */}
            <div className="sal-name0 sal-common0">
              <input
                type="text"
                placeholder="Date"
                name="date"
                required
              />
            </div>
            {/* Salon Location */}
            <div className="sal-loc0 sal-common0">
              <input
                type="text"
                placeholder="Service you want to avail"
                name="location"
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

  )
}

export default Bookappoint