import "./VendorMessages.css";
import { useState } from "react";

export default function VendorMessages() {
  const [messages] = useState([
    { id: 1, sender: "Lynn & John", content: "Are you available on our date?" },
    { id: 2, sender: "Emma & Noah", content: "Can we see your portfolio?" },
    { id: 3, sender: "Sophia & Liam", content: "What are your package prices?" },
  ]);

  return (
    <div className="vendor-messages">
      <h1>Messages 💬</h1>
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-item">
            <strong>{msg.sender}</strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
