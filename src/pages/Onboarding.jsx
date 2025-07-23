import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

export default function Onboarding() {
  const navigate = useNavigate();

  const sections = [
    {
      type: "hero",
      image: "/hero1.jpeg",
      title: "Welcome to Wedding Bliss ✨",
      text: "Plan your big day effortlessly.",
      cta: true,
    },
    {
      type: "card",
      bgImage: "/background2.jpeg",
      cardImage: "/hero2.jpeg",
      title: "Manage Guests",
      text: "Track RSVPs, dietary needs, and seating with ease.",
      subtext: "Keep everyone happy and organized effortlessly.",
      buttonText: "Manage Guests",
      buttonLink: "/dashboard/guest-list",
    },
    {
      type: "card",
      bgImage: "/background3.jpeg",
      cardImage: "/hero3.jpeg",
      title: "Event Schedule",
      text: "Keep your timeline organized and on track.",
      subtext: "Never miss a single moment with reminders.",
      buttonText: "View Schedule",
      buttonLink: "/dashboard/schedule",
    },
    {
      type: "card",
      bgImage: "/background4.jpeg",
      cardImage: "/hero4.jpeg",
      title: "Budget Tracker",
      text: "Stay on top of your expenses, stress-free.",
      subtext: "Track spending and save money for what matters.",
      buttonText: "Track Budget",
      buttonLink: "/dashboard/budget",
    },
    {
      type: "card",
      bgImage: "/background5.jpeg",
      cardImage: "/hero5.jpeg",
      title: "Vendors",
      text: "Find and book the perfect wedding team.",
      subtext: "Trusted pros to make your day unforgettable.",
      buttonText: "Find Vendors",
      buttonLink: "/dashboard/vendors",
    },
  ];

  useEffect(() => {
    const reveal = () => {
      const els = document.querySelectorAll(".fade-section");
      els.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) el.classList.add("visible");
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div className="onboarding-wrapper">
      {sections.map((section, i) => {
        if (section.type === "hero") {
          return (
            <section
              key={i}
              className="fade-section hero-section"
              style={{ backgroundImage: `url(${section.image})` }}
            >
              <div className="hero-overlay" />
              <div className="hero-content">
                <h1>{section.title}</h1>
                <p>{section.text}</p>
                {section.cta && (
                  <button
                    className="cta-button"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </section>
          );
        } else if (section.type === "card") {
          const reverse = i % 2 === 0;
          return (
            <section
              key={i}
              className={`fade-section card-section ${reverse ? "reverse" : ""}`}
              style={{ backgroundImage: `url(${section.bgImage})` }}
            >
              <div className="card-overlay" />
              <div className="card-content">
                <img
                  src={section.cardImage}
                  alt={section.title}
                  className="card-image"
                />
                <div className="card-text">
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                  {section.subtext && (
                    <p className="subtext">{section.subtext}</p>
                  )}
                  {section.buttonText && section.buttonLink && (
                    <button
                      className="card-button"
                      onClick={() => navigate(section.buttonLink)}
                    >
                      {section.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        }
        return null;
      })}

      <footer
        className="onboarding-footer"
        style={{ backgroundImage: `url('/hero6.jpeg')` }}
      >
        <div className="footer-overlay" />
        <div className="footer-content">
          <p>© 2025 Wedding Bliss. All rights reserved.</p>
          <p>
            Made with love by{" "}
            <a
              href="https://wedding-bliss-website.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LYNCH
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
