import "./GuestList.css";
import { useState } from "react";

export default function GuestList() {
  const [guestName, setGuestName] = useState("");
  const [guestStatus, setGuestStatus] = useState("Pending");
  const [guestNote, setGuestNote] = useState("");
  const [guests, setGuests] = useState([]);

  const handleAddGuest = (e) => {
    e.preventDefault();
    const newGuest = {
      name: guestName,
      status: guestStatus,
      note: guestNote,
    };
    setGuests([...guests, newGuest]);
    setGuestName("");
    setGuestStatus("Pending");
    setGuestNote("");
  };

  return (
    <div className="guest-list">
      <div className="guest-list__image">
        <img
          src="https://i.pinimg.com/736x/1c/5f/8a/1c5f8a7d49b73ea9182eb0611cb8bf98.jpg"
          alt="Guest List"
        />
      </div>

      <div className="guest-list__content">
        <h1>Guest List 🎟️</h1>
        <form onSubmit={handleAddGuest} className="guest-list__form">
          <div className="form-group">
            <label>Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>RSVP Status</label>
            <select
              value={guestStatus}
              onChange={(e) => setGuestStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>Attending</option>
              <option>Not Attending</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <input
              type="text"
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Guest
          </button>
        </form>

        <div className="guest-list__items">
          {guests.length === 0 ? (
            <p>No guests added yet.</p>
          ) : (
            guests.map((guest, index) => (
              <div key={index} className="guest-item">
                <strong>{guest.name}</strong> - {guest.status}
                {guest.note && <div className="guest-note">Note: {guest.note}</div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
