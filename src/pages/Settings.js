import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import SettingsCard from "../components/SettingsCard";
import BackButton from "../components/BackButton";

const TeacherSettings = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("main"); 


  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  
  useEffect(() => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (registeredUser) {
      setUserData(registeredUser);
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  
  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(userData)); 
    setActivePage("main");
  };

  const goBack = () => {
    if (activePage === "main") {
      navigate(-1);
    } else {
      setActivePage("main");
    }
  };

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <h2>
          {activePage === "main"
            ? "Settings"
            : activePage === "editProfile"
            ? "Edit Profile"
            : activePage === "changePassword"
            ? "Change Password"
            : "Help & Support"}
        </h2>
        <p>
          {activePage === "main"
            ? "Manage your account and preferences"
            : activePage === "editProfile"
            ? "Update your personal information"
            : activePage === "changePassword"
            ? "Keep your account secure with a new password"
            : "Contact us if you need help"}
        </p>

        {activePage === "main" && (
          <div className="settings-items">
            <SettingsCard
              title="Edit Profile"
              description="Update your name or personal information."
              actionLabel="Edit"
              onAction={() => setActivePage("editProfile")}
            />

            <SettingsCard
              title="Change Password"
              description="Keep your account secure with a new password."
              actionLabel="Change"
              onAction={() => setActivePage("changePassword")}
            />

            <SettingsCard
              title="Help & Support"
              description="Contact us if you need help"
              actionLabel="Contact"
              onAction={() => setActivePage("helpSupport")}
            />
          </div>
        )}

        {activePage === "editProfile" && (
          <div className="settings-box modern-section">
            <h3>Edit Profile</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <button onClick={saveProfile}>Save</button>
          </div>
        )}

        {activePage === "changePassword" && (
          <div className="settings-box modern-section">
            <h3>Change Password</h3>
            <div className="form-group">
              <label>Current Password:</label>
              <input type="password" placeholder="Current Password" />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input type="password" placeholder="New Password" />
            </div>
            <button onClick={goBack}>Save</button>
          </div>
        )}

        {activePage === "helpSupport" && (
        <div className="settings-box modern-section">
            <h3>Help & Support</h3>
            <div className="form-group">
            <label>Contacts:</label>
            <p>
                Need assistance? Our friendly support team is here to help!<br />
                📞 Call us at: <strong>0966 123 4567</strong><br />
                📧 Email: <strong>support@shep.com</strong><br />
                🕒 Available: Monday to Friday, 9:00 AM – 6:00 PM
            </p>
            <p>
                You can also reach out to us on social media for quick updates and support:
                <br /> 
                🔗 <strong>@SHEP</strong> on Facebook & Instagram
            </p>
            </div>
        </div>
        )}


        <BackButton className="back-btn" onClick={goBack}>
          Back
        </BackButton>
      </div>
    </div>
  );
};

export default TeacherSettings;