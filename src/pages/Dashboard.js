import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Email: {user.email}</p>
      <p>Points: {user.points}</p>
      <h3>Your Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
