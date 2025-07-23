import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaTasks,
  FaStore,
  FaMoneyBillWave
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
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
  <NavLink to="/dashboard/inspiration">Inspiration</NavLink>
</li>

      </ul>
    </aside>
  );
}
