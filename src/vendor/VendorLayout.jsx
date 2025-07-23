import VendorSidebar from "./VendorSidebar";
import VendorNavbar from "./VendorNavbar";
import { Outlet } from "react-router-dom";
import "./vendor.css";

export default function VendorLayout() {
  return (
    <div className="vendor-layout">
      <VendorSidebar />
      <div className="vendor-main">
        <VendorNavbar />
        <div className="vendor-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
