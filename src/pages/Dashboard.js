// client/src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({ email: "", points: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/items/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        setItems(res.data.filter((i) => i.uploader?._id === getUserId(token)))
      );

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ email: payload.email, points: payload.points });
  }, []);

  const getUserId = (token) => JSON.parse(atob(token.split(".")[1])).userId;

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/items/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      alert("Failed to delete item");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">User Dashboard</h2>
      <div className="user-card">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Points:</strong> {user.points}
        </p>
      </div>
      <h3 className="dashboard-subheading">Your Items</h3>
      <div className="dashboard-item-list">
        {items.map((item) => (
          <div key={item._id} className="dashboard-item-card">
            <img
              src={item.images[0]}
              alt={item.title}
              className="dashboard-item-image"
            />
            <div className="dashboard-item-details">
              <h3>{item.title}</h3>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Size:</strong> {item.size}
              </p>
              <p>
                <strong>Condition:</strong> {item.condition}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <button
                className="btn-delete"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
