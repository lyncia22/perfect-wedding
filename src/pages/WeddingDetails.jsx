import "./WeddingDetails.css";
import { useState } from "react";

export default function WeddingDetails() {
  const [formData, setFormData] = useState({
    coupleNames: "",
    weddingDate: "",
    venue: "",
    theme: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Wedding saved for ${formData.coupleNames} on ${formData.weddingDate}! 🎉`);
    // Later you'll send this to your backend
  };

  return (
    <div className="wedding-details">
      <div className="wedding-details__image">
        <img
          src="https://i.pinimg.com/736x/dd/c3/63/ddc363ce4a357cea2cc680dfd1116369.jpg"
          alt="Wedding"
        />
      </div>

      <div className="wedding-details__content">
        <h1>Wedding Details 💍</h1>
        <form onSubmit={handleSubmit} className="wedding-details__form">
          <div className="form-group">
            <label>Couple's Names</label>
            <input
              type="text"
              name="coupleNames"
              value={formData.coupleNames}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Wedding Date</label>
            <input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Theme</label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
}
