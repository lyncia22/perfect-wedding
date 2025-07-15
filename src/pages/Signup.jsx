import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!fullName) validationErrors.fullName = "Full name is required";
    if (!email) validationErrors.email = "Email is required";
    else if (!validateEmail(email)) validationErrors.email = "Invalid email";
    if (!password) validationErrors.password = "Password is required";
    if (!role) validationErrors.role = "Please select a role";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Account created successfully!");

      // Redirect based on role
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "vendor") navigate("/vendor-dashboard");
      else navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image" aria-label="Wedding background image" />

      <div className="auth-form-container">
        <h2>Create Your Account</h2>
        <p className="auth-subtext">Start planning your dream wedding</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            {fullName === "" && <FiUser className="input-icon" />}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={errors.fullName ? "input-error" : ""}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            {email === "" && <FiMail className="input-icon" />}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            {password === "" && <FiLock className="input-icon" />}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={errors.role ? "input-error" : ""}
            >
              <option value="">Select Role</option>
              <option value="user">Wedding Planner</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="error-text">{errors.role}</p>}
          </div>

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <div className="divider">or</div>

        <button className="google-button" onClick={() => alert("Google signup coming soon")}>
          <FcGoogle className="google-icon" /> Sign up with Google
        </button>

        <p className="auth-bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
