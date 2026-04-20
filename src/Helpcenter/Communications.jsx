import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./Communications.css";

const communicationQuestions = [
  "Why does the accommodation's email address end with @property.booking.com?",
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

function RowCard({ items }) {
  return (
    <div className="communications-card">
      {items.map((item) => (
        <button key={item} type="button" className="communications-row">
          <span className="communications-row-text">{item}</span>
          <span className="communications-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function Communications() {
  return (
    <section className="communications-page">
      <div className="communications-top-line" />

      <div className="communications-shell">
        <nav className="communications-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="communications-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="communications-header">
          <h1>Communications</h1>
        </header>

        <RowCard items={communicationQuestions} />

        <section className="communications-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="communications-footer">
          <p className="communications-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="communications-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default Communications;
