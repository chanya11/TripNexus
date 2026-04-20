import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./Cancellations.css";

const cancellationQuestions = [
  "Can I cancel my booking?",
  "If I need to cancel my booking, will I pay a fee?",
  "Can I cancel or change my dates for a non-refundable booking?",
  "How do I know if my booking was canceled?",
  "Where can I find my cancellation policy?",
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
  "Vacation Homes",
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

function RowCard({ items }) {
  return (
    <div className="cancel-card">
      {items.map((item) => (
        <button key={item} type="button" className="cancel-row">
          <span className="cancel-row-text">{item}</span>
          <span className="cancel-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function Cancellations() {
  return (
    <section className="cancel-page">
      <div className="cancel-top-line" />

      <div className="cancel-shell">
        <nav className="cancel-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Center</NavLink>
          <span className="cancel-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="cancel-header">
          <h1>Cancellations</h1>
        </header>

        <RowCard items={cancellationQuestions} />

        <section className="cancel-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="cancel-footer">
          <p className="cancel-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="cancel-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default Cancellations;
