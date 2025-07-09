import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-image" aria-label="Wedding background image" />

      <div className="auth-form-container">
        <h2>Create Your Account 🎉</h2>
        <p>Start planning your dream wedding</p>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="auth-bottom-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
