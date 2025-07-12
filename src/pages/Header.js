// client/src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo">👕 </div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-item">Add Item</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Logout</Link>
      </nav>
    </header>
  );
}
