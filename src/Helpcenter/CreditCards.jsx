import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./CreditCards.css";

const creditCardQuestions = [
  "Can I use a debit card to complete my reservation?",
  "Can I make a reservation without a credit card?",
  "What's the difference between a pre-authorisation and an actual charge to my credit card?",
  "How will I know if my card has been pre-authorised?",
  "Can I make a reservation for myself using someone else's credit card?",
  "How long will the pre-authorisation hold affect my available balance?",
  "Why do I need to provide my credit card details?",
  "Will the pre-authorisation hold always equal the exact amount of my reservation?",
  "Will this happen with all bookings made through Booking.com?",
  "The credit card that I used to make a booking is no longer valid. What should I do?",
  "Why have I been charged?",
  "What is a pre-authorisation?",
  "Which credit cards can I use to complete my booking?",
  "Are my credit card details safe?",
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
    <div className="credit-cards-card">
      {items.map((item) => (
        <button key={item} type="button" className="credit-cards-row">
          <span className="credit-cards-row-text">{item}</span>
          <span className="credit-cards-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function CreditCards() {
  return (
    <section className="credit-cards-page">
      <div className="credit-cards-top-line" />

      <div className="credit-cards-shell">
        <nav className="credit-cards-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="credit-cards-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="credit-cards-header">
          <h1>Credit cards</h1>
        </header>

        <RowCard items={creditCardQuestions} />

        <section className="credit-cards-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="credit-cards-footer">
          <p className="credit-cards-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="credit-cards-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default CreditCards;
