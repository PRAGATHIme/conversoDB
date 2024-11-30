import React from "react";
import Navbar from "./Navbar";
import "./Profile.css";
const Profile = () => {
  return (
    <div style={{ textAlign: "center", padding: "120px" }}>
      <Navbar />
      <h2>Enterprise name</h2>
      <p>Enterprise Owner</p>
      <p>Contact</p>
    </div>
  );
};

export default Profile;
