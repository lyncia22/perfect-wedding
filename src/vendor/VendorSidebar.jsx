import { NavLink } from "react-router-dom";
import { FaHome, FaClipboardList, FaComments } from "react-icons/fa";
import "./vendor.css";

export default function VendorSidebar() {
  return (
    <aside className="vendor-sidebar">
      <div className="vendor-logo">
        <h2>Vendor</h2>
      </div>
      <ul className="vendor-links">
        <li>
          <NavLink
            to="/vendor-dashboard"
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaHome className="link-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vendor-dashboard/orders"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaClipboardList className="link-icon" />
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vendor-dashboard/messages"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaComments className="link-icon" />
            <span>Messages</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
