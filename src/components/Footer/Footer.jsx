import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

const columns = [
  ["Countries", "Regions", "Cities", "Districts", "Airports", "Hotels"],
  ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "B&Bs"],
  ["Unique places", "Reviews", "Travel articles", "Seasonal deals", "Traveller communities"],
  ["Car hire", "Flight finder", "Restaurant reservations", "Travel agents"],
  ["Customer service", "Partner help", "Careers", "Sustainability", "Press centre"],
];

const accountStorageKey = "tripnexus-account";
const accountEventName = "tripnexus-account-change";

function readStoredAccount() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(accountStorageKey);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function Footer() {
  const [account, setAccount] = useState(readStoredAccount);

  useEffect(() => {
    const syncAccount = (event) => {
      if (event instanceof CustomEvent) {
        setAccount(event.detail || null);
        return;
      }

      setAccount(readStoredAccount());
    };

    window.addEventListener(accountEventName, syncAccount);
    window.addEventListener("storage", syncAccount);

    return () => {
      window.removeEventListener(accountEventName, syncAccount);
      window.removeEventListener("storage", syncAccount);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <h2>Save time, save money!</h2>
        {account ? (
          <>
            <p>Signed in as {account.email}. Your account is ready for faster booking and member deals.</p>
            <div className={styles.accountChip}>
              <span>{account.initials}</span>
              <div>
                <strong>{account.name}</strong>
                <small>{account.email}</small>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Sign up and we will send the best deals to you</p>
            <form>
              <input placeholder="Your email address" type="email" />
              <button type="button">Subscribe</button>
            </form>
          </>
        )}
      </div>
      <div className={styles.links}>
        {columns.map((column, index) => (
          <ul key={index}>
            {column.map((item) => <li key={item}><a href="#top">{item}</a></li>)}
          </ul>
        ))}
      </div>
      <p className={styles.copy}>TripNexus concept UI for frontend practice. Prices and availability are mock data.</p>
    </footer>
  );
}
