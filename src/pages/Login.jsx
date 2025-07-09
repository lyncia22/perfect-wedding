import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Simple email regex for validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    else if (!validateEmail(email)) validationErrors.email = "Email is invalid";

    if (!password) validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Fake login success
      alert("Logged in successfully! Redirecting...");
      // Redirect to dashboard or home page (change path when dashboard ready)
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image" aria-label="Wedding background image" />

      <div className="auth-form-container">
        <h2>Welcome Back 💍</h2>
        <p>Log in to your wedding planner account</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button
            type="submit"
            className="auth-button"
            disabled={!email || !password || Object.keys(errors).length > 0}
          >
            Login
          </button>
        </form>

        <p className="auth-bottom-text">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
