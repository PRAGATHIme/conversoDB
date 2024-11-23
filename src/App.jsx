import React from "react";
import Spline from '@splinetool/react-spline';
import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Logout from "./components/Logout"; 
import "./App.css";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
  );
};

export default App;
