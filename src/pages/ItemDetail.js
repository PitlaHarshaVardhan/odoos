import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items/all")
      .then((res) => setItem(res.data.find((i) => i._id === id)))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.title}</h2>
      <img src={item.images[0]} alt={item.title} width="300" />
      <p>{item.description}</p>
      <p>Category: {item.category}</p>
      <p>Size: {item.size}</p>
      <p>Condition: {item.condition}</p>
      <p>Status: {item.status}</p>
      <button disabled={item.status !== "approved"}>Swap or Redeem</button>
    </div>
  );
}
