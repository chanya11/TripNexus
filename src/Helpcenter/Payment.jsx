import React from "react";
import { HELP_CENTER_HOME_PATH, NavLink } from "./navigation";
import "./Payment.css";

const paymentQuestions = [
  "Which payment methods are accepted?",
  "Can I pay with a deposit, or prepayment?",
  "I've been charged. Do I need to do anything?",
  "Where can I see the payment policy for my booking?",
  "Why do I need to provide my card details?",
  "Can I pay for my stay with a different credit card than the one used to book?",
  "How can I get an invoice?",
  "Why do I need to provide my credit card details?",
  "Who is going to charge my credit card, and when?",
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
    <div className="payment-card">
      {items.map((item) => (
        <button key={item} type="button" className="payment-row">
          <span className="payment-row-text">{item}</span>
          <span className="payment-row-icon">
            <ChevronRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

function Payment() {
  return (
    <section className="payment-page">
      <div className="payment-top-line" />

      <div className="payment-shell">
        <nav className="payment-breadcrumb" aria-label="Breadcrumb">
          <NavLink to={HELP_CENTER_HOME_PATH}>Help Centre</NavLink>
          <span className="payment-breadcrumb-sep">&rsaquo;</span>
          <span>Frequently asked questions</span>
        </nav>

        <header className="payment-header">
          <h1>Payment</h1>
        </header>

        <RowCard items={paymentQuestions} />

        <section className="payment-help-section">
          <h2>More help</h2>
          <RowCard items={helpOptions} />
        </section>

        <footer className="payment-footer">
          <p className="payment-footer-links">
            {footerLinks.map((item) => (
              <React.Fragment key={item}>
                {item} &middot;{" "}
              </React.Fragment>
            ))}
          </p>
          <NavLink to={HELP_CENTER_HOME_PATH} className="payment-footer-link">
            Discover monthly stays
          </NavLink>
        </footer>
      </div>
    </section>
  );
}

export default Payment;
