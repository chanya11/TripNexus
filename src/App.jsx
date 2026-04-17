import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import HotelDetail from "./pages/HotelDetail.jsx";
import TravelProductPage from "./pages/TravelProductPage.jsx";
import Attractions from "./pages/Attractions.jsx";
import Flights from "./pages/Flights.jsx";
import FlightHotel from "./pages/FlightHotel.jsx";
import {
  carResults,
  taxiResults,
} from "./data/travelProducts.js";
import styles from "./App.module.css";
export default function App() {
  const location = useLocation();

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/stays" element={<Navigate to="/searchresults" replace />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flight-hotel" element={<FlightHotel />} />
        <Route path="/car-rentals" element={<TravelProductPage type="cars" items={carResults} />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/airport-taxis" element={<TravelProductPage type="taxis" items={taxiResults} />} />
      </Routes>
      <Footer />
    </div>
  );
}
