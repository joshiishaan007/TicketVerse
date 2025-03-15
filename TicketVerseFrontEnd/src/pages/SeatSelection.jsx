"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Info, CreditCard, Clock, Calendar, MapPin } from "lucide-react"

const SeatSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const movieId = queryParams.get("movieId")
  const selectedTime = queryParams.get("time")

  const [selectedSeats, setSelectedSeats] = useState([])
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API call
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockMovie = {
        id: movieId,
        title: `Movie ${movieId}`,
        image: `/assets/movie${movieId}.jpg`,
        date: "October 15, 2023",
        time: selectedTime || "8:00 PM",
        hall: "Cinema Hall 3",
        seatPrice: 12.99,
        vipSeatPrice: 19.99,
        seatingPlan: generateSeatingPlan(),
      }
      setMovie(mockMovie)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [movieId, selectedTime])

  // Generate mock seating plan
  const generateSeatingPlan = () => {
    const rows = 8
    const seatsPerRow = 10
    const seatingPlan = []

    for (let row = 0; row < rows; row++) {
      const rowSeats = []
      const rowLabel = String.fromCharCode(65 + row) // A, B, C, etc.

      for (let seat = 0; seat < seatsPerRow; seat++) {
        // Create some random booked seats
        const isBooked = Math.random() < 0.3
        // Make the last two rows VIP
        const isVIP = row >= rows - 2

        rowSeats.push({
          id: `${rowLabel}${seat + 1}`,
          row: rowLabel,
          number: seat + 1,
          isBooked,
          isVIP,
        })
      }
      seatingPlan.push({
        rowLabel,
        seats: rowSeats,
      })
    }
    return seatingPlan
  }

  const toggleSeatSelection = (seat) => {
    if (seat.isBooked) return

    const seatIndex = selectedSeats.findIndex((s) => s.id === seat.id)
    if (seatIndex === -1) {
      setSelectedSeats([...selectedSeats, seat])
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
    }
  }

  const calculateTotal = () => {
    if (!movie) return 0

    return selectedSeats.reduce((total, seat) => {
      return total + (seat.isVIP ? movie.vipSeatPrice : movie.seatPrice)
    }, 0)
  }

  // Updated to redirect to terms page instead of payment
  const handleProceedToTerms = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat")
      return
    }

    // Navigate to terms page with selected seats and movie info
    navigate(`/terms?movieId=${movieId}&seats=${selectedSeats.map((s) => s.id).join(",")}&total=${calculateTotal()}`)
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
          Loading seating plan...
        </motion.div>
      </div>
    )
  }

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
          onClick={() => navigate(`/movie/${movieId}`)}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to movie
        </button>
      </motion.div>

      {/* Movie Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
          <img
            src={movie.image || "/placeholder.svg"}
            alt={movie.title}
            className="w-24 h-36 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="text-red-400" size={18} />
                <span>{movie.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="text-red-400" size={18} />
                <span>{movie.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="text-red-400" size={18} />
                <span>{movie.hall}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="container mx-auto px-4 mb-12 text-center"
      >
        <div className="relative">
          <div className="w-3/4 h-8 mx-auto bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-lg opacity-70 shadow-lg shadow-indigo-500/30"></div>
          <p className="text-gray-400 mt-2 text-sm">SCREEN</p>
          <div className="w-full h-16 bg-gradient-to-b from-indigo-500/20 to-transparent absolute top-8 left-0 z-0"></div>
        </div>
      </motion.div>

      {/* Seating Plan - Updated to center seats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="container mx-auto px-4 mb-12 overflow-x-auto"
      >
        <div className="flex flex-col items-center">
          {movie.seatingPlan.map((row, rowIndex) => (
            <div key={row.rowLabel} className="flex items-center justify-center mb-3 w-full">
              <div className="w-8 text-center text-gray-400 font-medium">{row.rowLabel}</div>

              {/* Added spacing on the left to create theater-like layout */}
              <div className="flex-1 max-w-2xl flex justify-center">
                <div className="flex gap-2">
                  {row.seats.map((seat) => (
                    <motion.button
                      key={seat.id}
                      whileHover={!seat.isBooked ? { scale: 1.1 } : {}}
                      whileTap={!seat.isBooked ? { scale: 0.95 } : {}}
                      onClick={() => toggleSeatSelection(seat)}
                      disabled={seat.isBooked}
                      className={`w-8 h-8 rounded-t-lg flex items-center justify-center text-xs font-medium transition-all ${
                        seat.isBooked
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                          : seat.isVIP
                            ? selectedSeats.some((s) => s.id === seat.id)
                              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                              : "bg-purple-900 text-purple-300 hover:bg-purple-800"
                            : selectedSeats.some((s) => s.id === seat.id)
                              ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      }`}
                    >
                      {seat.number}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="w-8 text-center text-gray-400 font-medium">{row.rowLabel}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="flex flex-wrap justify-center gap-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-gray-600"></div>
            <span className="text-gray-300 text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-green-500"></div>
            <span className="text-gray-300 text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-gray-700"></div>
            <span className="text-gray-300 text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-purple-900"></div>
            <span className="text-gray-300 text-sm">VIP Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-purple-500"></div>
            <span className="text-gray-300 text-sm">VIP Selected</span>
          </div>
        </div>
      </motion.div>

      {/* Booking Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-lg shadow-black/50 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Info size={16} className="text-gray-400" />
                <p className="text-gray-300 text-sm">
                  {selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"} selected
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedSeats.map((seat) => (
                  <motion.span
                    key={seat.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                      seat.isVIP ? "bg-purple-900 text-purple-200" : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {seat.id}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-gray-400 text-sm">Total Price</p>
                <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProceedToTerms}
                disabled={selectedSeats.length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
                  selectedSeats.length === 0
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-500/30"
                }`}
              >
                <CreditCard size={20} />
                Continue to Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SeatSelection

