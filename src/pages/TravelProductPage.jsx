import { useMemo, useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";
import Button from "../components/common/Button.jsx";
import styles from "./TravelProductPage.module.css";

const productConfig = {
  flights: {
    title: "Compare and book flights with ease",
    subtitle: "Discover flexible fares, direct routes and trusted airlines.",
    searchLabels: ["From", "To", "Depart", "Passengers"],
    defaults: ["New Delhi", "Mumbai", "2026-04-20", "1 adult"],
    cta: "Search flights",
    resultTitle: "Best flight options",
    accent: "Flights",
    action: "Select flight",
    confirm: "Flight selected",
  },
  packages: {
    title: "Book your flight and hotel together",
    subtitle: "Save on city breaks, beach stays and long weekends.",
    searchLabels: ["Destination", "Departing from", "Dates", "Travellers"],
    defaults: ["Goa", "New Delhi", "20 Apr - 23 Apr", "2 adults"],
    cta: "Find packages",
    resultTitle: "Popular package deals",
    accent: "Flight + Hotel",
    action: "Choose package",
    confirm: "Package selected",
  },
  cars: {
    title: "Car hire for any kind of trip",
    subtitle: "Great cars at great prices from the biggest rental companies.",
    searchLabels: ["Pick-up location", "Pick-up date", "Drop-off date", "Driver age"],
    defaults: ["Delhi Airport", "2026-04-20", "2026-04-23", "30 - 65"],
    cta: "Search cars",
    resultTitle: "Recommended car rentals",
    accent: "Car rentals",
    action: "Reserve car",
    confirm: "Car reserved",
  },
  attractions: {
    title: "Find things to do wherever you go",
    subtitle: "Tours, activities and local experiences with verified reviews.",
    searchLabels: ["Where", "Date", "Guests", "Category"],
    defaults: ["New Delhi", "2026-04-20", "2 adults", "All attractions"],
    cta: "Search attractions",
    resultTitle: "Top attractions near you",
    accent: "Attractions",
    action: "Book ticket",
    confirm: "Ticket selected",
  },
  taxis: {
    title: "Airport taxis, without the stress",
    subtitle: "Book a reliable ride from the terminal to your stay.",
    searchLabels: ["Pick-up airport", "Drop-off", "Arrival date", "Passengers"],
    defaults: ["DEL Airport", "Connaught Place", "2026-04-20", "2 passengers"],
    cta: "Book taxi",
    resultTitle: "Available airport rides",
    accent: "Airport taxis",
    action: "Reserve ride",
    confirm: "Ride reserved",
  },
};

export default function TravelProductPage({ type, items }) {
  const { formatPrice } = useSearch();
  const config = productConfig[type];
  const [query, setQuery] = useState(config.defaults);
  const [submittedQuery, setSubmittedQuery] = useState(config.defaults);
  const [sort, setSort] = useState("recommended");
  const [selectedItem, setSelectedItem] = useState(null);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.rating * 100 - a.price - (a.rating * 100 - b.price);
    });
  }, [items, sort]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSubmittedQuery(query);
    setSelectedItem(null);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span>{config.accent}</span>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
        <form className={styles.searchPanel} onSubmit={submitSearch}>
          {config.searchLabels.map((label, index) => (
            <label key={label}>
              <span>{label}</span>
              <input
                value={query[index]}
                onChange={(event) => {
                  const next = [...query];
                  next[index] = event.target.value;
                  setQuery(next);
                }}
              />
            </label>
          ))}
          <Button className={styles.searchButton}>{config.cta}</Button>
        </form>
      </section>

      <section className={styles.content}>
        <aside className={styles.sideBox}>
          <h2>Your trip summary</h2>
          <dl>
            {config.searchLabels.map((label, index) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{submittedQuery[index]}</dd>
              </div>
            ))}
          </dl>
          {selectedItem && (
            <div className={styles.selectionBox}>
              <strong>{config.confirm}</strong>
              <span>{selectedItem.title || selectedItem.airline}</span>
              <small>{formatPrice(selectedItem.price)} total</small>
            </div>
          )}
        </aside>

        <div className={styles.results}>
          <div className={styles.resultHeader}>
            <div>
              <p>Showing available options for {submittedQuery[0]}</p>
              <h2>{config.resultTitle}</h2>
            </div>
            <label>
              Sort by
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price">Lowest price</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          <div className={type === "attractions" || type === "packages" || type === "cars" ? styles.cardGrid : styles.list}>
            {sortedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <article
                  key={item.id}
                  tabIndex="0"
                  role="button"
                  onClick={() => selectItem(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") selectItem(item);
                  }}
                  className={`${type === "attractions" || type === "packages" || type === "cars" ? styles.imageCard : styles.rowCard} ${isSelected ? styles.selectedCard : ""}`}
                >
                  {item.image && <img src={item.image} alt={item.title || item.airline} />}
                  <div className={styles.cardBody}>
                    <div>
                      <h3>{item.title || item.airline}</h3>
                      <p className={styles.meta}>{item.route || item.location || item.supplier}</p>
                      <p>{item.detail}</p>
                      {item.depart && (
                        <p className={styles.timeline}>
                          <strong>{item.depart}</strong> to <strong>{item.arrive}</strong> - {item.duration} - {item.stops}
                        </p>
                      )}
                    </div>
                    <div className={styles.bookBox}>
                      <span>{item.rating}</span>
                      {item.reviews && <small>{item.reviews.toLocaleString()} reviews</small>}
                      <strong>{formatPrice(item.price)}</strong>
                      <Button
                        type="button"
                        variant={isSelected ? "secondary" : "primary"}
                        onClick={(event) => {
                          event.stopPropagation();
                          selectItem(item);
                        }}
                      >
                        {isSelected ? config.confirm : config.action}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
