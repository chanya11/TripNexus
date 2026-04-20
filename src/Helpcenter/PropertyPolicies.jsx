import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./PropertyPolicies.css";

const propertyPolicyQuestions = [
  "What if I'm travelling with an assistance animal?",
  "I want to check out after the stated check-out time. What should I do?",
  "What are the check-in and check-out times of a property?",
  "How do I get more information about the facilities available?",
  "I want a smoking room however I can only choose a non-smoking room. How can I request a smoking room?",
  "How do I find out if a property allows pets?",
  "I will be arriving earlier/later than the stated check-in time. Can I still check-in?",
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
    <div className="property-policies-card">
      {items.map((item) => (
        <button key={item} type="button" className="property-policies-row">
          <span className="property-policies-row-text">{item}</span>
          <span className="property-policies-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function PropertyPolicies() {
  return (
    <section className="property-policies-page">
      <div className="property-policies-top-line" />

      <div className="property-policies-shell">
        <nav className="property-policies-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="property-policies-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="property-policies-header">
          <h1>Property policies</h1>
        </header>

        <RowCard items={propertyPolicyQuestions} />

        <section className="property-policies-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="property-policies-footer">
          <p className="property-policies-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink
            to={HELP_CENTER_HOME_PATH}
            className="property-policies-footer-link"
          >
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default PropertyPolicies;
