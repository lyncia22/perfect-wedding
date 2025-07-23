import { useState } from "react";
import "./ManageVendors.css";

export default function ManageVendors() {
  const vendors = [
    {
      id: 1,
      name: "Awesome Catering",
      service: "Catering",
      contact: "awesome@example.com",
      image: "https://i.pinimg.com/1200x/56/1d/f0/561df0ddacb3d0ddd77ef4dfa6226c9f.jpg",
    },
    {
      id: 2,
      name: "Picture Perfect",
      service: "Photography",
      contact: "pp@example.com",
      image: "https://i.pinimg.com/1200x/81/18/af/8118af29a07d8f85fb6dbbd77acb07f5.jpg",
    },
    {
      id: 3,
      name: "Floral Magic",
      service: "Florist",
      contact: "floral@example.com",
      image: "https://i.pinimg.com/1200x/84/7f/fb/847ffb62c7f03386d8357b5bc4fa06dc.jpg",
    },
    {
      id: 4,
      name: "Catering Kings",
      service: "Catering",
      contact: "caterkings@example.com",
      image: "https://i.pinimg.com/736x/0e/d3/30/0ed33055dbe635562c5a48239e6c454f.jpg",
    },
  ];

  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleDelete = (id) => {
    alert(`Delete vendor with ID: ${id}`);
  };

  // Group vendors by service
  const grouped = vendors.reduce((acc, vendor) => {
    acc[vendor.service] = acc[vendor.service] || [];
    acc[vendor.service].push(vendor);
    return acc;
  }, {});

  return (
    <div className="manage-vendors">
      <h1>Manage Vendors</h1>
      <p>Click "View" to see vendor details.</p>

      {Object.keys(grouped).map((category) => (
        <div key={category} className="vendor-group">
          <h2>{category}</h2>
          <div className="vendor-table-wrapper">
            <table className="vendor-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped[category].map((vendor) => (
                  <tr key={vendor.id}>
                    <td>
                      <img src={vendor.image} alt={vendor.name} className="vendor-img" />
                    </td>
                    <td>{vendor.name}</td>
                    <td>{vendor.contact}</td>
                    <td className="action-buttons">
                      <button className="view-btn" onClick={() => setSelectedVendor(vendor)}>
                        View
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(vendor.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedVendor && (
        <div className="modal-overlay" onClick={() => setSelectedVendor(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedVendor.image} alt={selectedVendor.name} />
            <h3>{selectedVendor.name}</h3>
            <p><strong>Service:</strong> {selectedVendor.service}</p>
            <p><strong>Contact:</strong> {selectedVendor.contact}</p>
            <button onClick={() => setSelectedVendor(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
