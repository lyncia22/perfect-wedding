import { NavLink } from "react-router-dom";
import "./adminHome.css";
import { FaUsers, FaStore, FaChartLine } from "react-icons/fa";

export default function AdminHome() {
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
              <h2>120</h2>
              <p>Weddings Managed</p>
            </div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/vendors" className="admin-card-link">
          <div className="admin-card">
            <FaStore className="admin-icon vendors" />
            <div className="admin-card-info">
              <h2>45</h2>
              <p>Vendors Registered</p>
            </div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/analytics" className="admin-card-link">
          <div className="admin-card">
            <FaChartLine className="admin-icon analytics" />
            <div className="admin-card-info">
              <h2>8.5K</h2>
              <p>Analytics Insights</p>
            </div>
          </div>
        </NavLink>
      </section>
    </div>
  );
}
