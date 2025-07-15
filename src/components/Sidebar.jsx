import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaTasks,
  FaStore,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Show toggle button ONLY when sidebar is closed */}
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Close button inside sidebar */}
        {isOpen && (
          <button className="sidebar__close" onClick={toggleSidebar}>
            ✖
          </button>
        )}

        {isOpen && (
          <>
            <h2 className="sidebar__title">Wedding Planner</h2>
            <ul className="sidebar__links">
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaTachometerAlt className="sidebar-icon" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/wedding-details"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaClipboardList className="sidebar-icon" />
                  Wedding Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/guest-list"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaUsers className="sidebar-icon" />
                  Guest List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/tasks"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaTasks className="sidebar-icon" />
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/vendors"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaStore className="sidebar-icon" />
                  Vendors
                </NavLink>
                <li>
  <NavLink to="/dashboard/budget" className={({ isActive }) => (isActive ? "active-link" : "")}>
     Budget
  </NavLink>
</li>

              </li>
            </ul>
          </>
        )}
      </aside>
    </>
  );
}
