import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserFriends, FaTasks, FaHandshake } from "react-icons/fa";
import supabase from "../supabaseClient";
import "./DashboardHome.css";

export default function DashboardHome() {
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [guestsCount, setGuestsCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [vendorsCount, setVendorsCount] = useState(0);
  const navigate = useNavigate();

  // Fetch user and all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("User fetch error:", authError);
        return;
      }

      const userId = user.id;

      // Fetch wedding details
      const { data: weddingData, error: weddingError } = await supabase
        .from("wedding_details")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (weddingError) {
        console.error("Wedding details error:", weddingError);
      } else {
        setWeddingDetails(weddingData);
      }

      // Fetch guest count
      const { count: guestsCountResult, error: guestsError } = await supabase
        .from("guests")
        .select("id", { count: "exact" })
        .eq("user_id", userId);

      if (guestsError) {
        console.error("Guests count error:", guestsError);
      } else {
        setGuestsCount(guestsCountResult || 0);
      }

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId);

      if (tasksError) {
        console.error("Tasks fetch error:", tasksError);
      } else {
        setTasks(tasksData || []);
      }

      // Fetch vendors count
      const { count: vendorsCountResult, error: vendorsError } = await supabase
        .from("vendors")
        .select("id", { count: "exact" })
        .eq("user_id", userId);

      if (vendorsError) {
        console.error("Vendors count error:", vendorsError);
      } else {
        setVendorsCount(vendorsCountResult || 0);
      }
    };

    fetchDashboardData();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const taskProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="dashboard">
      {/* Hero Banner */}
      <div className="dashboard__hero">
        <img
          src="https://i.pinimg.com/736x/52/36/e4/5236e4673c530eff333867911d3becd4.jpg"
          alt="Wedding Hero"
          className="dashboard__hero-image"
        />
        <div className="dashboard__hero-text">
          <h1>
            {weddingDetails?.couple_names
              ? `${weddingDetails.couple_names}'s Wedding Dashboard`
              : "Welcome to Your Wedding Planner"}
          </h1>
          <p>Plan your dream wedding with ease and joy!</p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard__cards">
        <NavLink to="/dashboard/guest-list" className="dashboard__card-link">
          <div className="dashboard__card">
            <FaUserFriends className="card-icon" />
            <h2>Guests</h2>
            <p>{guestsCount} invited</p>
          </div>
        </NavLink>

        <NavLink to="/dashboard/tasks" className="dashboard__card-link">
          <div className="dashboard__card">
            <FaTasks className="card-icon" />
            <h2>Tasks</h2>
            <p>{pendingTasks} pending</p>
            {pendingTasks > 0 && <span className="card-badge">{pendingTasks}</span>}
          </div>
        </NavLink>

        <NavLink to="/dashboard/vendors" className="dashboard__card-link">
          <div className="dashboard__card">
            <FaHandshake className="card-icon" />
            <h2>Vendors</h2>
            <p>{vendorsCount} connected</p>
          </div>
        </NavLink>

        <NavLink to="/dashboard/budget" className="dashboard__card-link">
          <div className="dashboard__card">
            <h2>Budget</h2>
            <p>
              {weddingDetails?.budget
                ? `$${Number(weddingDetails.budget).toLocaleString()}`
                : "Track your expenses"}
            </p>
          </div>
        </NavLink>
      </div>

      {/* Progress Bar */}
      <div className="dashboard__progress">
        <h3>Task Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${taskProgress}%` }}
            aria-label={`Task completion: ${taskProgress}%`}
            role="progressbar"
          >
            {taskProgress}%
          </div>
        </div>
      </div>

      {/* Photo Gallery with Button */}
      <div className="dashboard__gallery">
        <img
          src="https://i.pinimg.com/736x/0d/df/4c/0ddf4c8eaee0451f6cd9379f3a01443d.jpg"
          alt="Gallery 1"
        />
        <img
          src="https://i.pinimg.com/736x/02/6b/0f/026b0f3589d303fb5e6ee85627b68e4f.jpg"
          alt="Gallery 2"
        />
        <img
          src="https://i.pinimg.com/736x/6b/e9/29/6be929204d84a9357e89ed87fc077537.jpg"
          alt="Gallery 3"
        />

        <button
          className="inspiration-btn"
          onClick={() => navigate("/dashboard/inspiration")}
        >
          View More Inspiration →
        </button>
      </div>
    </div>
  );
}
