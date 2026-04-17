import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const tabs = [
  { label: "Stays", to: "/", icon: "🏨", matches: ["/", "/searchresults", "/stays"] },
  { label: "Flights", to: "/flights", icon: "✈️", matches: ["/flights"] },
  { label: "Flight + Hotel", to: "/flight-hotel", icon: "🧳", matches: ["/flight-hotel"] },
  { label: "Car Rentals", to: "/car-rentals", icon: "🚗", matches: ["/car-rentals"] },
  { label: "Attractions", to: "/attractions", icon: "🎟️", matches: ["/attractions"] },
  { label: "Airport Taxis", to: "/airport-taxis", icon: "🚕", matches: ["/airport-taxis"] },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={`${styles.tab} ${tab.matches.includes(pathname) ? styles.active : ""}`}
        >
          <span className={styles.icon}>{tab.icon}</span>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
