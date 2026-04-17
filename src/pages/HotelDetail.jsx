import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import hotels from "../data/hotels.json";
import { useSearch } from "../context/SearchContext.jsx";
import styles from "./HotelDetail.module.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=900&q=80",
];

const roomOptions = [
  {
    name: "Deluxe Studio",
    details: "Entire studio - 1 bathroom - 23 m2",
    beds: "1 double bed",
    guests: 2,
    multiplier: 1,
    perks: ["No prepayment needed", "Pay at the property", "Only 1 left at this price"],
  },
  {
    name: "Superior Apartment",
    details: "Private apartment - Kitchen - Balcony",
    beds: "1 large double bed and 1 sofa bed",
    guests: 3,
    multiplier: 1.24,
    perks: ["Free cancellation", "Breakfast available", "Popular with couples"],
  },
];

const highlights = [
  "Apartments",
  "Free WiFi",
  "Airport shuttle",
  "Free parking",
  "Family rooms",
  "Non-smoking rooms",
  "Room service",
  "24-hour front desk",
];

function pluralize(value, label) {
  return `${value} ${label}${value === 1 ? "" : "s"}`;
}

function daysBetween(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.round((end - start) / 86400000);
  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}

export default function HotelDetail() {
  const { id } = useParams();
  const hotel = hotels.find((item) => String(item.id) === id);
  const { search, formatPrice } = useSearch();
  const [selectedRooms, setSelectedRooms] = useState(() =>
    roomOptions.reduce((accumulator, room) => ({ ...accumulator, [room.name]: 0 }), {})
  );
  const [paymentState, setPaymentState] = useState(null);

  if (!hotel) {
    return <Navigate to="/searchresults" replace />;
  }

  const nights = daysBetween(search.checkIn, search.checkOut);
  const heroImages = [hotel.image, ...galleryImages];
  const discountedPrice = Math.round(hotel.price * nights);
  const oldPrice = hotel.oldPrice ? Math.round(hotel.oldPrice * nights) : Math.round(discountedPrice * 1.22);
  const totalSelected = Object.values(selectedRooms).reduce((total, count) => total + Number(count || 0), 0);
  const updateRoomCount = (roomName, count) => {
    setSelectedRooms((current) => ({ ...current, [roomName]: Number(count) }));
  };
  const reserveRoom = (room) => {
    const reservedCount = Number(selectedRooms[room.name]) || 1;
    const price = Math.round(hotel.price * room.multiplier * nights);
    setSelectedRooms((current) => ({ ...current, [room.name]: reservedCount }));
    setPaymentState({
      roomName: room.name,
      roomCount: reservedCount,
      total: price * reservedCount,
    });
    document.getElementById("payment-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/searchresults">Search results</Link>
        <span>/</span>
        <span>{hotel.name}</span>
      </div>

      <nav className={styles.tabs} aria-label="Hotel detail sections">
        {["Overview", "Info & prices", "Facilities", "House rules", "Guest reviews"].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-").replace("&", "and")}`}>
            {item}
          </a>
        ))}
      </nav>

      <section className={styles.hero} id="overview">
        <div className={styles.titleBlock}>
          <div className={styles.hotelMeta}>
            <span className={styles.badge}>Genius discount available</span>
            <span className={styles.badgeLight}>Travel Sustainable Level 2</span>
          </div>
          <span className={styles.propertyType}>{hotel.propertyType}</span>
          <div className={styles.titleRow}>
            <div>
              <h1>{hotel.name}</h1>
              <p className={styles.stars}>{"*".repeat(hotel.stars)}</p>
            </div>
            <Button type="button" onClick={() => document.getElementById("availability")?.scrollIntoView({ behavior: "smooth" })}>
              Reserve
            </Button>
          </div>
          <p className={styles.address}>{hotel.location} - {hotel.distance} km from centre - <a href="#map">Show on map</a></p>
          <p className={styles.locationHighlight}>Excellent location - rated highly by recent guests ({hotel.reviewScore}/10)</p>
        </div>

        <aside className={styles.reviewCard}>
          <div>
            <strong>{hotel.reviewLabel}</strong>
            <span>{hotel.reviews.toLocaleString()} reviews</span>
          </div>
          <b>{hotel.reviewScore}</b>
        </aside>
      </section>

      <section className={styles.gallery} aria-label={`${hotel.name} photos`}>
        {heroImages.slice(0, 6).map((image, index) => (
          <img key={image} src={image} alt={`${hotel.name} photo ${index + 1}`} className={index === 0 ? styles.featuredImage : ""} />
        ))}
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          <div className={styles.signInStrip}>
            <span>To see if you can save 10% or more at this property</span>
            <button type="button">Sign in</button>
            <strong>Genius</strong>
          </div>

          <section className={styles.description} id="info-and-prices">
            <h2>Stay in the heart of {hotel.city}</h2>
            <p>
              {hotel.name} offers comfortable rooms, helpful service and easy access to the best-known parts of {hotel.city}. The
              property is a practical choice for guests who want a simple stay close to restaurants, transport and local sights.
            </p>
            <p>
              Couples particularly like the location and rate it highly for a two-person trip. Mock availability is ready below,
              including no-prepayment rooms and flexible choices.
            </p>
          </section>

          <section className={styles.facilities} id="facilities">
            <h2>Most popular facilities</h2>
            <div className={styles.facilityGrid}>
              {[...new Set([...hotel.facilities, ...highlights])].slice(0, 12).map((facility) => (
                <span key={facility}>{facility}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.bookingBox}>
          <h2>Property highlights</h2>
          <p>Perfect for {pluralize(search.adults, "adult")} and {pluralize(search.rooms, "room")}.</p>
          <div className={styles.pricePreview}>
            {hotel.oldPrice && <del>{formatPrice(oldPrice)}</del>}
            <strong>{formatPrice(discountedPrice)}</strong>
            <span>{pluralize(nights, "night")}, {pluralize(search.adults, "adult")}</span>
          </div>
          <div className={styles.ctaNotes}>
            <span>No booking fees</span>
            <span>Free cancellation options</span>
          </div>
          <Button type="button" onClick={() => document.getElementById("availability")?.scrollIntoView({ behavior: "smooth" })}>
            See availability
          </Button>
        </aside>
      </section>

      <section className={styles.availability} id="availability">
        <div className={styles.sectionHeader}>
          <div>
            <h2>Availability</h2>
            <p>{search.checkIn} to {search.checkOut} - {pluralize(nights, "night")} - {pluralize(search.adults, "adult")}</p>
          </div>
          <Link to="/searchresults">Change search</Link>
        </div>

        <div className={styles.roomTable}>
          <div className={styles.tableHead}>
            <span>Accommodation type</span>
            <span>Sleeps</span>
            <span>Today's price</span>
            <span>Your choices</span>
            <span>Select rooms</span>
          </div>
          {roomOptions.map((room) => {
            const price = Math.round(hotel.price * room.multiplier * nights);
            return (
              <article className={styles.roomRow} key={room.name}>
                <div>
                  <h3>{room.name}</h3>
                  <p>{room.details}</p>
                  <p>{room.beds}</p>
                </div>
                <strong className={styles.guests}>{pluralize(room.guests, "guest")}</strong>
                <div className={styles.roomPrice}>
                  <small>{pluralize(nights, "night")}, {pluralize(search.adults, "adult")}</small>
                  <strong>{formatPrice(price)}</strong>
                  <span>Additional charges may apply</span>
                </div>
                <ul>
                  {room.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <div className={styles.reserveCell}>
                  <select
                    aria-label={`Rooms for ${room.name}`}
                    value={selectedRooms[room.name]}
                    onChange={(event) => updateRoomCount(room.name, event.target.value)}
                  >
                    {[0, 1, 2, 3].map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                  <Button type="button" onClick={() => reserveRoom(room)}>
                    {selectedRooms[room.name] > 0 ? `Reserve ${selectedRooms[room.name]}` : "Reserve"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
        {totalSelected > 0 && (
          <div className={styles.selectionSummary}>
            <strong>{pluralize(totalSelected, "room")} selected.</strong>
            <span>Continue to reserve at this price by clicking the room reserve button.</span>
          </div>
        )}
        {paymentState && (
          <section className={styles.paymentPanel} id="payment-panel">
            <div className={styles.paymentHeader}>
              <div>
                <h3>Complete payment</h3>
                <p>{paymentState.roomName} · {pluralize(paymentState.roomCount, "room")} reserved for {pluralize(nights, "night")}</p>
              </div>
              <strong>{formatPrice(paymentState.total)}</strong>
            </div>
            <div className={styles.paymentGrid}>
              <label className={styles.paymentField}>
                <span>UPI ID</span>
                <input type="text" placeholder="" />
              </label>
              <label className={styles.paymentField}>
                <span>Payment note</span>
                <input type="text" value={`${hotel.name} booking`} readOnly />
              </label>
            </div>
            <div className={styles.paymentActions}>
              <span>Paste your UPI ID above and continue with payment.</span>
              <Button type="button">Pay now</Button>
            </div>
          </section>
        )}
      </section>

      <section className={styles.rules} id="house-rules">
        <h2>House rules</h2>
        <div>
          <p><strong>Check-in</strong><span>From 14:00</span></p>
          <p><strong>Check-out</strong><span>Until 11:00</span></p>
          <p><strong>Cancellation</strong><span>Varies by accommodation type</span></p>
        </div>
      </section>

      <section className={styles.reviews} id="guest-reviews">
        <h2>Guest reviews</h2>
        <div>
          <b>{hotel.reviewScore}</b>
          <p>{hotel.reviewLabel} based on {hotel.reviews.toLocaleString()} reviews</p>
        </div>
      </section>
    </main>
  );
}
