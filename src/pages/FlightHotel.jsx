import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { packageResults } from "../data/travelProducts.js";
import { useSearch } from "../context/SearchContext.jsx";
import styles from "./FlightHotel.module.css";

const offers = [
  { city: "Goa", price: 1123, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80" },
  { city: "Arambol", price: 1743, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80" },
  { city: "Varanasi", price: 1784, image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80" },
  { city: "Berlin", price: 1736, image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=700&q=80" },
  { city: "Jaipur", price: 1787, image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=700&q=80" },
  { city: "Patong Beach", price: 2462, image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=700&q=80" },
];

const flashSales = [
  { name: "Best Western Resort", price: 20781, rating: 8.2, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80" },
  { name: "Flora Creek Deluxe Hotel", price: 36592, rating: 8.8, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80" },
  { name: "Hotel Vista Marina", price: 79788, rating: 8.4, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80" },
];

export default function FlightHotel() {
  const { formatPrice, convertPrice } = useSearch();
  const { upsertBooking } = useBooking();
  const [query, setQuery] = useState({ from: "New Delhi", to: "Dubai", dates: "2026-04-18 - 2026-04-21", travellers: "2 travellers - 1 room" });
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const reservePackage = (sale) => {
    setSelected(sale);
    upsertBooking({
      category: "package",
      title: sale.name,
      subtitle: query.to,
      description: "Flight and hotel package with flexible options",
      amountInInr: convertPrice(sale.price),
      editPath: "/flight-hotel",
      meta: [
        { label: "From", value: query.from },
        { label: "Destination", value: query.to },
        { label: "Dates", value: query.dates },
        { label: "Travellers", value: query.travellers },
      ],
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.brandRow}>
            <strong>TripNexus</strong>
            <span>powered by lastminute.com</span>
          </div>
          <h1>Book Flight + Hotel</h1>
          <form className={styles.searchBar} onSubmit={(event) => event.preventDefault()}>
            <label>Depart from<input value={query.from} onChange={(event) => setQuery({ ...query, from: event.target.value })} /></label>
            <label>Destination<input value={query.to} onChange={(event) => setQuery({ ...query, to: event.target.value })} /></label>
            <label>When?<input value={query.dates} onChange={(event) => setQuery({ ...query, dates: event.target.value })} /></label>
            <label>Travellers/flight<input value={query.travellers} onChange={(event) => setQuery({ ...query, travellers: event.target.value })} /></label>
            <button>Search</button>
          </form>
          <label className={styles.checkbox}><input type="checkbox" /> I only need a flight as part of my trip</label>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Flight + Hotel Offers</h2>
        <p>Discover our hottest deals</p>
        <div className={styles.offerGrid}>
          {offers.map((offer) => (
            <button key={offer.city} onClick={() => setQuery({ ...query, to: offer.city })}>
              <img src={offer.image} alt={offer.city} />
              <strong>{offer.city}</strong>
              <span>from {formatPrice(offer.price)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Flash sale deals</h2>
        <p>Great deals for {query.to}</p>
        <div className={styles.saleGrid}>
          {flashSales.map((sale) => (
            <article key={sale.name} className={selected?.name === sale.name ? styles.selected : ""}>
              <img src={sale.image} alt={sale.name} />
              <div>
                <b>{sale.rating}</b>
                <h3>{sale.name}</h3>
                <p>Flight and hotel package with flexible options</p>
                <strong>{formatPrice(sale.price)}</strong>
                <button onClick={() => reservePackage(sale)}>{selected?.name === sale.name ? "Selected" : "View deal"}</button>
              </div>
            </article>
          ))}
        </div>
        {selected && (
          <div className={styles.checkoutCard}>
            <div>
              <strong>{selected.name} selected</strong>
              <p>{query.to} · {query.dates} · {query.travellers}</p>
            </div>
            <Button type="button" onClick={() => navigate("/payment")}>
              Continue to pay
            </Button>
          </div>
        )}
      </section>

      <section className={styles.innerSection}>
        <div className={styles.benefits}>
          <article><strong>Spread the cost</strong><p>Choose to pay now or later with flexible options.</p></article>
          <article><strong>Save more</strong><p>With reduced prices, packages save on hotels and flights.</p></article>
          <article><strong>Your holiday, your way</strong><p>Customise your trip with every option booked together.</p></article>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>All inclusive holidays</h2>
        <div className={styles.packageGrid}>
          {packageResults.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <strong>from {formatPrice(item.price)}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
