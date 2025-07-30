import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Context + Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Onboarding page
import Onboarding from "./pages/Onboarding";

// User Dashboard
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import WeddingDetails from "./pages/WeddingDetails";
import GuestList from "./pages/GuestList";
import Tasks from "./pages/Tasks";
import Vendors from "./pages/Vendors";
import Budget from "./pages/Budget";
import InspirationGallery from "./pages/InspirationGallery";

// Admin Dashboard
import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/AdminHome";
import ManageWeddings from "./admin/ManageWeddings";
import ManageVendors from "./admin/ManageVendors";
import Analytics from "./admin/Analytics";

// Vendor Dashboard
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

        {/* Onboarding Page */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="wedding-details" element={<WeddingDetails />} />
          <Route path="guest-list" element={<GuestList />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="budget" element={<Budget />} />
          <Route path="inspiration" element={<InspirationGallery />} />
        </Route>

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="weddings" element={<ManageWeddings />} />
          <Route path="vendors" element={<ManageVendors />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Vendor Dashboard (Protected) */}
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<VendorHome />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="messages" element={<VendorMessages />} />
        </Route>

       
      </Routes>
    </Router>
  );
}
