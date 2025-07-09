import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboard components
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import WeddingDetails from "./pages/WeddingDetails";
import GuestList from "./pages/GuestList";
import Tasks from "./pages/Tasks";
import Vendors from "./pages/Vendors";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="wedding-details" element={<WeddingDetails />} />
          <Route path="guest-list" element={<GuestList />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="vendors" element={<Vendors />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
