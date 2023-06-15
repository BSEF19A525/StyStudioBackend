import React, { useEffect, useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  //to avoid page reload
  const [updateResponse, setUpdateResponse] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/data");
      const result = response.data;
      setData(result);
      console.log(result);
    } catch (error) {
      console.log("fetchh error");
    }
  };

  const handleDeleteSalon = async (salonId) => {
    // Handle delete salon functionality
    console.log(`Delete salon with ID: ${salonId}`);
    try {
      const response = await axios.delete(
        "http://localhost:8000/admin/delete",
        { data: { id: salonId } }
      );
      if (response.status === 200) {
        console.log("User deleted successfully");
        setDeleteResponse(response);
      } else {
        console.log("user could not be deleted");
      }
    } catch (error) {
      console.log("could not delete");
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateResponse, deleteResponse]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = (salonId) => {
    // Open the modal and set initial values
    setIsModalOpen(true);
    setCurrentEmail(data.find((salon) => salon._id === salonId).email);
    console.log(newEmail);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    // Perform the update email functionality here
    console.log("Current Email:", currentEmail);
    console.log("New Email:", newEmail);
    try {
      const response = await axios.patch("http://localhost:8000/admin/update", {
        currentEmail: currentEmail,
        newEmail: newEmail,
      });
      if (response.status === 200) {
        console.log("User updated successfully");
        setUpdateResponse(response);
      } else {
        console.log("user could not be updated");
      }
    } catch (error) {
      console.log("could not delete");
    }
    // Close the modal
    setIsModalOpen(false);
  };

  const handleAdminLogout = () => {
    navigate("/login");
    const disableBackButton = () => {
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handleBackButtonPress);
    };

    const handleBackButtonPress = () => {
      window.history.pushState(null, "", window.location.pathname);
    };
    disableBackButton();
    return () => {
      window.removeEventListener("popstate", handleBackButtonPress);
    };
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Welcome to the Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleAdminLogout}>
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
            {data.map((salon) => (
              <tr key={salon._id}>
                <td>{salon.salonName}</td>
                <td>{salon.email}</td>
                <td>{salon.location}</td>
                <td>
                  <button onClick={() => handleUpdateEmail(salon._id)}>
                    Update Email
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteSalon(salon._id)}>
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
