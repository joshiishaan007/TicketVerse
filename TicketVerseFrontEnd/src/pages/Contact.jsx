import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, 
         FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, 
         FaComments, FaPaperclip } from 'react-icons/fa';

const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    file: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
        file: null
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };
  
  // Toggle FAQ accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  
  // FAQ data
  const faqData = [
    {
      question: "How do I cancel my movie ticket?",
      answer: "You can cancel your ticket up to 4 hours before the show time. Go to 'My Bookings' section, select the booking you want to cancel, and click on the 'Cancel Ticket' button. Refund will be processed within 5-7 business days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI payments, net banking, and popular digital wallets including PayTM, PhonePe, and Google Pay."
    },
    {
      question: "Can I change my seat after booking?",
      answer: "Seat changes are possible up to 12 hours before the show, subject to availability. You'll need to cancel your current booking and make a new one."
    },
    {
      question: "Do you offer any membership or loyalty programs?",
      answer: "Yes, we offer a MoviePass membership with tiered benefits including discounted tickets, free snacks, and exclusive premieres. Check our Membership page for more details."
    }
  ];
  
  return (
    <div className="contact-page-container">
      {/* Gradient Background */}
      <div className="gradient-bg"></div>
      
      {/* Header Section */}
      <motion.section 
        className="header-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <br/>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out with any questions, feedback, or support needs.</p>
      </motion.section>
      
      <div className="contact-content">
        {/* Left Column - Contact Info & Map */}
        <motion.div 
          className="contact-info-column"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-card">
            <h2>Contact Information</h2>
            
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h3>Email Us</h3>
                <p>support@ticketverse.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h3>Call Us</h3>
                <p>+91 9876543210</p>
              </div>
            </div>
            
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h3>Visit Us</h3>
                <p>123, Movie Street, Bollywood City, India</p>
              </div>
            </div>
            
            <div className="info-item">
              <FaClock className="info-icon" />
              <div>
                <h3>Operating Hours</h3>
                <p>Monday – Friday, 9 AM – 6 PM</p>
              </div>
            </div>
            
            <div className="social-media">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, color: '#4267B2' }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <FaFacebook />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, color: '#1DA1F2' }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <FaTwitter />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, color: '#E1306C' }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <FaInstagram />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, color: '#0077B5' }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, color: '#FF0000' }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <FaYoutube />
                </motion.a>
              </div>
            </div>
            
            <div className="quick-contact">
              <motion.a 
                href="#" 
                className="whatsapp-button"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <FaWhatsapp /> WhatsApp Support
              </motion.a>
              <motion.a 
                href="#" 
                className="live-chat-button"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <FaComments /> Start Live Chat
              </motion.a>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="map-container glass-card">
            <h2>Find Us</h2>
            <div className="google-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0256998221!2d72.8289029!3d19.0748628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c743b2a0e3%3A0x81ddef2b7f156927!2sBollywood!5e0!3m2!1sen!2sin!4v1647834125!5m2!1sen!2sin" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </motion.div>
        
        {/* Right Column - Contact Form & FAQ */}
        <motion.div 
          className="form-column"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Contact Form */}
          <div className="glass-card">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                  className="form-input"
                />
                <label 
                  htmlFor="fullName" 
                  className={formData.fullName ? "float-label active" : "float-label"}
                >
                  Full Name
                </label>
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="form-input"
                />
                <label 
                  htmlFor="email" 
                  className={formData.email ? "float-label active" : "float-label"}
                >
                  Email Address
                </label>
              </div>
              
              <div className="form-group">
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="form-select"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                <label htmlFor="subject" className="select-label">Subject</label>
              </div>
              
              <div className="form-group">
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="form-textarea"
                  maxLength="500"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className={formData.message ? "float-label active" : "float-label"}
                >
                  Your Message
                </label>
                <div className="char-count">
                  {formData.message.length}/500
                </div>
              </div>
              
              <div className="form-group file-upload">
                <label htmlFor="file" className="file-label">
                  <FaPaperclip /> Attach File (Optional)
                </label>
                <input 
                  type="file" 
                  id="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  className="file-input"
                />
                {formData.file && (
                  <div className="file-info">
                    {formData.file.name}
                  </div>
                )}
              </div>
              
              <motion.button 
                type="submit" 
                className={`submit-button ${isSubmitting ? 'submitting' : ''} ${submitStatus ? submitStatus : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </div>
          
          {/* FAQ Section */}
          <motion.div 
            className="glass-card faq-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>Frequently Asked Questions</h2>
            <div className="accordion">
              {faqData.map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <button 
                    className={`accordion-header ${activeAccordion === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                    <span className="accordion-icon">
                      {activeAccordion === index ? '−' : '+'}
                    </span>
                  </button>
                  <div 
                    className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}
                    style={{ 
                      maxHeight: activeAccordion === index ? '500px' : '0',
                      opacity: activeAccordion === index ? 1 : 0
                    }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      
      
      {/* CSS Styles */}
      <style jsx>{`
        /* Global Styles */
        .contact-page-container {
          position: relative;
          font-family: 'Poppins', sans-serif;
          color: #333;
          padding: 40px 20px;
          overflow: hidden;
          min-height: 100vh;
        }
        
        .gradient-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          z-index: -1;
        }
        
        h1, h2, h3 {
          margin: 0;
          padding: 0;
        }
        
        /* Header Section */
        .header-section {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .header-section h1 {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 10px;
        }
        
        .header-section p {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          color: #666;
        }
        
        /* Content Layout */
        .contact-content {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-info-column, .form-column {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        /* Glass Card Effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);
        }
        
        .glass-card h2 {
          font-size: 1.8rem;
          margin-bottom: 25px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .glass-card h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          border-radius: 3px;
        }
        
        /* Contact Info Styles */
        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        
        .info-icon {
          font-size: 1.5rem;
          color: #ff416c;
          margin-right: 15px;
          margin-top: 5px;
        }
        
        .info-item h3 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }
        
        .info-item p {
          color: #666;
          margin: 0;
        }
        
        /* Social Media */
        .social-media {
          margin-top: 25px;
        }
        
        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }
        
        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          color: #666;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-decoration: none;
        }
        
        /* Quick Contact Buttons */
        .quick-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 25px;
        }
        
        .whatsapp-button, .live-chat-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .whatsapp-button {
          background: #25D366;
          color: white;
        }
        
        .live-chat-button {
          background: #4A90E2;
          color: white;
        }
        
        /* Google Map */
        .map-container {
          overflow: hidden;
        }
        
        .google-map {
          border-radius: 10px;
          overflow: hidden;
          margin-top: 15px;
        }
        
        /* Contact Form */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          position: relative;
        }
        
        .form-input, .form-textarea, .form-select {
          width: 100%;
          padding: 15px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          outline: none;
          border-color: #ff416c;
          box-shadow: 0 0 0 2px rgba(255, 65, 108, 0.2);
        }
        
        .form-textarea {
          min-height: 150px;
          resize: vertical;
        }
        
        .float-label {
          position: absolute;
          top: 15px;
          left: 15px;
          color: #666;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        
        .form-input:focus ~ .float-label,
        .form-textarea:focus ~ .float-label,
        .float-label.active {
          top: -10px;
          left: 10px;
          font-size: 0.8rem;
          background: white;
          padding: 0 5px;
          color: #ff416c;
        }
        
        .select-label {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 5px;
          display: block;
        }
        
        .char-count {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 0.8rem;
          color: #666;
        }
        
        /* File Upload */
        .file-upload {
          margin-top: 10px;
        }
        
        .file-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .file-label:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .file-input {
          display: none;
        }
        
        .file-info {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #666;
          background: rgba(0, 0, 0, 0.05);
          padding: 5px 10px;
          border-radius: 5px;
          word-break: break-all;
        }
        
        /* Submit Button */
        .submit-button {
          padding: 15px 30px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 65, 108, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .submit-button:before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 100%
          );
          transform: rotate(45deg);
          z-index: 1;
          transition: all 0.5s ease;
          opacity: 0;
        }
        
        .submit-button:hover:before {
          opacity: 1;
          animation: shine 1.5s infinite;
        }
        
        @keyframes shine {
          0% {
            left: -50%;
          }
          100% {
            left: 150%;
          }
        }
        
        .submit-button.submitting {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .submit-button.success {
          background: #4CAF50;
        }
        
        /* FAQ Accordion */
        .faq-section {
          margin-top: 20px;
        }
        
        .accordion {
          margin-top: 20px;
        }
        
        .accordion-item {
          margin-bottom: 15px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .accordion-header {
          width: 100%;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .accordion-header:hover {
          background: rgba(255, 255, 255, 0.9);
        }
        
        .accordion-header.active {
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          color: white;
        }
        
        .accordion-icon {
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        .accordion-content {
          background: white;
          overflow: hidden;
          transition: all 0.3s ease;
          padding: 0 20px;
        }
        
        .accordion-content p {
          padding: 15px 0;
          margin: 0;
        }
        
        /* Footer */
        .contact-footer {
          margin-top: 50px;
          text-align: center;
          padding: 20px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .footer-links a {
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #ff416c;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-content {
            flex-direction: column;
          }
          
          .header-section h1 {
            font-size: 2.5rem;
          }
          
          .glass-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;