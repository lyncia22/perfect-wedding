import "./Navbar.css";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  return (
    <nav className="navbar">
      {/* Show menu button only when sidebar is closed */}
      {!isSidebarOpen && (
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <h1 className="navbar-title">Wedding Planner Dashboard</h1>
    </nav>
  );
}
