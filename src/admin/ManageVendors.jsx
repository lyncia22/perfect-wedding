import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "./ManageVendors.css";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    service: "",
    contact: "",
    vendor_group: "",
    image_url: ""
  });

  // Fetch vendors
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Fetch error:", error);
    else setVendors(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("vendors").insert([form]);

    if (error) {
      console.error("Insert error:", error);
    } else {
      setForm({
        name: "",
        service: "",
        contact: "",
        vendor_group: "",
        image_url: ""
      });
      fetchVendors(); // refresh
    }
  };

  const handleDelete = async (id) => {
    await supabase.from("vendors").delete().eq("id", id);
    fetchVendors(); // refresh
  };

  return (
    <div className="vendors-container">
      <form onSubmit={handleAddVendor} className="vendor-form">
        <h2>Add New Vendor</h2>
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="service"
          placeholder="Service"
          value={form.service}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vendor_group"
          placeholder="Vendor Group"
          value={form.vendor_group}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
        />
        <button type="submit">Add Vendor</button>
      </form>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.image_url || "https://via.placeholder.com/150"} alt={vendor.name} />
            <h3>{vendor.name}</h3>
            <p>{vendor.service}</p>
            <p>{vendor.contact}</p>
            <p><strong>Group:</strong> {vendor.vendor_group}</p>
            <button onClick={() => handleDelete(vendor.id)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
