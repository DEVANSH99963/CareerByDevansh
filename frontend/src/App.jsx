import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  // const role = localStorage.getItem("role");
  const [role, setRole] = useState("");

useEffect(() => {
  setRole(localStorage.getItem("role"));
}, []);

  return (
    <>
      <div className="navbar">
        <h1>CareerByDevansh</h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>

          {role === "recruiter" && (
            <Link to="/create-job">Create Job</Link>
          ) }

          {role === "student" && (
            <Link to="/applications">My Applications</Link>
          ) }  
          <Link to="/profile">Profile</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;