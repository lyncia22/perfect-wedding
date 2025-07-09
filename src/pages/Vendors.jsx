import "./Vendors.css";
import { useState } from "react";

export default function Vendors() {
  const [vendorName, setVendorName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [vendors, setVendors] = useState([]);

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!vendorName || !serviceType || !contactInfo) return;

    const newVendor = {
      id: Date.now(),
      name: vendorName,
      service: serviceType,
      contact: contactInfo,
    };

    setVendors([newVendor, ...vendors]);
    setVendorName("");
    setServiceType("");
    setContactInfo("");
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
        <h1>Vendors 🤝</h1>
        <p>
          Manage your caterers, photographers, decorators, and more. Keep your vendor
          list organized in one place for easy planning.
        </p>
        <p>Find, contact, and coordinate with ease.</p>

        <form onSubmit={handleAddVendor} className="vendors__form">
          <input
            type="text"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">Select Service Type</option>
            <option value="Catering ">Catering </option>
            <option value="Photography ">Photography </option>
            <option value="Decor ">Decor </option>
            <option value="Venue ">Venue </option>
            <option value="Makeup ">Makeup </option>
            <option value="DJ ">DJ </option>
            <option value="Bakery ">Bakery </option>
            <option value="Transportation ">Transportation </option>
            <option value="Florist ">Florist </option>
            <option value="Other ">Other </option>
          </select>

          <input
            type="text"
            placeholder="Contact Info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />

          <button type="submit">Add Vendor</button>
        </form>

        <div className="vendors__list">
          {vendors.length === 0 ? (
            <p>No vendors added yet. Start building your dream team!</p>
          ) : (
            vendors.map((vendor) => (
              <div key={vendor.id} className="vendor-item">
                <strong>{vendor.name}</strong> - {vendor.service} 📞 {vendor.contact}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
