import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = ({ setProfileData }) => {
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = process.env.API_URL || "http://127.0.0.1:5000/scrape"
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: linkedInUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setProfileData(data);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Optionally, fallback to dummyData
    } 
  };

  return (
    <div className="landing-container">
      <h1>Get your resume generated from your LinkedIn Profile</h1>
      <form onSubmit={handleSubmit} className="linkedin-form">
        <input
          type="url"
          placeholder="Enter your LinkedIn URL"
          value={linkedInUrl}
          onChange={(e) => setLinkedInUrl(e.target.value)}
          required
          className="linkedin-input"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
