import "./AdminNavbar.css";

export default function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <h3>Admin Dashboard</h3>
      <div className="admin-profile">
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin"
        />
        <span>Admin</span>
      </div>
    </nav>
  );
}
