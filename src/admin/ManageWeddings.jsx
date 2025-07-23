import { useState } from "react";
import "./ManageWeddings.css";

export default function ManageWeddings() {
  const weddings = [
    {
      id: 1,
      couple: "Alice & Bob",
      date: "2025-08-15",
      venue: "Rose Garden",
      location: "Harare",
      theme: "Classic",
      image: "https://i.pinimg.com/1200x/f1/de/31/f1de313f95d012689b4e6d688917df55.jpg",
    },
    {
      id: 2,
      couple: "Chris & Dana",
      date: "2025-09-20",
      venue: "Beach Resort",
      location: "Mutare",
      theme: "Bohemian",
      image: "https://i.pinimg.com/1200x/44/cd/58/44cd58f07176994732aa5c398d997cd5.jpg",
    },
    {
      id: 3,
      couple: "Eve & Frank",
      date: "2025-10-05",
      venue: "City Hall",
      location: "Bulawayo",
      theme: "Modern",
      image: "https://i.pinimg.com/736x/16/f0/87/16f087bd04c13963359c9d87e692d16f.jpg",
    },
  ];

  const [selectedWedding, setSelectedWedding] = useState(null);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-ZW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="manage-weddings">
      <h1>Manage Weddings</h1>
      <p>Browse, preview, and manage weddings with ease.</p>

      <div className="wedding-table-wrapper">
        <table className="wedding-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Couple</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {weddings.map((wedding) => (
              <tr key={wedding.id}>
                <td>
                  <img src={wedding.image} alt={wedding.couple} className="wedding-img" />
                </td>
                <td>{wedding.couple}</td>
                <td>{formatDate(wedding.date)}</td>
                <td>{wedding.venue}</td>
                <td className="action-buttons">
                  <button className="view-btn" onClick={() => setSelectedWedding(wedding)}>
                    View
                  </button>
                  <button className="delete-btn" onClick={() => alert("Delete not implemented")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedWedding && (
        <div className="modal-overlay" onClick={() => setSelectedWedding(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedWedding.image} alt="Wedding" className="modal-img" />
            <h2>{selectedWedding.couple}</h2>
            <p><strong>Date:</strong> {formatDate(selectedWedding.date)}</p>
            <p><strong>Venue:</strong> {selectedWedding.venue}</p>
            <p><strong>Location:</strong> {selectedWedding.location}</p>
            <p><strong>Theme:</strong> {selectedWedding.theme}</p>
            <button onClick={() => setSelectedWedding(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
