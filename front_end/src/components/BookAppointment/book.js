
import pic1 from "../../assets/rectangle-1@3x.png";

const Desktop2 = () => {
  return (
    <div className="desktop-2">
      <div className="booking2">
        <div className="booking">
          <div className="image1">
            <img className="image1-child" alt="" src={pic1} />
          </div>
          <b className="book-your-appointment">Book your Appointment</b>
          <input
            className="email-input"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="name"
            type="text"
            placeholder="Full Name"
            maxLength={25}
            minLength={20}
          />
          <input
            className="service"
            type="search"
            placeholder="Services you want to avail"
          />
          <input
            className="salon-name"
            type="search"
            placeholder="Salon Name"
            maxLength={15}
            minLength={10}
          />
          <input className="date" type="text" placeholder="Date" />
          <input className="phone" type="tel" placeholder="Phone No." />
          <button className="book">
            <b className="book1">{`Book `}</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Desktop2;