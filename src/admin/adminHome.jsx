import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
console.log("Supabase client:", supabase);

import "./adminHome.css";
import { FaUsers, FaStore, FaChartLine } from "react-icons/fa";

export default function AdminHome() {
  const [weddingsCount, setWeddingsCount] = useState(0);
  const [vendorsCount, setVendorsCount] = useState(0);
  const [analyticsData, setAnalyticsData] = useState("0");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAdminAndFetchData();
  }, []);

  const verifyAdminAndFetchData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login"); // Not logged in → redirect to login
        return;
      }

      // ✅ Fetch user role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile) {
        alert("Error fetching profile!");
        navigate("/");
        return;
      }

      if (profile.role !== "admin") {
        navigate("/unauthorized"); // ✅ redirect if not admin
        return;
      }

      await fetchStats();
    } catch (error) {
      console.error("Error verifying admin:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: weddings } = await supabase
        .from("weddings")
        .select("*", { count: "exact", head: true });

      const { count: vendors } = await supabase
        .from("vendors")
        .select("*", { count: "exact", head: true });

      setWeddingsCount(weddings || 0);
      setVendorsCount(vendors || 0);

      const totalAnalytics = (weddings || 0) + (vendors || 0);
      setAnalyticsData(totalAnalytics.toLocaleString());
    } catch (error) {
      console.error("Error fetching stats:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-home">
      <div className="admin-welcome-image">
        <img
          src="https://i.pinimg.com/736x/43/a6/73/43a6738b87cddf27edf37db7cb83d3aa.jpg"
          alt="Admin Dashboard Illustration"
        />
      </div>

      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="subtext">Overview of your wedding planning platform.</p>
      </header>

      <section className="admin-stats">
        <NavLink to="/admin-dashboard/weddings" className="admin-card-link">
          <div className="admin-card">
            <FaUsers className="admin-icon users" />
            <div className="admin-card-info">
              <h2>{weddingsCount}</h2>
              <p>Weddings Managed</p>
            </div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/vendors" className="admin-card-link">
          <div className="admin-card">
            <FaStore className="admin-icon vendors" />
            <div className="admin-card-info">
              <h2>{vendorsCount}</h2>
              <p>Vendors Registered</p>
            </div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/analytics" className="admin-card-link">
          <div className="admin-card">
            <FaChartLine className="admin-icon analytics" />
            <div className="admin-card-info">
              <h2>{analyticsData}</h2>
              <p>Analytics Insights</p>
            </div>
          </div>
        </NavLink>
      </section>
    </div>
  );
}
