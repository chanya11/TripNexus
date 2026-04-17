import { useSearch } from "../../context/SearchContext.jsx";
import Button from "../common/Button.jsx";
import styles from "./Filters.module.css";

const propertyTypes = ["Hotel", "Apartment", "Resort", "Hostel", "Villa"];
const facilities = ["Free WiFi", "Parking", "Pool", "Spa", "Restaurant", "Airport shuttle", "Fitness centre", "Kitchen"];

function toggleArray(values, item) {
  return values.includes(item) ? values.filter((value) => value !== item) : [...values, item];
}

export default function Filters() {
  const { filters, setFilters, resetFilters, formatPrice } = useSearch();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.mapBox}>Show on map</div>
      <div className={styles.headingRow}>
        <h2>Filter by:</h2>
        <button onClick={resetFilters}>Reset</button>
      </div>

      <section className={styles.group}>
        <h3>Your budget per night</h3>
        <input
          type="range"
          min="20"
          max="750"
          step="10"
          value={filters.price}
          onChange={(event) => setFilters({ ...filters, price: Number(event.target.value) })}
        />
        <div className={styles.rangeText}>
          <span>{formatPrice(20)}</span>
          <strong>{formatPrice(filters.price)}</strong>
        </div>
      </section>

      <section className={styles.group}>
        <h3>Property type</h3>
        {propertyTypes.map((type) => (
          <label key={type} className={styles.check}>
            <input
              type="checkbox"
              checked={filters.propertyTypes.includes(type)}
              onChange={() => setFilters({ ...filters, propertyTypes: toggleArray(filters.propertyTypes, type) })}
            />
            <span>{type}</span>
          </label>
        ))}
      </section>

      <section className={styles.group}>
        <h3>Star rating</h3>
        <div className={styles.starGrid}>
          {[5, 4, 3, 2].map((star) => (
            <Button
              key={star}
              type="button"
              variant={filters.stars.includes(star) ? "primary" : "secondary"}
              onClick={() => setFilters({ ...filters, stars: toggleArray(filters.stars, star) })}
            >
              {star} stars
            </Button>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3>Review score</h3>
        {[9, 8, 7].map((score) => (
          <label key={score} className={styles.radio}>
            <input
              name="review"
              type="radio"
              checked={filters.reviewScore === score}
              onChange={() => setFilters({ ...filters, reviewScore: score })}
            />
            <span>{score}+ {score === 9 ? "Superb" : score === 8 ? "Very good" : "Good"}</span>
          </label>
        ))}
      </section>

      <section className={styles.group}>
        <h3>Facilities</h3>
        {facilities.map((facility) => (
          <label key={facility} className={styles.check}>
            <input
              type="checkbox"
              checked={filters.facilities.includes(facility)}
              onChange={() => setFilters({ ...filters, facilities: toggleArray(filters.facilities, facility) })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </section>

      <section className={styles.group}>
        <h3>Distance from centre</h3>
        <select value={filters.distance} onChange={(event) => setFilters({ ...filters, distance: Number(event.target.value) })}>
          <option value="2">Less than 2 km</option>
          <option value="5">Less than 5 km</option>
          <option value="10">Less than 10 km</option>
          <option value="25">Any distance</option>
        </select>
      </section>
    </aside>
  );
}
