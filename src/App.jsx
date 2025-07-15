import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Onboarding page
import Onboarding from "./pages/Onboarding"; // adjust path if needed

// User Dashboard components
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import WeddingDetails from "./pages/WeddingDetails";
import GuestList from "./pages/GuestList";
import Tasks from "./pages/Tasks";
import Vendors from "./pages/Vendors";
import Budget from "./pages/Budget";
import InspirationGallery from "./pages/InspirationGallery";



// Admin Dashboard components
import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/adminHome";
import ManageWeddings from "./admin/ManageWeddings";
import ManageVendors from "./admin/ManageVendors";
import Analytics from "./admin/Analytics";

// Vendor Dashboard components
import VendorLayout from "./vendor/VendorLayout";
import VendorHome from "./vendor/VendorHome";
import VendorOrders from "./vendor/VendorOrders";
import VendorMessages from "./vendor/VendorMessages";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to onboarding */}
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        
        {/* Onboarding route */}
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="wedding-details" element={<WeddingDetails />} />
          <Route path="guest-list" element={<GuestList />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="budget" element={<Budget />} />
          <Route path="inspiration" element={<InspirationGallery />} />

        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="weddings" element={<ManageWeddings />} />
          <Route path="vendors" element={<ManageVendors />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Vendor Dashboard */}
        <Route path="/vendor-dashboard" element={<VendorLayout />}>
          <Route index element={<VendorHome />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="messages" element={<VendorMessages />} />
        </Route>
      </Routes>
    </Router>
  );
}
