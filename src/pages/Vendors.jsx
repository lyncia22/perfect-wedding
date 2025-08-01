import "./Vendors.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaHandshake, FaPhoneAlt, FaTrash } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

// 🚨 Use your actual Supabase credentials here
const supabase = createClient(
  "https://your-project-id.supabase.co",
  "your-public-anon-key"
);

export default function Vendors() {
  const [vendorName, setVendorName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [vendors, setVendors] = useState([]);

  // Load from Supabase
  useEffect(() => {
    const fetchVendors = async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading vendors:", error);
      } else {
        setVendors(data);
      }
    };

    fetchVendors();
  }, []);

  // Add vendor to Supabase
  const handleAddVendor = async (e) => {
    e.preventDefault();

    if (!vendorName.trim() || !serviceType || !contactInfo.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const { data, error } = await supabase.from("vendors").insert([
      {
        name: vendorName.trim(),
        service: serviceType,
        contact: contactInfo.trim(),
      },
    ]);

    if (error) {
      console.error("Error adding vendor:", error.message);
    } else {
      setVendors([data[0], ...vendors]);
      setVendorName("");
      setServiceType("");
      setContactInfo("");
    }
  };

  // Delete vendor from Supabase
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this vendor?");
    if (!confirm) return;

    const { error } = await supabase.from("vendors").delete().eq("id", id);

    if (error) {
      console.error("Error deleting vendor:", error.message);
    } else {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    }
  };

  return (
    <div className="vendors">
      <div className="vendors__image">
        <img
          src="https://i.pinimg.com/736x/3e/03/31/3e03316dc339cd0d0d862f54809d48b8.jpg"
          alt="Vendors"
        />
      </div>

      <div className="vendors__content">
        <h1>
          Vendors <FaHandshake />
        </h1>
        <p>
          Manage your caterers, photographers, decorators, and more. Keep your
          vendor list organized in one place for easy planning.
        </p>

        <form onSubmit={handleAddVendor} className="vendors__form">
          <input
            type="text"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          />

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          >
            <option value="">Select Service Type</option>
            <option value="Catering">Catering</option>
            <option value="Photography">Photography</option>
            <option value="Decor">Decor</option>
            <option value="Venue">Venue</option>
            <option value="Makeup">Makeup</option>
            <option value="DJ">DJ</option>
            <option value="Bakery">Bakery</option>
            <option value="Transportation">Transportation</option>
            <option value="Florist">Florist</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Contact Info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />

          <button type="submit">
            <MdOutlineAddBox size={20} /> Add Vendor
          </button>
        </form>

        <div className="vendors__list">
          {vendors.length === 0 ? (
            <p>No vendors yet. Start adding your dream team.</p>
          ) : (
            vendors.map((vendor) => (
              <div key={vendor.id} className="vendor-item">
                <strong>{vendor.name}</strong> - {vendor.service}{" "}
                <FaPhoneAlt /> {vendor.contact}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(vendor.id)}
                  aria-label={`Delete vendor ${vendor.name}`}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
