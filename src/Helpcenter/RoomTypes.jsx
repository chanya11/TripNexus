import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./RoomTypes.css";

const roomTypeQuestions = [
  "What's the difference between a Double room and a Twin room?",
  'What do "non-refundable" and "free cancellation" mean?',
  "Can I request an extra bed in my room and will there be extra costs?",
  "Is it possible to get an extra bed or cot for a child?",
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
    <div className="room-types-card">
      {items.map((item) => (
        <button key={item} type="button" className="room-types-row">
          <span className="room-types-row-text">{item}</span>
          <span className="room-types-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function RoomTypes() {
  return (
    <section className="room-types-page">
      <div className="room-types-top-line" />

      <div className="room-types-shell">
        <nav className="room-types-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="room-types-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="room-types-header">
          <h1>Room types</h1>
        </header>

        <RowCard items={roomTypeQuestions} />

        <section className="room-types-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="room-types-footer">
          <p className="room-types-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="room-types-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default RoomTypes;
