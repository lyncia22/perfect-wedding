import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const GuestInviteForm = ({ weddingDetails }) => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Use local state for wedding info or fallback if missing
  const [partnerOne, setPartnerOne] = useState("");
  const [partnerTwo, setPartnerTwo] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingTime, setWeddingTime] = useState("");
  const [venue, setVenue] = useState("");
  const [rsvpDate, setRsvpDate] = useState("");
  const [rsvpLink, setRsvpLink] = useState("");

  useEffect(() => {
    if (weddingDetails) {
      setPartnerOne(weddingDetails.partner_one || "Partner One");
      setPartnerTwo(weddingDetails.partner_two || "Partner Two");
      setWeddingDate(weddingDetails.date || "TBD");
      setWeddingTime(weddingDetails.time || "TBD");
      setVenue(weddingDetails.venue || "TBD");
      setRsvpDate(weddingDetails.rsvp_date || "TBD");
      setRsvpLink(weddingDetails.rsvp_link || "https://your-rsvp-link.com");
    }
  }, [weddingDetails]);

  const sendInvite = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      guest_name: guestName,
      to_email: guestEmail,
      partner_one: partnerOne,
      partner_two: partnerTwo,
      wedding_date: weddingDate,
      wedding_time: weddingTime,
      venue: venue,
      rsvp_date: rsvpDate,
      rsvp_link: rsvpLink,
    };

    emailjs
      .send(
        "service_n7a0ysb",          // Your Service ID
        "template_oi5om28",         // Your Template ID
        templateParams,
        "XoxEwOwH7MAe_r--f"         // Your Public Key
      )
      .then(
        () => {
          alert(`Invite sent to ${guestEmail}! 🎉`);
          setGuestName("");
          setGuestEmail("");
          setLoading(false);
        },
        (error) => {
          alert("Failed to send invite, try again later.");
          console.error("EmailJS error:", error);
          setLoading(false);
        }
      );
  };

  return (
    <form onSubmit={sendInvite} className="guest-invite-form">
      <input
        type="text"
        placeholder="Guest Name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        required
        className="input-field"
      />
      <input
        type="email"
        placeholder="Guest Email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
        required
        className="input-field"
      />
      <button type="submit" disabled={loading} className="send-btn">
        {loading ? "Sending..." : "Send Invite"}
      </button>
    </form>
  );
};

export default GuestInviteForm;
