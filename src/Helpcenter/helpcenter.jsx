import React from "react";
import {
  FAQ_PAGES,
  LEARN_MORE_PATH,
  NavLink,
  navigateTo,
} from "./navigation";
import "./helpcenter.css";

const categories = [
  { label: "Stays", active: true, icon: "stay" },
  { label: "Flights", icon: "flight" },
  { label: "Car rentals", icon: "car" },
  { label: "Attractions", icon: "attraction" },
  { label: "Airport taxis", icon: "taxi" },
  { label: "Insurance", icon: "shield" },
  { label: "Other", icon: "dots" },
];

const footerLinks = [
  "Countries",
  "Regions",
  "Cities",
  "Districts",
  "Airports",
  "Hotels",
  "Places of interest",
  "Holiday Homes",
  "Apartments",
  "Resorts",
  "Villas",
  "Hostels",
  "B&Bs",
  "Guest Houses",
  "Unique places to stay",
];

function CategoryIcon({ type }) {
  return (
    <span className="hc-category-icon" aria-hidden="true">
      {type === "stay" && (
        <svg viewBox="0 0 24 24">
          <path d="M4 11.5V7.8A1.8 1.8 0 0 1 5.8 6h12.4A1.8 1.8 0 0 1 20 7.8v3.7" />
          <path d="M3 18.5v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" />
          <path d="M5 18.5v-2.2h14v2.2" />
        </svg>
      )}
      {type === "flight" && (
        <svg viewBox="0 0 24 24">
          <path d="M3 14.5l7-1.8 8.4 4.2 2.1-1-5.7-5.1V6.9c0-1.1-.9-1.9-2-1.9s-2 .8-2 1.9v3L5.6 8.1l-2.1 1 4.1 3.6-4.6 1.2z" />
        </svg>
      )}
      {type === "car" && (
        <svg viewBox="0 0 24 24">
          <path d="M5.5 15.5h13l-1.1-5.1a1.7 1.7 0 0 0-1.7-1.4H8.3a1.7 1.7 0 0 0-1.7 1.4z" />
          <path d="M4 15.5h16v3a1 1 0 0 1-1 1h-1.5v-2H6.5v2H5a1 1 0 0 1-1-1z" />
          <circle cx="7.5" cy="15.6" r="1" />
          <circle cx="16.5" cy="15.6" r="1" />
        </svg>
      )}
      {type === "attraction" && (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="2.2" />
          <circle cx="6.4" cy="10.5" r="1.8" />
          <circle cx="17.6" cy="10.5" r="1.8" />
          <path d="M12 9.5v8.5M9 20l3-4 3 4M6.4 12.3V18M4.2 17l2.2-3 2.2 3M17.6 12.3V18M15.4 17l2.2-3 2.2 3" />
        </svg>
      )}
      {type === "taxi" && (
        <svg viewBox="0 0 24 24">
          <path d="M5 7.2h14M7.2 11h9.6M6 18h12" />
          <path d="M8.5 7.2v10.8M15.5 7.2v10.8" />
          <path d="M6.8 18h10.4" />
        </svg>
      )}
      {type === "shield" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 3.8 5.5 6v5.4c0 4.1 2.6 7.8 6.5 8.8 3.9-1 6.5-4.7 6.5-8.8V6z" />
          <path d="m9.2 12.2 1.8 1.8 3.8-4" />
        </svg>
      )}
      {type === "dots" && (
        <svg viewBox="0 0 24 24">
          <circle cx="6.5" cy="12" r="1.3" />
          <circle cx="12" cy="12" r="1.3" />
          <circle cx="17.5" cy="12" r="1.3" />
        </svg>
      )}
    </span>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.2v5.2" />
      <circle className="hc-fill-icon" cx="12" cy="7.3" r="0.8" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 17.5H8.8l-3.7 2.7v-2.7A4.3 4.3 0 0 1 3 13.7V8.8A4.8 4.8 0 0 1 7.8 4h6.4A4.8 4.8 0 0 1 19 8.8V13a4.5 4.5 0 0 1-4.5 4.5Z" />
      <path d="M18.2 14.2h.2A2.6 2.6 0 0 0 21 11.6V8.9A3.9 3.9 0 0 0 17.1 5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7.2 4.5 2.4 3.1c.4.5.4 1.1.1 1.6l-1 1.8a15.2 15.2 0 0 0 4.3 4.3l1.8-1c.5-.3 1.2-.2 1.6.2l3.1 2.3c.6.5.8 1.4.3 2-1.1 1.6-3 2.3-4.7 1.8A18.4 18.4 0 0 1 3.4 8.9c-.4-1.7.3-3.6 1.8-4.7.6-.5 1.5-.3 2 .3Z" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function HelpCenter() {
  return (
    <section className="hc-page">
      <div className="hc-shell">
        <p className="hc-eyebrow">Help Center</p>

        <div className="hc-alert">
          <div className="hc-alert-icon">
            <InfoIcon />
          </div>
          <div className="hc-alert-copy">
            <h3>Stay safe online</h3>
            <p>
              Check your payment policy. Booking.com will never ask for your
              account or payment info by phone, email, or chat (e.g. WhatsApp).
              If in doubt, report it to Booking.com.
            </p>
            <NavLink to={LEARN_MORE_PATH}>Learn more</NavLink>
          </div>
          <button className="hc-alert-toggle" type="button" aria-label="Collapse notice">
            <ChevronUpIcon />
          </button>
        </div>

        <header className="hc-hero">
          <h1>Welcome to the Help Center</h1>
          <p>Sign in to contact Customer Service - we&apos;re available 24 hours a day</p>
        </header>

        <div className="hc-contact-card">
          <div className="hc-contact-grid">
            <article className="hc-contact-item">
              <div className="hc-contact-icon">
                <MessageIcon />
              </div>
              <div className="hc-contact-copy">
                <h3>Send us a message</h3>
                <p>
                  Contact our agents about your booking, and we&apos;ll reply as soon as
                  possible.
                </p>
              </div>
            </article>

            <article className="hc-contact-item">
              <div className="hc-contact-icon">
                <PhoneIcon />
              </div>
              <div className="hc-contact-copy">
                <h3>Call us</h3>
                <p>
                  For anything urgent, you can call us 24/7 at a local or
                  international phone number.
                </p>
              </div>
            </article>
          </div>

          <button className="hc-signin-btn" type="button">
            Sign in
          </button>

          <button className="hc-secondary-link" type="button">
            Continue without an account
          </button>
        </div>

        <section className="hc-faq">
          <h2>Frequently asked questions</h2>

          <div className="hc-faq-card">
            <div className="hc-category-bar">
              {categories.map((category) => (
                <button
                  key={category.label}
                  className={`hc-category-item${category.active ? " is-active" : ""}`}
                  type="button"
                >
                  <CategoryIcon type={category.icon} />
                  <span className="hc-category-label">{category.label}</span>
                </button>
              ))}
            </div>

            <div className="hc-faq-list">
              {FAQ_PAGES.map((item) => (
                <button
                  key={item.label}
                  className="hc-faq-row"
                  type="button"
                  onClick={() => navigateTo(item.path)}
                >
                  <span className="hc-faq-row-label">{item.label}</span>
                  <span className="hc-row-arrow">
                    <ChevronRightIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <p className="hc-footer-links">
          {footerLinks.map((item) => (
            <React.Fragment key={item}>
              {item} &middot;{" "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

export default HelpCenter;
