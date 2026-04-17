import styles from "./Footer.module.css";

const columns = [
  ["Countries", "Regions", "Cities", "Districts", "Airports", "Hotels"],
  ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "B&Bs"],
  ["Unique places", "Reviews", "Travel articles", "Seasonal deals", "Traveller communities"],
  ["Car hire", "Flight finder", "Restaurant reservations", "Travel agents"],
  ["Customer service", "Partner help", "Careers", "Sustainability", "Press centre"],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <h2>Save time, save money!</h2>
        <p>Sign up and we will send the best deals to you</p>
        <form>
          <input placeholder="Your email address" type="email" />
          <button type="button">Subscribe</button>
        </form>
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
