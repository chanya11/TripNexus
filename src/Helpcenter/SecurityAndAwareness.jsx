import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./SecurityAndAwareness.css";

const securityQuestions = [
  "What is social engineering?",
  "How can I avoid social engineering attempts?",
  "I was recently asked to pay using my gift card over the phone. Is that okay?",
  "I think I have been the victim of a scam. What should I do?",
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
    <div className="security-card">
      {items.map((item) => (
        <button key={item} type="button" className="security-row">
          <span className="security-row-text">{item}</span>
          <span className="security-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function SecurityAndAwareness() {
  return (
    <section className="security-page">
      <div className="security-top-line" />

      <div className="security-shell">
        <nav className="security-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="security-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="security-header">
          <h1>Security and awareness</h1>
        </header>

        <RowCard items={securityQuestions} />

        <section className="security-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="security-footer">
          <p className="security-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="security-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default SecurityAndAwareness;
