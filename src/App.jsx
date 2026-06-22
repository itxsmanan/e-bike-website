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
import BookDetail from "./components/BookDetail";
import EventDetail from "./components/EventDetail";
import PaymentModal from "./components/PaymentModal";
import StaticPage from "./components/StaticPage";
import "./App.css";

function HomeLayout({ showPaymentModal }) {
  const location = useLocation();

  // Handle scroll-to anchor navigation
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const target = document.getElementById(location.state.scrollTo);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Intersection Observer for .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
        <Route path="/"                                 element={<HomeLayout />} />
        <Route path="/book/:id"                         element={<BookDetail />} />
        <Route path="/event/:id"                        element={<EventDetail />} />
        <Route path="/payment/:type/:itemName/:price"   element={<HomeLayout showPaymentModal={true} />} />
        
        {/* Footer Static Pages */}
        <Route path="/help" element={<StaticPage title="Help Center" />} />
        <Route path="/faqs" element={<StaticPage title="Frequently Asked Questions" />} />
        <Route path="/contact" element={<StaticPage title="Contact Us" />} />
        <Route path="/shipping" element={<StaticPage title="Shipping Information" />} />
        <Route path="/returns" element={<StaticPage title="Return Policy" />} />
        <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
        <Route path="/terms" element={<StaticPage title="Terms of Service" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
