import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Filters from "../components/Filters/Filters.jsx";
import HotelCard from "../components/HotelCard/HotelCard.jsx";
import hotels from "../data/hotels.json";
import { useSearch } from "../context/SearchContext.jsx";
import styles from "./SearchResults.module.css";

export default function SearchResults() {
  const location = useLocation();
  const { search, setSearch, filters, setFilters, sortBy, setSortBy } = useSearch();
  const [sidebarSearch, setSidebarSearch] = useState(search);

  useEffect(() => {
    setSidebarSearch(search);
  }, [search]);

  useEffect(() => {
    const propertyType = location.state?.propertyType;
    if (propertyType && !filters.propertyTypes.includes(propertyType)) {
      setFilters({ ...filters, propertyTypes: [propertyType] });
    }
  }, [location.state?.propertyType]);

  const results = useMemo(() => {
    const destination = search.destination.trim().toLowerCase();
    const filtered = hotels.filter((hotel) => {
      const matchesDestination =
        !destination ||
        hotel.city.toLowerCase().includes(destination) ||
        hotel.location.toLowerCase().includes(destination) ||
        hotel.name.toLowerCase().includes(destination);

      const matchesPrice = hotel.price <= filters.price;
      const matchesType = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(hotel.propertyType);
      const matchesStars = filters.stars.length === 0 || filters.stars.includes(hotel.stars);
      const matchesReview = filters.reviewScore === 0 || hotel.reviewScore >= filters.reviewScore;
      const matchesFacilities = filters.facilities.every((facility) => hotel.facilities.includes(facility));
      const matchesDistance = hotel.distance <= filters.distance;

      return matchesDestination && matchesPrice && matchesType && matchesStars && matchesReview && matchesFacilities && matchesDistance;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.reviewScore - a.reviewScore;
      if (sortBy === "stars") return b.stars - a.stars;
      return b.reviewScore * 100 + b.reviews / 100 - (a.reviewScore * 100 + a.reviews / 100);
    });
  }, [search, filters, sortBy]);

  const submitSidebarSearch = (event) => {
    event.preventDefault();
    setSearch(sidebarSearch);
  };

  const activeChips = [
    ...filters.propertyTypes.map((value) => ({ label: value, key: "propertyTypes", value })),
    ...filters.stars.map((value) => ({ label: `${value} stars`, key: "stars", value })),
    ...filters.facilities.map((value) => ({ label: value, key: "facilities", value })),
    ...(filters.reviewScore ? [{ label: `${filters.reviewScore}+ review score`, key: "reviewScore", value: filters.reviewScore }] : []),
    ...(filters.distance < 25 ? [{ label: `Within ${filters.distance} km`, key: "distance", value: filters.distance }] : []),
  ];

  const removeChip = (chip) => {
    if (Array.isArray(filters[chip.key])) {
      setFilters({ ...filters, [chip.key]: filters[chip.key].filter((value) => value !== chip.value) });
      return;
    }
    setFilters({ ...filters, [chip.key]: chip.key === "distance" ? 25 : 0 });
  };

  return (
    <main className={styles.page}>
      <div className={styles.searchWrap}>
        <SearchBar compact />
      </div>
      <div className={styles.layout}>
        <aside className={styles.leftRail}>
          <form className={styles.yellowSearch} onSubmit={submitSidebarSearch}>
            <h2>Search</h2>
            <label>
              Destination/property name:
              <input
                value={sidebarSearch.destination}
                onChange={(event) => setSidebarSearch({ ...sidebarSearch, destination: event.target.value })}
              />
            </label>
            <div className={styles.dateGrid}>
              <label>
                Check-in date
                <input
                  type="date"
                  value={sidebarSearch.checkIn}
                  onChange={(event) => setSidebarSearch({ ...sidebarSearch, checkIn: event.target.value })}
                />
              </label>
              <label>
                Check-out date
                <input
                  type="date"
                  value={sidebarSearch.checkOut}
                  onChange={(event) => setSidebarSearch({ ...sidebarSearch, checkOut: event.target.value })}
                />
              </label>
            </div>
            <label>
              Adults
              <select
                value={sidebarSearch.adults}
                onChange={(event) => setSidebarSearch({ ...sidebarSearch, adults: Number(event.target.value) })}
              >
                {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}
              </select>
            </label>
            <label>
              Rooms
              <select
                value={sidebarSearch.rooms}
                onChange={(event) => setSidebarSearch({ ...sidebarSearch, rooms: Number(event.target.value) })}
              >
                {[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count}</option>)}
              </select>
            </label>
            <button>Search</button>
          </form>
          <Filters />
        </aside>
        <section className={styles.results}>
          <div className={styles.summary}>
            <div>
              <p className={styles.breadcrumb}>Home / India / Delhi NCR / New Delhi</p>
              <h1>{search.destination}: {results.length} properties found</h1>
              <p>{search.checkIn} to {search.checkOut} - {search.adults} adults - {search.children} children - {search.rooms} room</p>
            </div>
            <label>
              Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="top">Top picks</option>
                <option value="price">Lowest price first</option>
                <option value="rating">Best reviewed</option>
                <option value="stars">Star rating</option>
              </select>
            </label>
          </div>
          <div className={styles.alert}>Travel sustainable properties and Genius rates are included in these results.</div>
          {activeChips.length > 0 && (
            <div className={styles.chips}>
              {activeChips.map((chip) => (
                <button key={`${chip.key}-${chip.value}`} onClick={() => removeChip(chip)}>
                  {chip.label} <span>x</span>
                </button>
              ))}
            </div>
          )}
          {results.length ? (
            results.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
          ) : (
            <div className={styles.empty}>
              <h2>No exact matches</h2>
              <p>Try widening your price, distance, or facilities filters.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
