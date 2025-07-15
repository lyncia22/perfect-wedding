import { useState } from "react";
import "./InspirationGallery.css";

export default function InspirationGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    "https://i.pinimg.com/736x/f3/24/07/f324074644aa902832f00da22527b2ef.jpg",
    "https://i.pinimg.com/1200x/6b/26/6b/6b266b3f2b4e530bca7b0954e5072da2.jpg",
    "https://i.pinimg.com/736x/58/e8/f8/58e8f8cc0d47cad9bbb8dcf29b45a956.jpg",
    "https://i.pinimg.com/1200x/30/7d/2b/307d2b76a1c1689769a058e5f0a3e00b.jpg",
    "https://i.pinimg.com/736x/f6/81/5a/f6815a42b41f520016c63f5af1232914.jpg",
    "https://i.pinimg.com/736x/23/42/a0/2342a0f122a1ddd6b75a4fe43e3f97ae.jpg",
    "https://i.pinimg.com/736x/52/37/60/523760f2485caaa01c21a075499fb38b.jpg",
    "https://i.pinimg.com/1200x/f6/2a/fd/f62afdf851a31dbaa1dc603781d53254.jpg",
    "https://i.pinimg.com/736x/6f/de/01/6fde01fb03ab54d4b189b65529ad7ba8.jpg",
  ];

  return (
    <div className="gallery-page">
      <h1>Wedding Inspiration ✨</h1>
      <p className="gallery-subtitle">Get inspired by beautiful wedding ideas</p>

      <div className="gallery-grid">
        {galleryImages.map((img, index) => (
          <div key={index} className="gallery-item" onClick={() => setSelectedImage(img)}>
            <img src={img} alt={`Inspiration ${index + 1}`} />
            <div className="overlay">View</div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Selected Inspiration" />
        </div>
      )}
    </div>
  );
}
