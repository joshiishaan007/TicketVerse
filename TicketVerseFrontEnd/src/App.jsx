import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";


const App = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
