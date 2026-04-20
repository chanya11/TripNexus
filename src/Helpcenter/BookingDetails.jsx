import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./BookingDetails.css";

const bookingQuestions = [
  "How do I get more information about the room or property's facilities?",
  "Is it possible to get an extra bed or cot for a child?",
  "I can't find my confirmation email. What should I do?",
  "Will I pay the full price for my children?",
  "What's the difference between a Double room and a Twin room?",
  "I will be arriving outside check-in hours. Can I still check-in?",
  "Can I make changes to my booking? I.e. change dates",
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
    <div className="booking-card">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={`booking-row${item === highlightedItem ? " booking-row-highlighted" : ""}`}
        >
          <span className="booking-row-text">{item}</span>
          <span className="booking-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function BookingDetails() {
  return (
    <section className="booking-page">
      <div className="booking-top-line" />

      <div className="booking-shell">
        <nav className="booking-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="booking-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="booking-header">
          <h1>Booking details</h1>
        </header>

        <RowCard
          items={bookingQuestions}
          highlightedItem="What's the difference between a Double room and a Twin room?"
        />

        <section className="booking-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="booking-footer">
          <p className="booking-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="booking-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default BookingDetails;
