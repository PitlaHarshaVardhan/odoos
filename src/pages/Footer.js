// client/src/components/Footer.js
import React from "react";
import "../styles.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} ReWear Swap | Built for Sustainability 🌱
      </p>
    </footer>
  );
}
