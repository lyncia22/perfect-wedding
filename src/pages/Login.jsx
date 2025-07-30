import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import supabase from "../supabaseClient";
import "../styles/auth.css";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // If already logged in, redirect
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await redirectUser(session.user.id);
      }
    });
    // eslint-disable-next-line
  }, []);

  const redirectUser = async (userId) => {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    if (profileError || !profile?.role) {
      setErrors({ general: "Couldn't fetch user role. Try again later." });
      return;
    }
    const role = profile.role;
    // Save to AuthContext/localStorage
    login({ id: userId }, role);

    // Redirect based on role
    if (role === "user" || role === "wedding planner") {
      navigate("/dashboard");
    } else if (role === "vendor") {
      navigate("/vendor-dashboard");
    } else {
      navigate("/admin-dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    else if (!validateEmail(email)) validationErrors.email = "Enter a valid email";
    if (!password) validationErrors.password = "Password is required";
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setShowResend(false);
    setResendMessage("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email, password,
      });

      if (authError) {
        const msg = authError.message.toLowerCase();
        if (msg.includes("email not confirmed") || msg.includes("confirm your email")) {
          setErrors({ general: "Please confirm your email before logging in." });
          setShowResend(true);
        } else {
          setErrors({ general: "Invalid email or password." });
        }
        setLoading(false);
        return;
      }
      const user = authData?.user;
      if (!user) {
        setErrors({ general: "Login failed. Please try again later." });
        setLoading(false);
        return;
      }
      await redirectUser(user.id);
    } catch (err) {
      setErrors({ general: "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendMessage("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      setResendMessage(error ? "Failed to resend confirmation. Try again later."
                             : "Confirmation email resent! Check your inbox.");
    } catch {
      setResendMessage("Unexpected error resending email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image" aria-label="Wedding background image" />
      <div className="auth-form-container">
        <h2>Welcome Back</h2>
        <p className="auth-subtext">Log in to your account</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {errors.general && <p className="error-text center-text">{errors.general}</p>}
          <div className="form-group">
            {email === "" && <FiMail className="input-icon" />}
            <input
              type="email" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              autoComplete="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            {password === "" && <FiLock className="input-icon" />}
            <input
              type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
              autoComplete="current-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {showResend && (
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button className="resend-button" onClick={handleResendConfirmation} disabled={loading} type="button">
              Resend Confirmation Email
            </button>
            {resendMessage && <p className="success-text">{resendMessage}</p>}
          </div>
        )}
        <div className="divider">or</div>
        <button
          className="google-button"
          onClick={() => alert("Google login coming soon!")}
          type="button"
        >
          <FcGoogle className="google-icon" /> Login with Google
        </button>
        <p className="auth-bottom-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
