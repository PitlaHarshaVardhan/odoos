import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

export default function AdminPanel() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/items/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const approve = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:5000/api/admin/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => window.location.reload());
  };

  const reject = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:5000/api/admin/reject/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => window.location.reload());
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Admin Panel</h2>
      <div className="dashboard-item-list">
        {allItems.map((item) => (
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
              <div className="admin-actions">
                <button
                  className="btn-approve"
                  onClick={() => approve(item._id)}
                >
                  Approve
                </button>
                <button className="btn-reject" onClick={() => reject(item._id)}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
