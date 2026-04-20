import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BookingContext = createContext(null);
const storageKey = "tripnexus-bookings";

function readStoredBookings() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(readStoredBookings);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(bookings));
  }, [bookings]);

  const upsertBooking = (booking) => {
    setBookings((current) => {
      const next = current.filter((item) => item.category !== booking.category);
      return [...next, booking];
    });
  };

  const removeBooking = (category) => {
    setBookings((current) => current.filter((item) => item.category !== category));
  };

  const clearBookings = () => {
    setBookings([]);
  };

  const value = useMemo(
    () => ({
      bookings,
      upsertBooking,
      removeBooking,
      clearBookings,
    }),
    [bookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
