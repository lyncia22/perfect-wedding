import { useState, useEffect } from "react";
import supabase from "../supabaseClient"; // Make sure this is correctly configured
import "./GuestList.css";

export default function GuestList() {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestStatus, setGuestStatus] = useState("Pending");
  const [guestNote, setGuestNote] = useState("");
  const [guests, setGuests] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch logged-in user and guest list
  useEffect(() => {
    async function fetchUserAndGuests() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in", userError);
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching guests:", error);
      } else {
        setGuests(data);
      }
    }

    fetchUserAndGuests();
  }, []);

  const handleAddGuest = async (e) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert("Guest name is required");
      return;
    }

    // Insert new guest row
    const { data, error } = await supabase.from("guests").insert([
      {
        user_id: user.id,
        name: guestName.trim(),
        email: guestEmail.trim() || null,
        phone: guestPhone.trim() || null,
        status: guestStatus,
        note: guestNote.trim() || null,
        invite_sent: false,
      },
    ]);

    if (error) {
      console.error("Error adding guest:", error);
      alert("Failed to add guest");
    } else {
      // Update guest list in UI immediately
      setGuests((prev) => [data[0], ...prev]);
      // Reset form
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setGuestStatus("Pending");
      setGuestNote("");
    }
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
            <label>Guest Name *</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              placeholder="Enter guest name"
            />
          </div>

          <div className="form-group">
            <label>Email (optional)</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label>Phone (optional)</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="Enter phone number"
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
            <label>Notes (optional)</label>
            <input
              type="text"
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
              placeholder="Any notes about the guest"
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
            guests.map((guest) => (
              <div key={guest.id} className="guest-item">
                <strong>{guest.name}</strong> - {guest.status}
                {guest.email && (
                  <div className="guest-contact">Email: {guest.email}</div>
                )}
                {guest.phone && (
                  <div className="guest-contact">Phone: {guest.phone}</div>
                )}
                {guest.note && (
                  <div className="guest-note">Note: {guest.note}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
