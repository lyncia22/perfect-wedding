import "./VendorHome.css";
import { FaClipboardList, FaComments, FaTools } from "react-icons/fa";

export default function VendorHome() {
  return (
    <div className="vendor-home">
      <div className="vendor-home-header">
        <h1>Welcome Back to Your Vendor Dashboard</h1>
        <p>Manage your orders, connect with clients, and showcase your services.</p>
      </div>

      <div className="vendor-stats">
        <div className="vendor-card">
          <div className="vendor-card-icon">
            <FaClipboardList />
          </div>
          <div className="vendor-card-content">
            <h2>12</h2>
            <p>New Orders</p>
          </div>
        </div>

        <div className="vendor-card">
          <div className="vendor-card-icon">
            <FaComments />
          </div>
          <div className="vendor-card-content">
            <h2>5</h2>
            <p>Unread Messages</p>
          </div>
        </div>

        <div className="vendor-card">
          <div className="vendor-card-icon">
            <FaTools />
          </div>
          <div className="vendor-card-content">
            <h2>7</h2>
            <p>Services Listed</p>
          </div>
        </div>
      </div>

      <div className="vendor-welcome-image">
        <img
          src="https://i.pinimg.com/1200x/ca/fe/22/cafe22811a7a2a490a7d5db1f8a16507.jpg"
          alt="Vendor Illustration"
        />
      </div>
    </div>
  );
}
