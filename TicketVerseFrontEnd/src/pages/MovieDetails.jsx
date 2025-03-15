"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Clock, Calendar, Users, Film, MapPin, Building } from "lucide-react"

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTheater, setSelectedTheater] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      // Mock data - replace with actual API call
      const mockMovie = {
        id: Number.parseInt(id),
        title: `Movie ${id}`,
        image: `/assets/movie${id}.jpg`,
        backdrop: `/assets/backdrop${id}.jpg`,
        genre: ["Action", "Adventure", "Sci-Fi"],
        releaseDate: "October 15, 2023",
        duration: "2h 35m",
        imdbRating: 8.7,
        userRating: 4.5,
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
        theaters: [
          {
            id: 1,
            name: "Cineplex Downtown",
            location: "123 Main Street, Downtown",
            distance: "2.5 miles away",
            showTimings: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM"],
          },
          {
            id: 2,
            name: "MovieMax Central",
            location: "456 Park Avenue, Central District",
            distance: "4.1 miles away",
            showTimings: ["11:15 AM", "2:30 PM", "5:45 PM", "9:00 PM", "11:30 PM"],
          },
          {
            id: 3,
            name: "Starplex Cinema",
            location: "789 Broadway, Westside",
            distance: "1.8 miles away",
            showTimings: ["10:30 AM", "1:00 PM", "3:30 PM", "6:00 PM", "8:30 PM"],
          },
        ],
      }
      setMovie(mockMovie)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  const handleBookTickets = () => {
    if (selectedTheater && selectedTime) {
      navigate(`/seat-selection?movieId=${id}&theaterId=${selectedTheater.id}&time=${encodeURIComponent(selectedTime)}`)
    } else if (!selectedTheater) {
      alert("Please select a theater first")
    } else {
      alert("Please select a show time")
    }
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
          Loading movie details...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section with Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[50vh] md:h-[70vh]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${
            movie.backdrop || movie.image
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center md:items-end gap-8 z-10"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={movie.image}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-xl shadow-2xl border-2 border-gray-800"
            />
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {movie.title}
              </motion.h1>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {movie.genre.map((genre, index) => (
                  <span key={index} className="px-3 py-1 bg-red-500 bg-opacity-70 rounded-full text-sm font-medium">
                    {genre}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column - Movie Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Movie Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
                <Calendar className="text-red-400" size={20} />
                <div>
                  <p className="text-xs text-gray-300">Release Date</p>
                  <p className="font-medium text-white">{movie.releaseDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
                <Clock className="text-red-400" size={20} />
                <div>
                  <p className="text-xs text-gray-300">Duration</p>
                  <p className="font-medium text-white">{movie.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
                <Star className="text-yellow-400" size={20} />
                <div>
                  <p className="text-xs text-gray-300">IMDb Rating</p>
                  <p className="font-medium text-white">{movie.imdbRating}/10</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
                <Users className="text-blue-400" size={20} />
                <div>
                  <p className="text-xs text-gray-300">User Rating</p>
                  <p className="font-medium text-white">{movie.userRating}/5</p>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Film className="mr-2 text-red-500" size={24} />
                Synopsis
              </h2>
              <p className="text-gray-200 leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Theaters Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Building className="mr-2 text-red-500" size={24} />
                Available Theaters
              </h2>
              <div className="space-y-4">
                {movie.theaters.map((theater) => (
                  <motion.div
                    key={theater.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedTheater(theater)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedTheater?.id === theater.id
                        ? "bg-red-500 bg-opacity-20 border-red-500"
                        : "bg-gray-800 bg-opacity-40 border-gray-700 hover:bg-opacity-60"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{theater.name}</h3>
                        <div className="flex items-center gap-1 text-gray-300 text-sm">
                          <MapPin size={14} className="text-red-400" />
                          <span>{theater.location}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-300">{theater.distance}</span>
                    </div>

                    {selectedTheater?.id === theater.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-700"
                      >
                        <h4 className="font-medium mb-2 text-sm">Available Show Times:</h4>
                        <div className="flex flex-wrap gap-2">
                          {theater.showTimings.map((time, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedTime(time)
                              }}
                              className={`py-1 px-3 rounded-full text-sm transition-all ${
                                selectedTime === time
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                              }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Booking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl h-fit sticky top-10 border border-gray-700 shadow-lg shadow-black/50"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Book Tickets</h2>

            {/* Booking Summary */}
            <div className="mb-6 space-y-4">
              <div className="bg-gray-700 bg-opacity-40 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Movie:</span>
                    <span className="font-medium">{movie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span>{movie.duration}</span>
                  </div>
                  {selectedTheater && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Theater:</span>
                      <span>{selectedTheater.name}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6 text-center">
              {!selectedTheater ? (
                <p className="text-yellow-400 text-sm">Please select a theater</p>
              ) : !selectedTime ? (
                <p className="text-yellow-400 text-sm">Please select a show time</p>
              ) : (
                <p className="text-green-400 text-sm">Ready to book!</p>
              )}
            </div>

            {/* Book Button */}
            <motion.button
              whileHover={selectedTheater && selectedTime ? { scale: 1.05 } : {}}
              whileTap={selectedTheater && selectedTime ? { scale: 0.95 } : {}}
              onClick={handleBookTickets}
              className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                selectedTheater && selectedTime
                  ? "bg-gradient-to-r from-red-600 to-red-500 hover:shadow-red-500/30"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Book Tickets
            </motion.button>

            {/* Additional Info */}
            <div className="mt-6 text-sm text-gray-300 text-center">
              <p>Tickets are non-refundable</p>
              <p>Please arrive 15 minutes before showtime</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

