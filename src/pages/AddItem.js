import React, { useState } from "react";
import axios from "axios";

export default function AddItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
    tags: "",
  });
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post("http://localhost:5000/api/items/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Item uploaded!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Size"
        onChange={(e) => setForm({ ...form, size: e.target.value })}
      />
      <input
        placeholder="Condition"
        onChange={(e) => setForm({ ...form, condition: e.target.value })}
      />
      <input
        placeholder="Tags (comma-separated)"
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />
      <input
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
