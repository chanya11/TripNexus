import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./Pricing.css";

const pricingQuestions = [
  "Is breakfast included in the price?",
  "What does the price include?",
  "Are the prices shown on Booking.com per person or per room?",
  "Are taxes included in the price?",
  "Do I pay a reservation fee to Booking.com?",
  "What does the crossed out rate mean next to my room type?",
  "Can I use discount vouchers (e.g. issued by magazines, shops, etc.)?",
  "Does Booking.com offer any special consideration discounts, or discounts with airline or hotel loyalty cards?",
  "Do I pay the full price for my child?",
];

const helpOptions = [
  "Sign in for help with a booking",
  "I need help with something else",
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

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function RowCard({ items, highlightedItem }) {
  return (
    <div className="pricing-card">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={`pricing-row${item === highlightedItem ? " pricing-row-highlighted" : ""}`}
        >
          <span className="pricing-row-text">{item}</span>
          <span className="pricing-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function Pricing() {
  return (
    <section className="pricing-page">
      <div className="pricing-top-line" />

      <div className="pricing-shell">
        <nav className="pricing-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="pricing-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="pricing-header">
          <h1>Pricing</h1>
        </header>

        <RowCard
          items={pricingQuestions}
          highlightedItem="Are the prices shown on Booking.com per person or per room?"
        />

        <section className="pricing-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="pricing-footer">
          <p className="pricing-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="pricing-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default Pricing;
