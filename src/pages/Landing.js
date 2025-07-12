import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Landing() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items/all")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Welcome to ReWear</h1>
      <Link to="/add-item">List an Item</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link>
      <h2>Featured Items</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item) => (
          <Link
            to={`/item/${item._id}`}
            key={item._id}
            style={{ margin: "10px" }}
          >
            <img src={item.images[0]} alt={item.title} width="150" />
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
