import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import supabase from "../supabaseClient";
import "../styles/auth.css";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!fullName.trim()) validationErrors.fullName = "Full name is required";
    if (!email) validationErrors.email = "Email is required";
    else if (!validateEmail(email)) validationErrors.email = "Invalid email";
    if (!password) validationErrors.password = "Password is required";
    if (!role) validationErrors.role = "Please select a role";
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setErrors({});

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setErrors({ general: signUpError.message });
        setLoading(false);
        return;
      }

      // Insert profile regardless of confirmation
      const userId = data?.user?.id ?? data?.session?.user?.id;
      if (userId) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: userId,
            username: fullName.trim(),
            role,
          },
        ]);

        if (profileError) {
          setErrors({ general: "Error creating profile: " + profileError.message });
          setLoading(false);
          return;
        }
      }

      // Show confirmation and redirect to login
      alert("Signup successful! Please check your email to confirm your account.");
      navigate("/login");
    } catch {
      setErrors({ general: "Unexpected error during signup. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image" aria-label="Wedding background image" />
      <div className="auth-form-container">
        <h2>Create Your Account</h2>
        <p className="auth-subtext">Start planning your dream wedding</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {errors.general && <p className="error-text center-text">{errors.general}</p>}
          <div className="form-group">
            {fullName === "" && <FiUser className="input-icon" />}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={errors.fullName ? "input-error" : ""}
              autoComplete="name"
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>
          <div className="form-group">
            {email === "" && <FiMail className="input-icon" />}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              autoComplete="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            {password === "" && <FiLock className="input-icon" />}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
              autoComplete="new-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="form-group">
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className={errors.role ? "input-error" : ""}
            >
              <option value="">Select Role</option>
              <option value="user">Wedding Planner</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="error-text">{errors.role}</p>}
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="divider">or</div>
        <button
          type="button"
          className="google-button"
          onClick={() => alert("Google signup coming soon")}
        >
          <FcGoogle className="google-icon" /> Sign up with Google
        </button>
        <p className="auth-bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
