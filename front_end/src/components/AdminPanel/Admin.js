import React, { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const salons = [
    { id: 1, name: "Salon A", email: "salonA@example.com", location: "City A" },
    { id: 2, name: "Salon B", email: "salonB@example.com", location: "City B" },
    { id: 3, name: "Salon C", email: "salonC@example.com", location: "City C" },
    { id: 4, name: "Salon D", email: "salonD@example.com", location: "City D" },
    { id: 5, name: "Salon E", email: "salonE@example.com", location: "City E" },
    // Add more salon data as needed
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = (salonId) => {
    // Open the modal and set initial values
    setIsModalOpen(true);
    setCurrentEmail(salons.find((salon) => salon.id === salonId).email);
    setNewEmail("");
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    // Perform the update email functionality here
    console.log("Current Email:", currentEmail);
    console.log("New Email:", newEmail);
    // Close the modal
    setIsModalOpen(false);
  };

  const handleDeleteSalon = (salonId) => {
    // Handle delete salon functionality
    console.log(`Delete salon with ID: ${salonId}`);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Welcome to the Admin Dashboard</h1>
        <button
          className="logout-btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* <div className="logout-btn"></div> */}

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Salon Name</th>
              <th>Salon Email</th>
              <th>Salon Location</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {salons.map((salon) => (
              <tr key={salon.id}>
                <td>{salon.name}</td>
                <td>{salon.email}</td>
                <td>{salon.location}</td>
                <td>
                  <button onClick={() => handleUpdateEmail(salon.id)}>
                    Update Email
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteSalon(salon.id)}>
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleModalSubmit}>
            <label>
              Current Email:
              <input type="email" value={currentEmail} disabled />
            </label>
            <label>
              New Email:
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
