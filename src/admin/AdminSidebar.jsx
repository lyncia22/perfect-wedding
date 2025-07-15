import { NavLink } from "react-router-dom";
import { FaChartBar, FaUserTie, FaHeart, FaHome } from "react-icons/fa";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <NavLink to="/admin-dashboard" end>
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/weddings">
            <FaHeart /> Manage Weddings
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/vendors">
            <FaUserTie /> Manage Vendors
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/analytics">
            <FaChartBar /> Analytics
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
