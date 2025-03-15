"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CreditCard, Smartphone, Globe, Wallet, CheckCircle, Clock, Calendar, MapPin } from "lucide-react"

const Payment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const movieId = queryParams.get("movieId")
  const selectedSeats = queryParams.get("seats")?.split(",") || []
  const totalAmount = Number.parseFloat(queryParams.get("total") || "0")

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  // Mock data - replace with API call
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockMovie = {
        id: movieId,
        title: `Movie ${movieId}`,
        image: `/assets/movie${movieId}.jpg`,
        date: "October 15, 2023",
        time: "8:00 PM",
        hall: "Cinema Hall 3",
      }
      setMovie(mockMovie)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [movieId])

  // Handle card input changes
  const handleCardInputChange = (e) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "number") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)

      setCardDetails({ ...cardDetails, [name]: formattedValue })
      return
    }

    // Format expiry date
    if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)

      setCardDetails({ ...cardDetails, [name]: formattedValue })
      return
    }

    // Limit CVV to 3 digits
    if (name === "cvv") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 3)
      setCardDetails({ ...cardDetails, [name]: formattedValue })
      return
    }

    setCardDetails({ ...cardDetails, [name]: value })
  }

  // Handle payment submission
  const handlePayment = () => {
    // Validate based on payment method
    if (paymentMethod === "card") {
      if (
        cardDetails.number.length < 19 ||
        !cardDetails.name ||
        cardDetails.expiry.length < 5 ||
        cardDetails.cvv.length < 3
      ) {
        alert("Please fill all card details correctly")
        return
      }
    } else if (paymentMethod === "upi") {
      if (!upiId.includes("@")) {
        alert("Please enter a valid UPI ID")
        return
      }
    }

    // Start processing animation
    setIsProcessing(true)

    // Simulate processing with progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setProcessingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        // Redirect to confirmation page after processing
        setTimeout(() => {
          navigate(`/confirmation?movieId=${movieId}&seats=${selectedSeats.join(",")}`)
        }, 500)
      }
    }, 150)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="text-red-500 text-2xl font-bold"
        >
          Loading payment details...
        </motion.div>
      </div>
    )
  }

  return (
    <>
    <br/>
    <br/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-20">
      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#ef4444"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={252}
                      strokeDashoffset={252 - (252 * processingProgress) / 100}
                    />
                  </svg>
                </motion.div>
                {processingProgress >= 100 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {processingProgress >= 100 ? "Payment Successful!" : "Processing Payment..."}
              </h2>
              <p className="text-gray-300">
                {processingProgress >= 100 ? "Redirecting to confirmation..." : "Please don't close this window"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          disabled={isProcessing}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to seat selection
        </button>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Complete Your Payment
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 h-fit"
            >
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

              <div className="flex items-start gap-4 mb-6">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-lg shadow-lg"
                />
                <div>
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="text-red-400" size={14} />
                      <span>{movie.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="text-red-400" size={14} />
                      <span>{movie.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="text-red-400" size={14} />
                      <span>{movie.hall}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-300 mb-2">Selected Seats</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span key={seat} className="inline-block px-2 py-1 bg-gray-700 rounded-md text-sm">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Subtotal</span>
                  <span>${(totalAmount * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Tax (10%)</span>
                  <span>${(totalAmount * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-3 bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>

              {/* Payment Options */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    paymentMethod === "card"
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70"
                  }`}
                >
                  <CreditCard size={24} className="mb-2" />
                  <span className="text-sm font-medium">Card</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    paymentMethod === "upi"
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70"
                  }`}
                >
                  <Smartphone size={24} className="mb-2" />
                  <span className="text-sm font-medium">UPI</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    paymentMethod === "netbanking"
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70"
                  }`}
                >
                  <Globe size={24} className="mb-2" />
                  <span className="text-sm font-medium">Net Banking</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    paymentMethod === "wallet"
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70"
                  }`}
                >
                  <Wallet size={24} className="mb-2" />
                  <span className="text-sm font-medium">Wallet</span>
                </motion.button>
              </div>

              {/* Payment Form */}
              <AnimatePresence mode="wait">
                {paymentMethod === "card" && (
                  <motion.div
                    key="card-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "upi" && (
                  <motion.div
                    key="upi-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <p className="mt-2 text-sm text-gray-400">Enter your UPI ID (e.g. username@okbank)</p>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "netbanking" && (
                  <motion.div
                    key="netbanking-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Select Bank</label>
                      <select className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                    <p className="text-sm text-gray-400">
                      You will be redirected to your bank's website to complete the payment.
                    </p>
                  </motion.div>
                )}

                {paymentMethod === "wallet" && (
                  <motion.div
                    key="wallet-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {["Paytm", "PhonePe", "Amazon Pay", "Google Pay", "Freecharge", "MobiKwik"].map((wallet) => (
                        <motion.button
                          key={wallet}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-700 bg-opacity-50 hover:bg-opacity-70 text-gray-300"
                        >
                          <Wallet size={24} className="mb-2" />
                          <span className="text-sm font-medium">{wallet}</span>
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">You will be redirected to complete the payment.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pay Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                className="w-full mt-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center"
              >
                Pay ${totalAmount.toFixed(2)}
              </motion.button>

              <p className="mt-4 text-center text-sm text-gray-400">Your payment information is secure and encrypted</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Payment

