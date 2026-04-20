import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { flightResults } from "../data/travelProducts.js";
import { useSearch } from "../context/SearchContext.jsx";
import styles from "./Flights.module.css";

const countries = [
  { name: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=80" },
  { name: "Nepal", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80" },
  { name: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=700&q=80" },
];

const airportCards = [
  { title: "New Delhi London", route: "DEL to LHR", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=500&q=80" },
  { title: "New Delhi Kathmandu", route: "DEL to KTM", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80" },
  { title: "New Delhi Melbourne", route: "DEL to MEL", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=500&q=80" },
  { title: "New Delhi Bangkok", route: "DEL to BKK", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=500&q=80" },
];

export default function Flights() {
  const { formatPrice, convertPrice } = useSearch();
  const { upsertBooking } = useBooking();
  const [trip, setTrip] = useState("Return");
  const [query, setQuery] = useState({ from: "New Delhi", to: "Mumbai", depart: "2026-04-20", returnDate: "2026-04-27", travellers: "1 adult" });
  const [submitted, setSubmitted] = useState(query);
  const [selected, setSelected] = useState(null);
  const [openFaq, setOpenFaq] = useState("find");
  const navigate = useNavigate();

  const orderedFlights = useMemo(() => {
    return flightResults.map((flight, index) => ({ ...flight, price: flight.price + index * 12 }));
  }, []);

  const reserveFlight = (flight) => {
    setSelected(flight);
    upsertBooking({
      category: "flight",
      title: flight.airline,
      subtitle: `${submitted.from} to ${submitted.to}`,
      description: `${flight.depart} - ${flight.arrive} · ${flight.duration} · ${flight.stops}`,
      amountInInr: convertPrice(flight.price),
      editPath: "/flights",
      meta: [
        { label: "From", value: submitted.from },
        { label: "To", value: submitted.to },
        { label: "Depart", value: submitted.depart },
        { label: trip === "One-way" ? "Trip type" : "Return", value: trip === "One-way" ? trip : submitted.returnDate },
        { label: "Travellers", value: submitted.travellers },
      ],
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.tripTabs}>
            {["Return", "One-way", "Multi-city"].map((item) => (
              <button key={item} className={trip === item ? styles.activeTrip : ""} onClick={() => setTrip(item)}>{item}</button>
            ))}
          </div>
          <h1>Compare and book cheap flights with ease</h1>
          <p>Discover your next dream destination</p>
          <form className={styles.searchBar} onSubmit={(event) => { event.preventDefault(); setSubmitted(query); setSelected(null); }}>
            <input value={query.from} onChange={(event) => setQuery({ ...query, from: event.target.value })} />
            <input value={query.to} onChange={(event) => setQuery({ ...query, to: event.target.value })} />
            <input type="date" value={query.depart} onChange={(event) => setQuery({ ...query, depart: event.target.value })} />
            <input type="date" value={query.returnDate} onChange={(event) => setQuery({ ...query, returnDate: event.target.value })} />
            <input value={query.travellers} onChange={(event) => setQuery({ ...query, travellers: event.target.value })} />
            <button>Explore</button>
          </form>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Explore by country</h2>
        <p>Compare fares across popular countries</p>
        <div className={styles.countryGrid}>
          {countries.map((country) => (
            <button key={country.name} onClick={() => setQuery({ ...query, to: country.name })}>
              <img src={country.image} alt={country.name} />
              <span>{country.name}</span>
            </button>
          ))}
          <aside>Explore a world of destinations</aside>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Popular flights near you</h2>
        <p>Find deals on domestic and international flights</p>
        <div className={styles.popularGrid}>
          {airportCards.map((card) => (
            <article key={card.title}>
              <img src={card.image} alt={card.title} />
              <strong>{card.title}</strong>
              <span>{card.route}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.innerSection}>
        <div className={styles.accountCard}>
          <div>
            <h2>Your account, your travel</h2>
            <p>All your trip details in one place</p>
            <button>Sign in</button>
            <button>Register</button>
          </div>
          <strong>Genius</strong>
        </div>
      </section>

      <section className={styles.innerSection}>
        <div className={styles.benefits}>
          <article><strong>Search a huge selection</strong><p>Easily compare flights, airlines and prices all in one place</p></article>
          <article><strong>Pay no hidden fees</strong><p>Always know exactly what you're paying for</p></article>
          <article><strong>Get more flexibility</strong><p>Change plans with flexible ticket options</p></article>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Top flights from {submitted.from}</h2>
        <div className={styles.flightList}>
          {orderedFlights.map((flight) => (
            <button key={flight.id} className={selected?.id === flight.id ? styles.selected : ""} onClick={() => reserveFlight(flight)}>
              <div>
                <strong>{flight.airline}</strong>
                <span>{submitted.from} to {submitted.to} - {flight.stops}</span>
              </div>
              <span>{flight.depart} - {flight.arrive}</span>
              <small>{flight.duration}</small>
              <b>{formatPrice(flight.price)}</b>
            </button>
          ))}
        </div>
        {selected && (
          <div className={styles.checkoutCard}>
            <div>
              <strong>{selected.airline} selected</strong>
              <p>{submitted.from} to {submitted.to} · {selected.depart} - {selected.arrive} · {selected.duration}</p>
            </div>
            <Button type="button" onClick={() => navigate("/payment")}>
              Continue to pay
            </Button>
          </div>
        )}
      </section>

      <section className={styles.innerSection}>
        <h2>Frequently asked questions</h2>
        <div className={styles.faq}>
          {[
            ["find", "How do I find cheaper flights?", "Compare nearby dates, book early and look for flexible tickets."],
            ["hidden", "Can I book with no hidden charges?", "The fare summary updates before checkout so taxes and fees are clear."],
            ["change", "Can I change my flight?", "Flexible fares show change options directly in the result details."],
          ].map(([id, question, answer]) => (
            <article key={id}>
              <button onClick={() => setOpenFaq(openFaq === id ? "" : id)}>{question}</button>
              {openFaq === id && <p>{answer}</p>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
