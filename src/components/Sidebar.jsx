import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaTasks,
  FaStore,
  FaMoneyBillWave,
  FaSignOutAlt // import logout icon
} from "react-icons/fa";
import "./Sidebar.css";
import supabase from "../supabaseClient"; // make sure supabase is correctly set up

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      navigate("/"); // redirect to login or home page after logout
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Wedding Planner</h2>
      <ul className="sidebar__links">
        <li>
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaTachometerAlt className="sidebar-icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/wedding-details" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaClipboardList className="sidebar-icon" /> Wedding Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/guest-list" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaUsers className="sidebar-icon" /> Guest List
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tasks" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaTasks className="sidebar-icon" /> Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/vendors" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaStore className="sidebar-icon" /> Vendors
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/budget" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaMoneyBillWave className="sidebar-icon" /> Budget
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inspiration" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaClipboardList className="sidebar-icon" /> Inspiration
          </NavLink>
        </li>
      </ul>

      {/* Logout button at the bottom */}
      <div className="sidebar__logout" onClick={handleLogout}>
        <FaSignOutAlt className="sidebar-icon" /> Logout
      </div>
    </aside>
  );
}
