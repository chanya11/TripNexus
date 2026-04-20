import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { attractionResults } from "../data/travelProducts.js";
import { useSearch } from "../context/SearchContext.jsx";
import styles from "./Attractions.module.css";

const fallbackImage = "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80";

const nearby = [
  { city: "Old Goa", count: "119 things to do", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80" },
  { city: "Agra", count: "64 things to do", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80" },
  { city: "Kolkata", count: "187 things to do", image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=700&q=80" },
  { city: "Tirupati", count: "19 things to do", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=700&q=80" },
  { city: "Varanasi", count: "48 things to do", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80" },
];

const destinationTabs = ["Europe", "North America", "Asia", "Africa", "Oceania", "Middle East", "Caribbean"];
const cities = [
  { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=500&q=80" },
  { name: "Istanbul", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=500&q=80" },
  { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80" },
  { name: "Hamburg", image: "https://images.unsplash.com/photo-1586449480558-33ae8b34c651?auto=format&fit=crop&w=500&q=80" },
  { name: "Amsterdam", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=500&q=80" },
  { name: "Lisbon", image: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=500&q=80" },
  { name: "Rome", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=500&q=80" },
  { name: "Athens", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=500&q=80" },
  { name: "Berlin", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=500&q=80" },
  { name: "Cologne", image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=500&q=80" },
  { name: "Venice", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=500&q=80" },
  { name: "Malaga", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=500&q=80" },
  { name: "Vienna", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=500&q=80" },
  { name: "Porto", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=500&q=80" },
  { name: "Stockholm", image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=500&q=80" },
  { name: "Monte Carlo", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80" },
  { name: "Madrid", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=500&q=80" },
  { name: "Amalfi", image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=500&q=80" },
  { name: "Seville", image: "https://images.unsplash.com/photo-1559564477-6e858227c8e2?auto=format&fit=crop&w=500&q=80" },
  { name: "Krakow", image: "https://images.unsplash.com/photo-1607427293702-036933bbf746?auto=format&fit=crop&w=500&q=80" },
  { name: "Naples", image: "https://images.unsplash.com/photo-1605560454265-9b2260eb8d2a?auto=format&fit=crop&w=500&q=80" },
  { name: "Riga", image: "https://images.unsplash.com/photo-1569230516306-5a8cb5586399?auto=format&fit=crop&w=500&q=80" },
  { name: "Liverpool", image: "https://images.unsplash.com/photo-1566150779061-b5a33b0c37df?auto=format&fit=crop&w=500&q=80" },
  { name: "Turin", image: "https://images.unsplash.com/photo-1568736333610-e7c9bb7f3d93?auto=format&fit=crop&w=500&q=80" },
  { name: "Munich", image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&w=500&q=80" },
  { name: "Florence", image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=500&q=80" },
  { name: "Belgrade", image: "https://images.unsplash.com/photo-1562783362-9a05fbfa7317?auto=format&fit=crop&w=500&q=80" },
  { name: "Gothenburg", image: "https://images.unsplash.com/photo-1582542021865-bde52fd7c3cf?auto=format&fit=crop&w=500&q=80" },
  { name: "Budapest", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=500&q=80" },
  { name: "Granada", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=500&q=80" },
];

export default function Attractions() {
  const { formatPrice, convertPrice } = useSearch();
  const { upsertBooking } = useBooking();
  const [destination, setDestination] = useState("New Delhi");
  const [date, setDate] = useState("2026-04-20");
  const [activeTab, setActiveTab] = useState("Europe");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const withFallback = (event) => {
    if (event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
    }
  };

  const visibleCities = useMemo(() => {
    const offset = destinationTabs.indexOf(activeTab) * 3;
    return [...cities.slice(offset), ...cities.slice(0, offset)].slice(0, 32);
  }, [activeTab]);

  const reserveAttraction = (item) => {
    setSelected(item);
    upsertBooking({
      category: "attraction",
      title: item.title,
      subtitle: item.location,
      description: item.detail,
      amountInInr: convertPrice(item.price),
      editPath: "/attractions",
      meta: [
        { label: "Destination", value: destination },
        { label: "Date", value: date },
        { label: "Guests", value: "2 adults" },
      ],
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <h1>Attractions, activities and experiences</h1>
          <p>Discover new attractions and experiences to match your interests and travel style</p>
          <form className={styles.searchBar} onSubmit={(event) => event.preventDefault()}>
            <label>
              Destination
              <input value={destination} onChange={(event) => setDestination(event.target.value)} />
            </label>
            <label>
              Dates
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <button>Search</button>
          </form>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Nearby destinations</h2>
        <div className={styles.nearbyGrid}>
          {nearby.map((item) => (
            <button key={item.city} onClick={() => setDestination(item.city)}>
              <img src={item.image} alt={item.city} loading="lazy" onError={withFallback} />
              <span>{item.city}</span>
              <small>{item.count}</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.innerSection}>
        <div className={styles.accountCard}>
          <div>
            <h2>Your account, your travel</h2>
            <strong>All your trip details in one place</strong>
            <p>Sign in to book faster and manage your trip with ease</p>
            <button>Sign in</button>
            <button>Register</button>
          </div>
          <div className={styles.geniusBadge}>Genius</div>
        </div>
      </section>

      <section className={styles.innerSection}>
        <div className={styles.benefits}>
          <article><strong>Explore top attractions</strong><p>Experience the best of your destination with attractions, tours and more</p></article>
          <article><strong>Fast and flexible</strong><p>Book tickets online in minutes, with free cancellation on many attractions</p></article>
          <article><strong>Support when you need it</strong><p>TripNexus support is available around the clock to keep plans moving fast.</p></article>
        </div>
      </section>

      <section className={styles.innerSection}>
        <h2>Top experiences in {destination}</h2>
        <div className={styles.experienceGrid}>
          {attractionResults.map((item) => (
            <article key={item.id} className={selected?.id === item.id ? styles.selected : ""}>
              <img src={item.image} alt={item.title} loading="lazy" onError={withFallback} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.location}</p>
                <span>{item.rating} - {item.reviews.toLocaleString()} reviews</span>
                <strong>{formatPrice(item.price)}</strong>
                <button onClick={() => reserveAttraction(item)}>{selected?.id === item.id ? "Selected" : "Book tickets"}</button>
              </div>
            </article>
          ))}
        </div>
        {selected && (
          <div className={styles.checkoutCard}>
            <div>
              <strong>{selected.title} selected</strong>
              <p>{selected.location} · {date}</p>
            </div>
            <Button type="button" onClick={() => navigate("/payment")}>
              Continue to pay
            </Button>
          </div>
        )}
      </section>

      <section className={styles.innerSection}>
        <h2>Explore more destinations</h2>
        <p>Find things to do in cities around the world</p>
        <div className={styles.tabs}>
          {destinationTabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? styles.activeTab : ""} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div className={styles.cityGrid}>
          {visibleCities.map((city, index) => (
            <button key={`${city.name}-${index}`} onClick={() => setDestination(city.name)}>
              <img src={city.image} alt={city.name} loading="lazy" onError={withFallback} />
              <span>{city.name}</span>
              <small>{Math.floor(18 + index * 7)} things to do</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
