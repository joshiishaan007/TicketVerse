"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, User, Download, Calendar, Clock, MapPin, Ticket, CheckCircle } from "lucide-react"

const Confirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const movieId = queryParams.get("movieId")
  const selectedSeats = queryParams.get("seats")?.split(",") || []

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const canvasRef = useRef(null)

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
        bookingId: "BOOK" + Math.floor(100000 + Math.random() * 900000),
        totalAmount: selectedSeats.length * 12.99,
      }
      setMovie(mockMovie)
      setLoading(false)

      // Start confetti after a short delay
      setTimeout(() => {
        setShowConfetti(true)
      }, 500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [movieId, selectedSeats])

  // Confetti animation
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const confettiPieces = []
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]

    // Create confetti pieces
    for (let i = 0; i < 200; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
      })
    }

    let animationFrame

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let stillFalling = false

      confettiPieces.forEach((piece) => {
        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate((piece.rotation * Math.PI) / 180)

        ctx.fillStyle = piece.color
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size)

        ctx.restore()

        piece.y += piece.speed
        piece.x += Math.sin(piece.angle) * 2
        piece.rotation += piece.rotationSpeed

        if (piece.y < canvas.height) {
          stillFalling = true
        }
      })

      if (stillFalling) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(animationFrame)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [showConfetti])

  // Generate QR code (mock)
  const generateQRCode = () => {
    if (!movie) return ""

    // This is a placeholder. In a real app, you would use a QR code library
    // like qrcode.react to generate an actual QR code
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white" />
        <rect x="50" y="50" width="100" height="100" fill="black" />
        <rect x="60" y="60" width="80" height="80" fill="white" />
        <rect x="70" y="70" width="60" height="60" fill="black" />
        <rect x="80" y="80" width="40" height="40" fill="white" />
        <rect x="90" y="90" width="20" height="20" fill="black" />
      </svg>`,
    )}`
  }

  // Download ticket as PDF (mock)
  const downloadTicket = () => {
    // In a real app, you would generate a PDF or image
    // For this demo, we'll just show an alert
    alert(`Ticket for ${movie.title} downloaded successfully!`)
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
          Preparing your confirmation...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Confetti Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <div className="container mx-auto px-4 py-12 relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl font-bold mb-2"
            >
              Booking Confirmed!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg"
            >
              Your tickets are ready. We've sent a confirmation to your email.
            </motion.p>
          </motion.div>

          {/* Ticket Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 backdrop-blur-sm"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{movie.title}</h2>
                  <p className="text-red-100">Booking ID: {movie.bookingId}</p>
                </div>
                <Ticket size={32} className="text-white" />
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Movie Details */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded-lg shadow-lg"
                    />
                    <div>
                      <h3 className="font-bold text-xl mb-4">{movie.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="text-red-400" size={16} />
                          <span>{movie.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="text-red-400" size={16} />
                          <span>{movie.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="text-red-400" size={16} />
                          <span>{movie.hall}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-gray-300 mb-2">Seats</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seat) => (
                        <span key={seat} className="inline-block px-3 py-1 bg-gray-700 rounded-md text-sm">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total Paid</span>
                      <span>${movie.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-3 rounded-lg mb-4">
                    <img src={generateQRCode() || "/placeholder.svg"} alt="QR Code" className="w-32 h-32" />
                  </div>
                  <p className="text-sm text-gray-400 text-center mb-4">Scan this QR code at the cinema</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadTicket}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg font-medium"
                  >
                    <Download size={16} />
                    Download Ticket
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Ticket Footer */}
            <div className="bg-gray-800 p-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-300 text-sm">Please arrive 15 minutes before showtime. Enjoy your movie!</p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    <Home size={16} />
                    Home
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    <User size={16} />
                    My Bookings
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 text-center text-gray-400 text-sm"
          >
            <p>A copy of your ticket has been sent to your email address.</p>
            <p className="mt-2">
              Need help? Contact our support at{" "}
              <a href="mailto:support@movietickets.com" className="text-red-400 hover:underline">
                support@movietickets.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

