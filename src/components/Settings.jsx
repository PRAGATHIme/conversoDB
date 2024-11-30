import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import "./Settings.css"
const Settings = () => {
  
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [timeZone, setTimeZone] = useState("UTC");

  // Input state for user inputs
  const [passwordInput, setPasswordInput] = useState("");
  const [deactivationReason, setDeactivationReason] = useState("");

  const handleChangePassword = () => {
    const newPassword = prompt("Enter your new password:");
    if (newPassword) {
      setPasswordInput(newPassword);
      alert("Password successfully changed!");
    }
  };

  const handleToggle2FA = () => {
    const isEnabled = window.confirm("Do you want to enable Two-Factor Authentication?");
    alert(isEnabled ? "Two-Factor Authentication enabled!" : "Two-Factor Authentication remains disabled.");
  };

  const handleDeactivateAccount = () => {
    const reason = prompt("Why do you want to deactivate your account?");
    if (reason) {
      setDeactivationReason(reason);
      alert(`Your account has been deactivated for the following reason: ${reason}`);
    }
  };

  const handleToggleNotifications = (type) => {
    if (type === "email") {
      setEmailNotifications(!emailNotifications);
      alert(`Email notifications have been ${!emailNotifications ? "enabled" : "disabled"}.`);
    } else {
      setSmsNotifications(!smsNotifications);
      alert(`SMS notifications have been ${!smsNotifications ? "enabled" : "disabled"}.`);
    }
  };

  const handleSavePreferences = () => {
    alert(`Preferences saved:\nLanguage: ${language}\nCurrency: ${currency}\nTime Zone: ${timeZone}`);
  };

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        padding: "0px",
        animation: "fadeIn 1s ease-in-out",
        background: "linear-gradient(to right, #4a90e2, #4f70e4, #5371e6)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .rounded-button {
            background-color: #4a90e2;
            color: white;
            border: none;
            padding: 12px 24px;
            margin: 8px;
            cursor: pointer;
            border-radius: 25px;
            transition: transform 0.2s, background-color 0.3s;
            font-size: 16px;
          }

          .rounded-button:hover {
            background-color: #4f70e4;
            transform: scale(1.05);
          }

          .rounded-button:active {
            transform: scale(0.95);
          }

          .settings-container {
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            color: black;
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
            animation: slideInFromTop 1s ease-in-out;
          }

          @keyframes slideInFromTop {
            from {
              transform: translateY(-100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .input-field {
            width: 100%;
            padding: 8px;
            margin: 8px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
        `}
      </style>

      <header className="header">
        <Navbar />;
        <h1>Settings</h1>
      </header>
      <div className="spline-background">
        {/* <Spline scene="https://prod.spline.design/WQOhTY9TlxPJEq6X/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/xz5okzxw3erJedlW/scene.splinecode" />  */}
        {/* <Spline scene="https://prod.spline.design/Dpz2rOssjllsgyvh/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/9zQFgSv8q1Evf0WS/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/oR8PwXXParsI1BxN/scene.splinecode" /> */}
      </div>
      <div className="settings-container">
        <section>
          <h2>Account Settings</h2>
          <button className="rounded-button" onClick={handleChangePassword}>
            Change Password
          </button>
          {passwordInput && (
            <p style={{ color: "green" }}>Password successfully updated: {passwordInput}</p>
          )}

          <button className="rounded-button" onClick={handleToggle2FA}>
            Enable 2FA
          </button>

          <button className="rounded-button" onClick={handleDeactivateAccount}>
            Deactivate Account
          </button>
          {deactivationReason && (
            <p style={{ color: "red" }}>Deactivation Reason: {deactivationReason}</p>
          )}

          <h3>Notification Preferences</h3>
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => handleToggleNotifications("email")}
            />
            Email Notifications
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => handleToggleNotifications("sms")}
            />
            SMS/Push Alerts
          </label>

          <h4>System Preferences</h4>
          <label>
            Language:
            <select
              className="input-field"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </label>
          <br />
          <label>
            Currency:
            <select
              className="input-field"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <br />
          <label>
            Time Zone:
            <select
              className="input-field"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="GMT+1">GMT+1</option>
            </select>
          </label>
          <br />
          <button className="rounded-button" onClick={handleSavePreferences}>
            Save Preferences
          </button>
        </section>
      </div>

      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy; 2024 conversoDB</p>
      </footer>
    </div>
  );
};

export default Settings;
