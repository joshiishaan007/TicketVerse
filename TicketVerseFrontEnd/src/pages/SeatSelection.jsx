"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Info, CreditCard, Clock, Calendar, MapPin } from "lucide-react"
import axios from "axios"

const SeatSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const movieId = queryParams.get("movieId")
  const theatreId = queryParams.get("theatreId")
  const showtimeId = queryParams.get("showtimeId")
  
  const [selectedSeats, setSelectedSeats] = useState([])
  const [movie, setMovie] = useState(null)
  const [theatre, setTheatre] = useState(null)
  const [seats, setSeats] = useState([])
  const [seatingPlan, setSeatingPlan] = useState([])
  const [loading, setLoading] = useState(true)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [vipTicketPrice, setVipTicketPrice] = useState(0)
  const [showtime, setShowtime] = useState(null)
  const [showtimeDate, setShowtimeDate] = useState(null)
  const [showtimeTime, setShowtimeTime] = useState(null)
  const [error, setError] = useState(null)
  const [bookingInProgress, setBookingInProgress] = useState(false)

  console.log("URL Search:", location.search)
  console.log("Query Params:", {movieId, theatreId, showtimeId})

  // Get token from localStorage
  const token = localStorage.getItem("jwtToken")
  // Get userId from localStorage (assuming it's stored there)
  const userId = localStorage.getItem("userId")

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMovie(response.data)
    } catch (err) {
      console.error("Error fetching movie details:", err)
      setError("Failed to load movie details")
    }
  }

  // Fetch theatre details
  const fetchTheatreDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/theatres/${theatreId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTheatre(response.data)
    } catch (err) {
      console.error("Error fetching theatre details:", err)
      setError("Failed to load theatre details")
    }
  }

  // Fetch showtime details including seats
  const fetchShowtimeDetails = async () => {
    try {
      const showtimeResponse = await axios.get(`http://localhost:8080/api/showtimes/${showtimeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setShowtime(showtimeResponse.data)
      
      // Process the LocalDateTime from startTime into separate date and time
      if (showtimeResponse.data && showtimeResponse.data.startTime) {
        // Parse the LocalDateTime string
        const dateTimeString = showtimeResponse.data.startTime;
        console.log("Original startTime:", dateTimeString);
        
        // Check if it's ISO format (2023-04-15T14:30:00) or custom format
        try {
          let dateObj;
          if (dateTimeString.includes('T')) {
            // ISO format
            dateObj = new Date(dateTimeString);
          } else if (dateTimeString.includes(' ')) {
            // Format like "2023-04-15 14:30:00"
            const [datePart, timePart] = dateTimeString.split(' ');
            dateObj = new Date(`${datePart}T${timePart}`);
          } else {
            // Try direct parsing as a fallback
            dateObj = new Date(dateTimeString);
          }
          
          if (!isNaN(dateObj.getTime())) {
            // Format date as "Apr 15, 2023"
            const dateFormatted = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }).format(dateObj);
            
            // Format time as "2:30 PM"
            const timeFormatted = new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }).format(dateObj);
            
            setShowtimeDate(dateFormatted);
            setShowtimeTime(timeFormatted);
            
            console.log("Formatted date:", dateFormatted);
            console.log("Formatted time:", timeFormatted);
          } else {
            console.error("Invalid date object");
            setShowtimeDate("Date unavailable");
            setShowtimeTime("Time unavailable");
          }
        } catch (err) {
          console.error("Error parsing date:", err);
          setShowtimeDate("Date unavailable");
          setShowtimeTime("Time unavailable");
        }
      }
      
      // Fetch seats with explicit JSON response type
      const showtimeSeatResponse = await axios.get(`http://localhost:8080/api/showtimes/${showtimeId}/seats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if status code is less than 500
        }
      })
      
      // Log the response for debugging
      console.log("Seats API response type:", typeof showtimeSeatResponse.data);
      console.log("Seats API response:", showtimeSeatResponse.data);
      
      // Check if the response is HTML (likely an error page)
      if (typeof showtimeSeatResponse.data === 'string' && 
          showtimeSeatResponse.data.includes('<!DOCTYPE html>')) {
        console.error("Received HTML instead of JSON. Server might be returning an error page.");
        throw new Error("Invalid response format from server");
      }
      
      // Check what format the data is in and extract seats
      let seatsData = [];
      
      if (Array.isArray(showtimeSeatResponse.data)) {
        seatsData = showtimeSeatResponse.data;
      } else if (showtimeSeatResponse.data && typeof showtimeSeatResponse.data === 'object') {
        // Try common property names that might contain the seats array
        seatsData = showtimeSeatResponse.data.seats || 
                    showtimeSeatResponse.data.seatList || 
                    showtimeSeatResponse.data.data || 
                    [];
      }
      
      // Format the seats data to match our component's expected format
      const formattedSeats = seatsData.map(item => {
        // Check if item has the expected structure
        if (!item || !item.seat) {
          console.error("Unexpected seat item format:", item);
          return null;
        }
        
        return {
          id: item.id,
          row: item.seat.rowName,
          number: item.seat.columnNumber,
          isBooked: item.status === "BOOKED",
          isVIP: item.seat.seatType === "VIP" || item.seat.seatType === "PREMIUM",
          price: item.price
        }
      }).filter(Boolean); // Filter out any null items
      
      setSeats(formattedSeats)
      
      // Only continue if we have valid seats
      if (formattedSeats.length > 0) {
        // Set ticket prices based on seat types
        const standardSeats = formattedSeats.filter(seat => !seat.isVIP)
        const vipSeats = formattedSeats.filter(seat => seat.isVIP)
        
        if (standardSeats.length > 0) {
          setTicketPrice(standardSeats[0].price)
        }
        
        if (vipSeats.length > 0) {
          setVipTicketPrice(vipSeats[0].price)
        } else {
          // If no VIP seats, set VIP price to standard price + premium
          setVipTicketPrice(standardSeats.length > 0 ? standardSeats[0].price * 1.5 : 0)
        }
        
        // Organize seats into a seating plan
        organizeSeatingPlan(formattedSeats)
      } else {
        setError("No valid seat data found")
      }
    } catch (err) {
      console.error("Error fetching showtime details:", err)
      console.error("Error response:", err.response?.data)
      console.error("Error status:", err.response?.status)
      setError("Failed to load seating information. Please try refreshing the page or contact support.")
    } finally {
      setLoading(false)
    }
  }

  // Organize seats into rows and columns for the seating plan
  const organizeSeatingPlan = (seatsData) => {
    // Group seats by row
    const rowsMap = new Map()
    
    seatsData.forEach(seat => {
      if (!rowsMap.has(seat.row)) {
        rowsMap.set(seat.row, [])
      }
      rowsMap.get(seat.row).push(seat)
    })
    
    // Sort rows and seats within each row
    const sortedSeatingPlan = []
    
    // Convert Map to array and sort by row label
    Array.from(rowsMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([rowLabel, rowSeats]) => {
        // Sort seats by seat number within the row
        const sortedSeats = rowSeats.sort((a, b) => a.number - b.number)
        
        sortedSeatingPlan.push({
          rowLabel,
          seats: sortedSeats
        })
      })
    
    setSeatingPlan(sortedSeatingPlan)
  }

  // Toggle seat selection and update seat status in the database
  const toggleSeatSelection = async (seat) => {
    if (seat.isBooked) return
    
    const seatIndex = selectedSeats.findIndex((s) => s.id === seat.id)
    
    if (seatIndex === -1) {
      // Add seat to selection
      try {
        // Send request to temporarily reserve the seat
        await axios.post(`http://localhost:8080/api/showtimes/${showtimeId}/seats/${seat.id}/reserve`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        setSelectedSeats([...selectedSeats, seat])
      } catch (err) {
        console.error("Error reserving seat:", err)
        alert("This seat is no longer available")
        
        // Refresh seat data to get the latest status
        fetchShowtimeDetails()
      }
    } else {
      // Remove seat from selection
      try {
        // Send request to release the seat
        await axios.post(`http://localhost:8080/api/showtimes/${showtimeId}/seats/${seat.id}/release`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
      } catch (err) {
        console.error("Error releasing seat:", err)
        alert("Unable to release seat, please try again")
      }
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + (seat.isVIP ? vipTicketPrice : ticketPrice)
    }, 0)
  }

  // Book the selected seats
  const bookSeats = async () => {
    // if (!userId) {
    //   alert("User information not found. Please log in again.")
    //   navigate("/login", { state: { from: location } })
    //   return
    // }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat")
      return
    }

    setBookingInProgress(true)

    try {
      // Create booking request with required fields
      const bookingRequest = {
        showtimeId: parseInt(showtimeId),
        seatIds: selectedSeats.map(seat => seat.id),
        userId: parseInt(3)
      }

      console.log("Booking request:", bookingRequest)

      // Send booking request to the server
      const response = await axios.post(`http://localhost:8080/api/bookings`, bookingRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log("Booking response:", response.data)

      // If successful, navigate to confirmation page
      navigate(`/terms?movieId=${movieId}&theatreId=${theatreId}&showtimeId=${showtimeId}&seats=${selectedSeats.map((s) => s.id).join(",")}&total=${calculateTotal()}`)
    } catch (err) {
      console.error("Error booking seats:", err)
      console.error("Error response:", err.response?.data)
      alert("Failed to book seats. Please try again.")
      
      // Refresh seat data to get the latest status
      fetchShowtimeDetails()
    } finally {
      setBookingInProgress(false)
    }
  }

  // Load all necessary data when component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: location } })
      return
    }
    
    if (movieId && theatreId && showtimeId) {
      fetchMovieDetails()
      fetchTheatreDetails()
      fetchShowtimeDetails()
    } else {
      setError("Missing required information")
      setLoading(false)
    }
    
    // Cleanup function to release any seats when component unmounts
    return () => {
      if (selectedSeats.length > 0) {
        selectedSeats.forEach(async (seat) => {
          try {
            await axios.post(`http://localhost:8080/api/showtimes/${showtimeId}/seats/${seat.id}/release`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          } catch (err) {
            console.error("Error releasing seat on unmount:", err)
          }
        })
      }
    }
  }, [movieId, theatreId, showtimeId, token, navigate, location])

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-500 text-xl font-bold mb-4">Error</h2>
          <p className="text-white">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Go Back
          </button>
        </div>
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
            src={movie?.posterUrl || "/placeholder.svg"}
            alt={movie?.title}
            className="w-24 h-36 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{movie?.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="text-red-400" size={18} />
                <span>{showtimeDate || "Loading..."}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="text-red-400" size={18} />
                <span>{showtimeTime || "Loading..."}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="text-red-400" size={18} />
                <span>{theatre?.name || "Loading..."} - {showtime?.screenName || "Loading..."}</span>
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

      {/* Seating Plan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="container mx-auto px-4 mb-12 overflow-x-auto"
      >
        <div className="flex flex-col items-center">
          {seatingPlan.length > 0 ? (
            seatingPlan.map((row) => (
              <div key={row.rowLabel} className="flex items-center justify-center mb-3 w-full">
                <div className="w-8 text-center text-gray-400 font-medium">{row.rowLabel}</div>

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
            ))
          ) : (
            <div className="text-gray-400 py-10">No seats available for this showing</div>
          )}
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
                    {seat.row}{seat.number}
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
                onClick={bookSeats}
                disabled={selectedSeats.length === 0 || bookingInProgress}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
                  selectedSeats.length === 0 || bookingInProgress
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-500/30"
                }`}
              >
                <CreditCard size={20} />
                {bookingInProgress ? "Processing..." : "Book Now"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SeatSelection