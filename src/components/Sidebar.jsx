import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Wedding Planner</h2>
      <ul className="sidebar__links">
        <li>
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active-link" : ""}>
            🏠 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/wedding-details" className={({ isActive }) => isActive ? "active-link" : ""}>
            💍 Wedding Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/guest-list" className={({ isActive }) => isActive ? "active-link" : ""}>
            🎟️ Guest List
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tasks" className={({ isActive }) => isActive ? "active-link" : ""}>
            ✅ Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/vendors" className={({ isActive }) => isActive ? "active-link" : ""}>
            🤝 Vendors
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
