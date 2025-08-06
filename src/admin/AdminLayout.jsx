import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import supabase from "../supabaseClient"; // Adjust path if needed
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <div className="admin-content">
          <Outlet /> {/* This renders your nested routes */}
        </div>
      </div>
    </div>
  );
}
