import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/admin/pending-items", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPendingItems(res.data))
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
    <div>
      <h2>Admin Panel</h2>
      {pendingItems.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <button onClick={() => approve(item._id)}>Approve</button>
          <button onClick={() => reject(item._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
