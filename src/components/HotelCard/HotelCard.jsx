import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext.jsx";
import Button from "../common/Button.jsx";
import Card from "../common/Card.jsx";
import styles from "./HotelCard.module.css";

export default function HotelCard({ hotel }) {
  const { formatPrice } = useSearch();
  const navigate = useNavigate();
  const [showRooms, setShowRooms] = useState(false);
  const [reservedRoom, setReservedRoom] = useState("");

  const rooms = [
    {
      name: "Standard double room",
      sleeps: "Sleeps 2",
      perks: "Free cancellation before 18 April",
      price: hotel.price,
    },
    {
      name: hotel.stars >= 4 ? "Deluxe room with breakfast" : "Comfort room",
      sleeps: hotel.stars >= 4 ? "Sleeps 2 + 1 child" : "Sleeps 2",
      perks: hotel.stars >= 4 ? "Breakfast included" : "Pay at the property",
      price: Math.round(hotel.price * 1.18),
    },
  ];

  return (
    <Card className={`${styles.card} ${showRooms ? styles.open : ""}`}>
      <img className={styles.image} src={hotel.image} alt={hotel.name} />
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <h3>{hotel.name}</h3>
            <p className={styles.location}>{hotel.location} - {hotel.distance} km from centre</p>
          </div>
          <div className={styles.score}>
            <span>{hotel.reviewLabel}</span>
            <strong>{hotel.reviewScore}</strong>
            <small>{hotel.reviews.toLocaleString()} reviews</small>
          </div>
        </div>
        <p className={styles.description}>
          {hotel.propertyType} - {"*".repeat(hotel.stars)} - {hotel.facilities.slice(0, 3).join(" - ")}
        </p>
        <span className={styles.tag}>{hotel.tag}</span>
      </div>
      <div className={styles.priceBox}>
        <p>1 night, {hotel.stars > 3 ? "2 adults" : "1 adult"}</p>
        {hotel.oldPrice && <del>{formatPrice(hotel.oldPrice)}</del>}
        <strong>{formatPrice(hotel.price)}</strong>
        <small>Includes taxes and charges</small>
        <Button type="button" onClick={() => navigate(`/hotel/${hotel.id}`)}>
          See availability
        </Button>
        <button className={styles.quickView} type="button" onClick={() => setShowRooms((current) => !current)}>
          {showRooms ? "Hide quick rooms" : "Quick view rooms"}
        </button>
      </div>

      {showRooms && (
        <div className={styles.roomPanel}>
          <div className={styles.roomHeader}>
            <div>
              <h4>Available rooms at {hotel.name}</h4>
              <p>Choose a room to reserve. No payment needed today.</p>
            </div>
            {reservedRoom && <span className={styles.confirmed}>{reservedRoom} selected</span>}
          </div>
          <div className={styles.roomGrid}>
            {rooms.map((room) => (
              <article key={room.name} className={styles.room}>
                <div>
                  <h5>{room.name}</h5>
                  <p>{room.sleeps}</p>
                  <small>{room.perks}</small>
                </div>
                <div>
                  <strong>{formatPrice(room.price)}</strong>
                  <Button type="button" onClick={() => setReservedRoom(room.name)}>
                    {reservedRoom === room.name ? "Selected" : "Reserve"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
