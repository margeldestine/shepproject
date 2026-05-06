import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";
import SettingsCard from "../components/SettingsCard";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { getUserById, isEmailTaken, login, updateUserProfile } from "../api/authApi";

const Settings = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  
  // State Management
  const [activePage, setActivePage] = useState("main");
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sync profile form with user data when user logs in
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || user.first_name || "",
        lastName: user.lastName || user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Track Unsaved Changes
  const hasProfileChanges = user
    ? profileForm.firstName.trim() !== (user.firstName || user.first_name || "").trim() ||
      profileForm.lastName.trim() !== (user.lastName || user.last_name || "").trim() ||
      profileForm.email.trim() !== (user.email || "").trim()
    : false;

  const hasPasswordChanges =
    passwordForm.currentPassword.trim() !== "" ||
    passwordForm.newPassword.trim() !== "" ||
    passwordForm.confirmPassword.trim() !== "";

  const hasUnsavedChanges =
    (activePage === "editProfile" && hasProfileChanges) ||
    (activePage === "changePassword" && hasPasswordChanges);

  // Browser Exit Warning
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    if (hasUnsavedChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Validation Logic
  const validateEmail = (value) => {
    if (!value || !value.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) return "Invalid email format.";
    return "";
  };

  const validateProfile = () => {
    const nextErrors = {};
    if (!profileForm.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!profileForm.lastName.trim()) nextErrors.lastName = "Last name is required.";
    const emailError = validateEmail(profileForm.email);
    if (emailError) nextErrors.email = emailError;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const nextErrors = {};

    if (!passwordForm.currentPassword.trim()) {
      nextErrors.currentPassword = "Current password is required.";
    }

    if (!passwordForm.newPassword.trim()) {
      nextErrors.newPassword = "New password is required.";
    } else if (passwordForm.newPassword.length < 8) {
      nextErrors.newPassword = "Password must be at least 8 characters.";
    }

    if (!passwordForm.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your new password.";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (
      passwordForm.currentPassword.trim() &&
      passwordForm.newPassword.trim() &&
      passwordForm.currentPassword.trim() === passwordForm.newPassword.trim()
    ) {
      nextErrors.newPassword = "New password must be different from current password.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Handlers
  const handleProfileInputChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus(null);
  };

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus(null);
  };

  const saveProfile = async () => {
    setStatus(null);
    if (!validateProfile()) return;

    setIsSaving(true);
    try {
      const newEmail = profileForm.email.trim();
      const emailChanged =
        user && newEmail.toLowerCase() !== (user.email || "").trim().toLowerCase();

      if (emailChanged && (await isEmailTaken(newEmail))) {
        setErrors({ email: "This email address is already in use." });
        return;
      }

      if (user?.userId) {
        const backendUser = await getUserById(user.userId);
        if (!backendUser) throw new Error("Unable to load user account.");

        const updatedUser = await updateUserProfile(user.userId, {
          email: newEmail,
          first_name: profileForm.firstName.trim(),
          last_name: profileForm.lastName.trim(),
          password: backendUser.password,
          role: backendUser.role,
          created_at: backendUser.created_at,
        });

        loginUser(updatedUser);
      } else {
        loginUser({ ...user, ...profileForm });
      }

      setStatus({ type: "success", message: "Profile saved successfully." });
      setActivePage("main");
    } catch (error) {
      setStatus({ type: "error", message: error?.message || "Unable to save profile. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const savePassword = async () => {
    setStatus(null);
    if (!validatePasswordForm()) return;

    setIsSaving(true);
    try {
      if (!user?.email) throw new Error("No user email available.");
      await login(user.email, passwordForm.currentPassword.trim());

      if (user?.userId) {
        const backendUser = await getUserById(user.userId);
        if (!backendUser) throw new Error("Unable to load user account.");

        await updateUserProfile(user.userId, {
          email: backendUser.email,
          first_name: backendUser.first_name,
          last_name: backendUser.last_name,
          password: passwordForm.newPassword.trim(),
          role: backendUser.role,
          created_at: backendUser.created_at,
        });
      }

      setStatus({ type: "success", message: "Password updated successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setActivePage("main");
    } catch (error) {
      setStatus({ type: "error", message: error?.message || "Unable to change password. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const goBack = () => {
    if (activePage === "main") {
      navigate(-1);
      return;
    }

    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm("You have unsaved changes. Leave this page and discard changes?");
      if (!confirmLeave) return;
    }

    setActivePage("main");
    setErrors({});
    setStatus(null);
  };

  // Render Auth Guard
  if (!user) {
    return (
      <div className="settings-modal-overlay">
        <div className="settings-modal">
          <h2>Settings</h2>
          <p>Please sign in to access account settings.</p>
          <BackButton className="back-btn" onClick={() => navigate(-1)}>
            Back
          </BackButton>
        </div>
      </div>
    );
  }

  // Main UI
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
            ? "Update your personal information."
            : activePage === "changePassword"
            ? "Keep your account secure with a new password."
            : "Contact us if you need help."}
        </p>

        {status && (
          <div className={`settings-status ${status.type}`}>{status.message}</div>
        )}

        {activePage === "main" && (
          <div className="settings-items">
            <SettingsCard
              title="Edit Profile"
              description="Update your first name, last name, or email address."
              actionLabel="Edit"
              onAction={() => setActivePage("editProfile")}
            />

            <SettingsCard
              title="Change Password"
              description="Update your password to keep your account secure."
              actionLabel="Change"
              onAction={() => setActivePage("changePassword")}
            />

            <SettingsCard
              title="Help & Support"
              description="Contact us if you need help."
              actionLabel="Contact"
              onAction={() => setActivePage("helpSupport")}
            />
          </div>
        )}

        {activePage === "editProfile" && (
          <div className="settings-box modern-section">
            <h3>Edit Profile</h3>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileInputChange}
              />
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileInputChange}
              />
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileInputChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <button onClick={saveProfile} disabled={isSaving || !hasProfileChanges}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {activePage === "changePassword" && (
          <div className="settings-box modern-section">
            <h3>Change Password</h3>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordInputChange}
                placeholder="Current Password"
              />
              {errors.currentPassword && <p className="error-text">{errors.currentPassword}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordInputChange}
                placeholder="New Password"
              />
              {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordInputChange}
                placeholder="Confirm New Password"
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
            <button onClick={savePassword} disabled={isSaving || !hasPasswordChanges}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {activePage === "helpSupport" && (
          <div className="settings-box modern-section">
            <h3>Help & Support</h3>
            <div className="form-group">
              <label>Contact:</label>
              <p>
                Need assistance? Our support team is here to help!<br />
                📞 Call us at: <strong>0966 123 4567</strong><br />
                📧 Email: <strong><a href="mailto:support@shep.com">support@shep.com</a></strong><br />
                🕒 Available: Monday to Friday, 9:00 AM – 6:00 PM
              </p>
              <p>
                For quick updates, reach us on social media: <strong>@SHEP</strong> on Facebook and Instagram.
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

export default Settings;