import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, FileText, Shield, CreditCard, AlertTriangle, Lock } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");
  const selectedSeats = queryParams.get("seats")?.split(",") || [];
  const totalAmount = parseFloat(queryParams.get("total") || "0");
  
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const termsContainerRef = useRef(null);
  
  // Check if user has scrolled to the bottom
  const handleScroll = () => {
    if (!termsContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = termsContainerRef.current;
    // Consider "bottom" when user has scrolled to at least 90% of the content
    const isBottom = scrollTop + clientHeight >= scrollHeight * 0.9;
    
    if (isBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };
  
  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (termsAccepted) {
      navigate(`/payment?movieId=${movieId}&seats=${selectedSeats.join(',')}&total=${totalAmount}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >
        <button 
          onClick={() => navigate(`/seat-selection?movieId=${movieId}&time=8:00%20PM`)}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to seat selection
        </button>
      </motion.div>
      
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Terms & Conditions
          </motion.h1>
          
          {/* Terms Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg overflow-hidden mb-8"
          >
            <div 
              ref={termsContainerRef}
              onScroll={handleScroll}
              className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar"
            >
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <FileText className="mr-2 text-red-400" size={20} />
                  Introduction
                </h2>
                <p className="text-gray-300 mb-4">
                  Welcome to our movie ticket booking platform. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully before proceeding with your booking.
                </p>
                <p className="text-gray-300">
                  Our platform allows you to browse movies, select seats, and purchase tickets for screenings at our partner theaters. These Terms outline your rights and responsibilities when using our services, as well as our obligations to you.
                </p>
              </div>
              
              {/* User Responsibilities */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="mr-2 text-red-400" size={20} />
                  User Responsibilities
                </h2>
                <p className="text-gray-300 mb-4">
                  When using our platform, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                  <li>Provide accurate and complete information when creating an account or making a booking</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the service only for lawful purposes and in accordance with these Terms</li>
                  <li>Not engage in any activity that could harm, disable, or impair the functioning of our platform</li>
                  <li>Arrive at the theater at least 15 minutes before the scheduled showtime</li>
                  <li>Present a valid ticket or booking confirmation at the theater</li>
                </ul>
                <p className="text-gray-300">
                  Failure to comply with these responsibilities may result in cancellation of your booking without refund, or suspension of your account.
                </p>
              </div>
              
              {/* Payment & Refund Policy */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <CreditCard className="mr-2 text-red-400" size={20} />
                  Payment & Refund Policy
                </h2>
                <p className="text-gray-300 mb-4">
                  All payments are processed securely through our payment partners. By making a payment, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                  <li>Pay the full amount specified for your selected seats and screening</li>
                  <li>Provide valid payment information</li>
                  <li>Accept any applicable service fees or taxes</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  <strong>Refund Policy:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Full refunds are available if cancellation is made at least 24 hours before the scheduled showtime</li>
                  <li>50% refund if cancellation is made between 24 hours and 6 hours before the showtime</li>
                  <li>No refunds for cancellations made less than 6 hours before the showtime</li>
                  <li>Refunds will be processed within 5-7 business days to the original payment method</li>
                  <li>In case of technical issues or service disruptions on our part, full refunds will be provided</li>
                </ul>
              </div>
              
              {/* Cancellation Policy */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 text-red-400" size={20} />
                  Cancellation Policy
                </h2>
                <p className="text-gray-300 mb-4">
                  You may cancel your booking through your account on our platform. The following conditions apply:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                  <li>Cancellations must be made through your account or by contacting customer support</li>
                  <li>The refund amount will be determined based on the timing of your cancellation as outlined in our Refund Policy</li>
                  <li>In case of theater cancellations or rescheduling, you will be notified and offered a full refund or rebooking option</li>
                  <li>Partial cancellations (cancelling some but not all seats in a booking) are not supported</li>
                </ul>
                <p className="text-gray-300">
                  We reserve the right to cancel bookings in cases of suspected fraud, technical errors in pricing, or violation of our Terms and Conditions.
                </p>
              </div>
              
              {/* Liability Disclaimer */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="mr-2 text-red-400" size={20} />
                  Liability Disclaimer
                </h2>
                <p className="text-gray-300 mb-4">
                  While we strive to provide accurate information and reliable service, we disclaim liability for:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                  <li>Inaccuracies or errors in movie information, showtimes, or theater details</li>
                  <li>Service interruptions or website downtime</li>
                  <li>Actions or policies of our partner theaters</li>
                  <li>Changes to movie schedules or theater availability made by the theaters</li>
                  <li>Personal items lost or damaged at the theater</li>
                  <li>Any indirect, consequential, or incidental damages</li>
                </ul>
                <p className="text-gray-300">
                  Our maximum liability is limited to the amount paid for your booking. Some jurisdictions do not allow limitations on implied warranties or liability, so some of these limitations may not apply to you.
                </p>
              </div>
              
              {/* Privacy Policy */}
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Lock className="mr-2 text-red-400" size={20} />
                  Privacy Policy
                </h2>
                <p className="text-gray-300 mb-4">
                  We respect your privacy and are committed to protecting your personal data. Our Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
                </p>
                <p className="text-gray-300">
                  By using our service, you consent to the collection and use of your information as described in our <a href="/privacy" className="text-red-400 hover:underline">Privacy Policy</a>. We encourage you to review our Privacy Policy to understand our practices.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Accept Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg p-6"
          >
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={handleCheckboxChange}
                  disabled={!hasScrolledToBottom}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-red-500 text-red-500 disabled:opacity-50"
                />
              </div>
              <label htmlFor="terms" className={`ml-2 text-sm ${!hasScrolledToBottom ? 'text-gray-500' : 'text-gray-300'}`}>
                I have read and agree to the Terms & Conditions
                {!hasScrolledToBottom && (
                  <span className="block text-red-400 text-xs mt-1">
                    Please scroll through the entire document first
                  </span>
                )}
              </label>
            </div>
            
            <motion.button
              whileHover={termsAccepted ? { scale: 1.02 } : {}}
              whileTap={termsAccepted ? { scale: 0.98 } : {}}
              onClick={handleProceedToPayment}
              disabled={!termsAccepted}
              className={`w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                termsAccepted
                  ? "bg-gradient-to-r from-red-600 to-red-500 shadow-lg hover:shadow-red-500/30"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {termsAccepted && <Check size={20} />}
              Proceed to Payment
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
