import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import BookSplash from "./components/BookSplash";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import FeaturedBooks from "./components/FeaturedBooks";
import Audiobooks from "./components/Audiobooks";
import LibraryFeatures from "./components/LibraryFeatures";
import CelebrityEvents from "./components/CelebrityEvents";
import AboutAuthor from "./components/AboutAuthor";
import SubscriptionPlans from "./components/SubscriptionPlans";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import BookDetailModal from "./components/BookDetailModal";
import EventDetailModal from "./components/EventDetailModal";
import PaymentModal from "./components/PaymentModal";
import "./App.css";

function HomeLayout({ showBookModal, showEventModal, showPaymentModal }) {
  const location = useLocation();

  // Replicate smooth scrolling from navigation or redirections
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const target = document.getElementById(location.state.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Clear location state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Replicate scroll fade-in animations from the original website
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".book-card, .plan-card, .feature-card, .audiobook-player, .event-card",
    );
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <Stats />
      <FeaturedBooks />
      <Audiobooks />
      <LibraryFeatures />
      <CelebrityEvents />
      <AboutAuthor />
      <SubscriptionPlans />
      <Footer />

      {/* Render Modal Overlays based on active React Router route */}
      {showBookModal && <BookDetailModal />}
      {showEventModal && <EventDetailModal />}
      {showPaymentModal && <PaymentModal />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BookSplash />
      <Navbar />
      <WhatsAppFloat />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/book/:id" element={<HomeLayout showBookModal={true} />} />
        <Route
          path="/event/:id"
          element={<HomeLayout showEventModal={true} />}
        />
        <Route
          path="/payment/:itemName/:price"
          element={<HomeLayout showPaymentModal={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
