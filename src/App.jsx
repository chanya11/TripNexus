import { useEffect } from "react";
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
import PaymentPage from "./Payment/PaymentPage.jsx";
import HelpCenter from "./Helpcenter/helpcenter.jsx";
import Cancellations from "./Helpcenter/Cancellations.jsx";
import HelpCenterPayment from "./Helpcenter/Payment.jsx";
import BookingDetails from "./Helpcenter/BookingDetails.jsx";
import Communications from "./Helpcenter/Communications.jsx";
import RoomTypes from "./Helpcenter/RoomTypes.jsx";
import Pricing from "./Helpcenter/Pricing.jsx";
import CreditCards from "./Helpcenter/CreditCards.jsx";
import PropertyPolicies from "./Helpcenter/PropertyPolicies.jsx";
import ExtraFacilities from "./Helpcenter/ExtraFacilities.jsx";
import SecurityAndAwareness from "./Helpcenter/SecurityAndAwareness.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className={styles.app}>
      <Header />
      <ScrollToTop />
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
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/help-center/cancellations" element={<Cancellations />} />
        <Route path="/help-center/payment" element={<HelpCenterPayment />} />
        <Route path="/help-center/booking-details" element={<BookingDetails />} />
        <Route path="/help-center/communications" element={<Communications />} />
        <Route path="/help-center/room-types" element={<RoomTypes />} />
        <Route path="/help-center/pricing" element={<Pricing />} />
        <Route path="/help-center/credit-cards" element={<CreditCards />} />
        <Route path="/help-center/property-policies" element={<PropertyPolicies />} />
        <Route path="/help-center/extra-facilities" element={<ExtraFacilities />} />
        <Route path="/help-center/security-and-awareness" element={<SecurityAndAwareness />} />
      </Routes>
      <Footer />
    </div>
  );
}
