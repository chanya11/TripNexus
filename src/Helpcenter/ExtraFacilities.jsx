import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./ExtraFacilities.css";

const extraFacilitiesQuestions = [
  "How do I know if there is parking at the property and how can I reserve it?",
  "How do I find out if a property has a certain facility (e.g. a lift)?",
  "How can I find out if the property offers a shuttle service and how can I book it?",
  "Can the property store my luggage before check-in or after check-out?",
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
    <div className="extra-facilities-card">
      {items.map((item) => (
        <button key={item} type="button" className="extra-facilities-row">
          <span className="extra-facilities-row-text">{item}</span>
          <span className="extra-facilities-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function ExtraFacilities() {
  return (
    <section className="extra-facilities-page">
      <div className="extra-facilities-top-line" />

      <div className="extra-facilities-shell">
        <nav className="extra-facilities-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="extra-facilities-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="extra-facilities-header">
          <h1>Extra facilities</h1>
        </header>

        <RowCard items={extraFacilitiesQuestions} />

        <section className="extra-facilities-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="extra-facilities-footer">
          <p className="extra-facilities-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="extra-facilities-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default ExtraFacilities;
