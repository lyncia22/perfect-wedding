// WeddingDetails.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "./WeddingDetails.css";

export default function WeddingDetails() {
  const [formData, setFormData] = useState({
    couple_names: "",
    wedding_date: "",
    venue: "",
    theme: "",
    location: "",
    budget: "",
  });

  const [isEditing, setIsEditing] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const venueOptions = ["Beachside", "Garden", "Hotel Ballroom", "Rustic Barn", "City Hall", "Other"];
  const themeOptions = ["Classic", "Bohemian", "Vintage", "Modern", "Fairytale", "Rustic"];
  const locationOptions = ["Harare", "Bulawayo", "Mutare", "Gweru", "Masvingo", "Chitungwiza", "Kadoma", "Other"];

  useEffect(() => {
    const fetchUserAndDetails = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error getting user:", userError);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("wedding_details")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Fetch error:", error);
      } else if (data) {
        setFormData(data);
        setIsEditing(false);
      }
    };

    fetchUserAndDetails();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    const { couple_names, wedding_date, venue, location, budget } = formData;
    if (!couple_names || !wedding_date || !venue || !location || !budget) {
      alert("Please fill in all required fields.");
      return;
    }

    const { data, error } = await supabase
      .from("wedding_details")
      .upsert({
        user_id: user.id,
        couple_names: formData.couple_names,
        wedding_date: formData.wedding_date,
        venue: formData.venue,
        theme: formData.theme,
        location: formData.location,
        budget: parseFloat(formData.budget),
      }, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      console.error("Save error:", error);
      alert("Failed to save wedding details.");
    } else {
      alert("Wedding details saved 🎉");
      setIsEditing(false);
      navigate("/dashboard/budget");
    }
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
              <input type="text" name="couple_names" value={formData.couple_names} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Wedding Date</label>
              <input type="date" name="wedding_date" value={formData.wedding_date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Venue</label>
              <select name="venue" value={formData.venue} onChange={handleChange} required>
                <option value="" disabled>Select a venue</option>
                {venueOptions.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Theme</label>
              <select name="theme" value={formData.theme} onChange={handleChange}>
                <option value="" disabled>Select a theme (optional)</option>
                {themeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <select name="location" value={formData.location} onChange={handleChange} required>
                <option value="" disabled>Select a location</option>
                {locationOptions.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Budget (USD)</label>
              <input type="number" name="budget" value={formData.budget} onChange={handleChange} required min="0" />
            </div>

            <button type="submit" className="submit-btn">Save Details & Go to Budget</button>
          </form>
        ) : (
          <div className="wedding-details__preview">
            <p><strong>Couple:</strong> {formData.couple_names}</p>
            <p><strong>Date:</strong> {formData.wedding_date}</p>
            <p><strong>Venue:</strong> {formData.venue}</p>
            <p><strong>Theme:</strong> {formData.theme}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Budget:</strong> ${formData.budget}</p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Details</button>
          </div>
        )}
      </div>
    </div>
  );
}
