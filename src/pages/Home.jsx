import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import hotels from "../data/hotels.json";
import styles from "./Home.module.css";

const accountStorageKey = "tripnexus-account";
const accountEventName = "tripnexus-account-change";
const destinationFallbacks = {
  Agra: "New Delhi",
  Rishikesh: "New Delhi",
  Mussoorie: "New Delhi",
  Shimla: "Chandigarh",
  Manali: "Chandigarh",
  Goa: "Mumbai",
};

const destinations = [
  { name: "New Delhi", flag: "IN", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80" },
  { name: "Bangalore", flag: "IN", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80" },
  { name: "Mumbai", flag: "IN", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80" },
  { name: "Chennai", flag: "IN", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80" },
  { name: "Varanasi", flag: "IN", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80" },
];

const propertyTypes = [
  { title: "Hotels", count: "1,042,387 hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
  { title: "Apartments", count: "1,235,901 apartments", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80" },
  { title: "Resorts", count: "19,322 resorts", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80" },
  { title: "Villas", count: "673,201 villas", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80" },
  { title: "Cabins", count: "42,155 cabins", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=500&q=80" },
  { title: "Cottages", count: "151,832 cottages", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=500&q=80" },
];

const quickTrips = [
  { name: "Jaipur", distance: "238 km away", image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=500&q=80" },
  { name: "Agra", distance: "183 km away", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80" },
  { name: "Rishikesh", distance: "193 km away", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80" },
  { name: "Mussoorie", distance: "221 km away", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=500&q=80" },
  { name: "Shimla", distance: "343 km away", image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=500&q=80" },
  { name: "Manali", distance: "407 km away", image: "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=500&q=80" },
];

const weekendDeals = [
  { city: "Goa", label: "Beach stays from Rs.4,999", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80" },
  { city: "Udaipur", label: "Lake-view stays from Rs.5,499", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80" },
  { city: "Kochi", label: "Heritage hotels from Rs.3,299", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80" },
  { city: "Jaipur", label: "Palace stays from Rs.4,599", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80" },
  { city: "Mumbai", label: "City breaks from Rs.5,999", image: "https://images.unsplash.com/photo-1526481280695-3c4691f29f37?auto=format&fit=crop&w=700&q=80" },
  { city: "Varanasi", label: "Riverfront stays from Rs.3,899", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80" },
];

const inspirationTabs = ["Romance", "Outdoors", "City", "Relax", "Food"];

function HorizontalRow({ title, subtitle, className = "", children }) {
  const railRef = useRef(null);

  const scrollByCards = (direction) => {
    if (!railRef.current) return;
    const amount = Math.round(railRef.current.clientWidth * 0.82) * direction;
    railRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className={styles.container}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>{title}</h2>
          {subtitle && <p className={styles.subhead}>{subtitle}</p>}
        </div>
        <div className={styles.railControls}>
          <button type="button" aria-label={`Scroll ${title} left`} onClick={() => scrollByCards(-1)}>‹</button>
          <button type="button" aria-label={`Scroll ${title} right`} onClick={() => scrollByCards(1)}>›</button>
        </div>
      </div>
      <div ref={railRef} className={`${styles.rail} ${className}`}>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { search, setSearch } = useSearch();
  const [activeInspiration, setActiveInspiration] = useState("Romance");
  const [homeModal, setHomeModal] = useState(null);
  const [account, setAccount] = useState(null);

  const availableDestinations = useMemo(
    () => new Set(hotels.flatMap((hotel) => [hotel.city, hotel.location, hotel.name])),
    []
  );

  const visibleTrips = useMemo(() => {
    const offset = inspirationTabs.indexOf(activeInspiration);
    return [...quickTrips.slice(offset), ...quickTrips.slice(0, offset)].slice(0, 6);
  }, [activeInspiration]);

  useEffect(() => {
    const savedAccount = window.localStorage.getItem(accountStorageKey);
    if (savedAccount) {
      setAccount(JSON.parse(savedAccount));
    }

    const syncAccount = (event) => {
      if (event instanceof CustomEvent) {
        setAccount(event.detail || null);
        return;
      }

      const storedValue = window.localStorage.getItem(accountStorageKey);
      setAccount(storedValue ? JSON.parse(storedValue) : null);
    };

    window.addEventListener(accountEventName, syncAccount);

    return () => {
      window.removeEventListener(accountEventName, syncAccount);
    };
  }, []);

  const resolveDestination = (destination) => {
    if (availableDestinations.has(destination)) {
      return destination;
    }
    return destinationFallbacks[destination] || "New Delhi";
  };

  const openDestination = (destination) => {
    const resolvedDestination = resolveDestination(destination);
    setSearch({
      ...search,
      destination: resolvedDestination,
    });
    navigate("/searchresults");
  };

  const openPropertyType = (type) => {
    setSearch({
      ...search,
      destination: search.destination || "New Delhi",
    });
    const normalizedType = type === "Hotels" ? "Hotel" : type.replace(/s$/, "");
    navigate("/searchresults", { state: { propertyType: normalizedType } });
  };

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>Find your next stay</h1>
          <p>Search low prices on hotels, homes and much more...</p>
          <SearchBar />
        </div>
      </section>

      <section className={styles.container}>
        <h2>Offers</h2>
        <p className={styles.subhead}>Promotions, deals and special offers for you</p>
        <div className={styles.offerGrid}>
          <div className={styles.offer}>
            <div>
              <h3>Save 15% or more</h3>
              <p>Enjoy deals at participating properties worldwide.</p>
              <button onClick={() => openDestination("Goa")}>Explore deals</button>
            </div>
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Beach resort" />
          </div>
          <div className={styles.geniusBox}>
            <strong>Get instant discounts</strong>
            <p>
              {account
                ? `Signed in as ${account.name}. Your member discounts and saved details are ready to use.`
                : "Sign in and save 10% or more at participating properties."}
            </p>
            {!account && <button onClick={() => setHomeModal("signin")}>Sign in</button>}
            {!account && <button onClick={() => setHomeModal("register")}>Register</button>}
          </div>
        </div>
      </section>

      <section className={styles.container}>
        <h2>Trending destinations</h2>
        <p className={styles.subhead}>Most popular choices for travellers from India</p>
        <div className={styles.destinationGrid}>
          {destinations.map((destination, index) => (
            <button
              type="button"
              key={destination.name}
              className={index < 2 ? styles.largeTile : styles.tile}
              onClick={() => openDestination(destination.name)}
              aria-label={`Search stays in ${destination.name}`}
            >
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name} <span>{destination.flag}</span></h3>
            </button>
          ))}
        </div>
      </section>

      <HorizontalRow title="Browse by property type">
        {propertyTypes.map((type) => (
          <button key={type.title} className={styles.propertyCard} onClick={() => openPropertyType(type.title)}>
            <img src={type.image} alt={type.title} />
            <h3>{type.title}</h3>
            <p>{type.count}</p>
          </button>
        ))}
      </HorizontalRow>

      <section className={`${styles.container} ${styles.tripPlannerSection}`}>
        <h2 className={styles.tripPlannerTitle}>Quick and easy trip planner</h2>
        <p className={`${styles.subhead} ${styles.tripPlannerSubhead}`}>Pick a vibe and explore top destinations near you</p>
        <div className={styles.pillRow}>
          {inspirationTabs.map((tab) => (
            <button
              key={tab}
              className={activeInspiration === tab ? styles.activePill : ""}
              onClick={() => setActiveInspiration(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.tripGrid}>
          {visibleTrips.map((trip) => (
            <button key={trip.name} className={styles.tripCard} onClick={() => openDestination(trip.name)}>
              <img src={trip.image} alt={trip.name} />
              <div>
                <h3>{trip.name}</h3>
                <p>{trip.distance}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <HorizontalRow
        title="Homes guests love"
        subtitle="Most-booked stays with strong ratings and great locations"
      >
        {hotels.slice(0, 12).map((hotel) => (
          <button key={hotel.id} className={styles.lovedCard} onClick={() => openDestination(hotel.city)}>
            <img src={hotel.image} alt={hotel.name} />
            <div>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <span>{hotel.reviewScore} {hotel.reviewLabel}</span>
            </div>
          </button>
        ))}
      </HorizontalRow>

      <HorizontalRow
        title="Stay at our top unique properties"
        subtitle="From castles and villas to boats and igloos"
      >
        {hotels.slice(4, 16).map((hotel) => (
          <button key={hotel.id} className={styles.stayCard} onClick={() => openDestination(hotel.city)}>
            <img src={hotel.image} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <span>{hotel.reviewScore} {hotel.reviewLabel}</span>
          </button>
        ))}
      </HorizontalRow>

      <section className={styles.container}>
        <h2>Deals for the weekend</h2>
        <p className={styles.subhead}>Save on stays for 18 April - 20 April</p>
        <div className={styles.dealGrid}>
          {weekendDeals.map((deal) => (
            <button key={deal.city} className={styles.dealCard} onClick={() => openDestination(deal.city)}>
            <img src={deal.image} alt={deal.city} />
            <div>
              <h3>{deal.city}</h3>
              <p>{deal.label}</p>
            </div>
          </button>
        ))}
        </div>
      </section>

      <HorizontalRow title="Look for the perfect stay" subtitle="More ideas for your next booking">
        {hotels.slice(12, 24).map((hotel) => (
          <button key={hotel.id} className={styles.propertyCard} onClick={() => openDestination(hotel.city)}>
            <img src={hotel.image} alt={hotel.name} />
            <h3>{hotel.propertyType}s in {hotel.city}</h3>
            <p>Starting from {hotel.price}</p>
          </button>
        ))}
      </HorizontalRow>

      <section className={styles.container}>
        <div className={styles.appPromo}>
          <div>
            <h2>Find deals on the go</h2>
            <p>Save properties, compare prices, and keep your booking details close.</p>
            <button onClick={() => setHomeModal("app")}>Get the app</button>
          </div>
          <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80" alt="Mobile travel app" />
        </div>
      </section>

      <section className={styles.container}>
        <h2>Popular with travellers from India</h2>
        <div className={styles.linkColumns}>
          {[
            ["Domestic cities", "New Delhi hotels", "Mumbai hotels", "Bangalore hotels", "Chennai hotels", "Jaipur hotels"],
            ["International cities", "Dubai hotels", "Singapore hotels", "Bangkok hotels", "London hotels", "Paris hotels"],
            ["Regions", "Goa hotels", "Rajasthan hotels", "Kerala hotels", "Himachal Pradesh hotels", "Uttarakhand hotels"],
            ["Property types", "Apartments", "Villas", "Resorts", "Hostels", "Guest houses"],
          ].map((column) => (
            <div key={column[0]}>
              <h3>{column[0]}</h3>
              {column.slice(1).map((item) => (
                <button key={item} onClick={() => openDestination(item.replace(" hotels", ""))}>{item}</button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {homeModal && (
        <div className={styles.modalBackdrop} onMouseDown={() => setHomeModal(null)}>
          <section className={styles.homeModal} onMouseDown={(event) => event.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setHomeModal(null)}>x</button>
            {homeModal === "app" ? (
              <>
                <h2>Get the TripNexus app</h2>
                <p>Enter your phone number and we will send a download link.</p>
                <input placeholder="+91 phone number" />
                <button onClick={() => setHomeModal(null)}>Send link</button>
              </>
            ) : (
              <>
                <h2>{homeModal === "signin" ? "Sign in to unlock member perks" : "Create your TripNexus account"}</h2>
                <p>Access saved stays, private discounts and faster checkout.</p>
                <input placeholder="Email address" type="email" />
                {homeModal === "register" && <input placeholder="Full name" />}
                <button onClick={() => setHomeModal(null)}>{homeModal === "signin" ? "Continue" : "Register"}</button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
