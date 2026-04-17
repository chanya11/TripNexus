import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext.jsx";
import hotels from "../../data/hotels.json";
import Button from "../common/Button.jsx";
import styles from "./SearchBar.module.css";

export default function SearchBar({ compact = false }) {
  const { search, setSearch } = useSearch();
  const [draft, setDraft] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDraft(search);
  }, [search]);

  const suggestions = useMemo(() => {
    const cities = [...new Set(hotels.flatMap((hotel) => [hotel.city, hotel.location]))];
    return cities
      .filter((item) => item.toLowerCase().includes(draft.destination.toLowerCase()))
      .slice(0, 6);
  }, [draft.destination]);

  const updateGuest = (key, delta) => {
    setDraft((current) => ({
      ...current,
      [key]: Math.max(key === "adults" || key === "rooms" ? 1 : 0, current[key] + delta),
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    setSearch(draft);
    navigate("/searchresults");
  };

  return (
    <form className={`${styles.searchBar} ${compact ? styles.compact : ""}`} onSubmit={submit}>
      <div className={styles.destination}>
        <label>Where are you going?</label>
        <input
          value={draft.destination}
          onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
          onChange={(event) => setDraft({ ...draft, destination: event.target.value })}
          onFocus={() => setShowSuggestions(true)}
          placeholder="City, property or landmark"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestions}>
            {suggestions.map((item) => (
              <button
                type="button"
                key={item}
                onMouseDown={() => {
                  setDraft({ ...draft, destination: item });
                  setShowSuggestions(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.date}>
        <label>Check-in date</label>
        <input
          type="date"
          value={draft.checkIn}
          onChange={(event) => setDraft({ ...draft, checkIn: event.target.value })}
        />
      </div>
      <div className={styles.date}>
        <label>Check-out date</label>
        <input
          type="date"
          value={draft.checkOut}
          onChange={(event) => setDraft({ ...draft, checkOut: event.target.value })}
        />
      </div>
      <div className={styles.guests}>
        <label>Guests and rooms</label>
        <button type="button" onClick={() => setShowGuests(!showGuests)}>
          {draft.adults} adults - {draft.children} children - {draft.rooms} room
        </button>
        {showGuests && (
          <div className={styles.guestMenu}>
            {["adults", "children", "rooms"].map((key) => (
              <div key={key} className={styles.guestRow}>
                <span>{key[0].toUpperCase() + key.slice(1)}</span>
                <div>
                  <button type="button" onClick={() => updateGuest(key, -1)}>-</button>
                  <strong>{draft[key]}</strong>
                  <button type="button" onClick={() => updateGuest(key, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button className={styles.submit}>Search</Button>
    </form>
  );
}
