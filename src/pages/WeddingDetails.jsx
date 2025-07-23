import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WeddingDetails.css";

export default function WeddingDetails() {
  const [formData, setFormData] = useState({
    coupleNames: "",
    weddingDate: "",
    venue: "",
    theme: "",
    location: "",
    budget: "", // ✅ Added budget
  });

  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();

  const venueOptions = [
    "Beachside",
    "Garden",
    "Hotel Ballroom",
    "Rustic Barn",
    "City Hall",
    "Other",
  ];

  const themeOptions = [
    "Classic",
    "Bohemian",
    "Vintage",
    "Modern",
    "Fairytale",
    "Rustic",
  ];

  const locationOptions = [
    "Harare",
    "Bulawayo",
    "Mutare",
    "Gweru",
    "Masvingo",
    "Chitungwiza",
    "Kadoma",
    "Other",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("weddingDetails");
    if (saved) {
      setFormData(JSON.parse(saved));
      setIsEditing(false);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("weddingDetails", JSON.stringify(formData));
    alert("Wedding details saved 🎉");
    navigate("/dashboard/budget"); // ✅ Redirect to Budget page
  };

  return (
    <div className="wedding-details">
      <div className="wedding-details__image">
        <img
          src="https://i.pinimg.com/736x/76/db/a0/76dba0776860ae6f8e1cd97443bc71a5.jpg"
          alt="Wedding"
        />
      </div>

      <div className="wedding-details__content">
        <h1>Wedding Details 💍</h1>

        {isEditing ? (
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
              <select
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a venue
                </option>
                {venueOptions.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Theme</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a theme (optional)
                </option>
                {themeOptions.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a location
                </option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Budget Field */}
            <div className="form-group">
              <label>Budget (USD)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Save Details & Go to Budget
            </button>
          </form>
        ) : (
          <div className="wedding-details__preview">
            <p>
              <strong>Couple:</strong> {formData.coupleNames}
            </p>
            <p>
              <strong>Date:</strong> {formData.weddingDate}
            </p>
            <p>
              <strong>Venue:</strong> {formData.venue}
            </p>
            <p>
              <strong>Theme:</strong> {formData.theme}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Budget:</strong> ${formData.budget}
            </p>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
