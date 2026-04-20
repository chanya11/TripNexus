import { createContext, useContext, useMemo, useState } from "react";

const SearchContext = createContext(null);

export const currencies = {
  INR: { symbol: "Rs.", rate: 83.2 },
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "\u20ac", rate: 0.92 },
  GBP: { symbol: "\u00a3", rate: 0.79 },
};

const initialSearch = {
  destination: "New Delhi",
  checkIn: "2026-04-20",
  checkOut: "2026-04-21",
  adults: 2,
  children: 0,
  rooms: 1,
};

const initialFilters = {
  price: 750,
  propertyTypes: [],
  stars: [],
  reviewScore: 0,
  facilities: [],
  distance: 10,
};

export function SearchProvider({ children }) {
  const [search, setSearch] = useState(initialSearch);
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("English (UK)");
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("top");

  const convertPrice = (usd) => {
    const current = currencies[currency];
    return Math.round(usd * current.rate);
  };

  const formatPrice = (usd) => {
    const current = currencies[currency];
    const value = convertPrice(usd);
    return `${current.symbol}${value.toLocaleString()}`;
  };

  const resetFilters = () => setFilters(initialFilters);

  const value = useMemo(
    () => ({
      search,
      setSearch,
      currency,
      setCurrency,
      language,
      setLanguage,
      filters,
      setFilters,
      resetFilters,
      sortBy,
      setSortBy,
      convertPrice,
      formatPrice,
    }),
    [search, currency, language, filters, sortBy]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}
