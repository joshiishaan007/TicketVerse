"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Clock, Calendar, Users, Film, MapPin, Building } from "lucide-react"
import axios from 'axios'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [theatres, setTheatres] = useState([])
  const [showtimes, setShowtimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTheater, setSelectedTheater] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [error, setError] = useState(null)

  // Format duration from "PT2H28M" to "2h 28m"
  const formatDuration = (duration) => {
    if (!duration) return "2h 30m"; // Default fallback
    
    const hours = duration.match(/(\d+)H/);
    const minutes = duration.match(/(\d+)M/);
    
    return `${hours ? hours[1] + 'h' : ''} ${minutes ? minutes[1] + 'm' : ''}`.trim();
  };

  // Format genres from string to array
  const formatGenres = (genreString) => {
    if (!genreString) return ["Drama", "Adventure"]; // Default fallback
    return genreString.split(',').map(g => g.trim());
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('jwtToken');
    
    const fetchData = async () => {
      try {
        // Fetch movie data
        const movieResponse = await axios.get(`http://localhost:8080/api/movies/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Fetch theatre data
        const theatreResponse = await axios.get('http://localhost:8080/api/theatres', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Fetch showtimes for each theatre
        const theatersWithShowtimes = await fetchShowtimesForTheaters(theatreResponse.data, movieResponse.data.id, token);
        
        // Process movie data with fallbacks for missing properties
        const processedMovie = {
          id: movieResponse.data.id,
          title: movieResponse.data.title,
          image: movieResponse.data.posterUrl || 'https://via.placeholder.com/300x450?text=Movie+Poster',
          backdrop: movieResponse.data.posterUrl || 'https://via.placeholder.com/1920x1080?text=Movie+Backdrop',
          genre: formatGenres(movieResponse.data.genre),
          releaseDate: new Date(movieResponse.data.releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          duration: formatDuration(movieResponse.data.duration),
          imdbRating: 8.5, // Hardcoded fallback
          userRating: 4.2, // Hardcoded fallback
          synopsis: movieResponse.data.description || "No synopsis available.",
          theaters: theatersWithShowtimes
        };
        
        setMovie(processedMovie);
        setTheatres(theatreResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Updated function to fetch showtimes for each theatre
  const fetchShowtimesForTheaters = async (theatres, movieId, token) => {
    const theatersWithShowtimes = await Promise.all(
      theatres.map(async (theatre) => {
        try {
          // Call your getShowtimeByTheatre endpoint
          const showtimeResponse = await axios.get(`http://localhost:8080/api/showtimes/theatre/${theatre.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Filter showtimes for the current movie
          const movieShowtimes = showtimeResponse.data.filter(
            showtime => showtime.movieId === movieId
          );
          
          // Format showtimes with both date and time
          const formattedShowtimes = movieShowtimes.map(showtime => {
            const showtimeDate = new Date(showtime.startTime);
            return {
              id: showtime.id,
              fullDateTime: showtimeDate,
              date: showtimeDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              }),
              time: showtimeDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }),
              // Store the full datetime string for navigation
              dateTimeString: showtimeDate.toISOString()
            };
          });
          
          // Only include theaters that have showtimes for this movie
          if (formattedShowtimes.length === 0) {
            return null; // We'll filter these out later
          }

          setShowtimes(movieShowtimes)
          
          return {
            id: theatre.id,
            name: theatre.name,
            location: `${theatre.address}, ${theatre.city}`,
            distance: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)} miles away`,
            showTimings: formattedShowtimes
          };
        } catch (error) {
          console.error(`Error fetching showtimes for theatre ${theatre.id}:`, error);
          return null; // Skip this theatre if there's an error
        }
      })
    );
    
    // Filter out null entries (theaters without showtimes or with errors)
    return theatersWithShowtimes.filter(Boolean);
  };

  const handleBookTickets = () => {
    if (selectedTheater && selectedTime && selectedDate) {
      // Assuming movie has an array of all showtimes
      // First filter showtimes by theater ID
      const theaterShowtimes = showtimes?.filter(
        showtime => showtime.theatreId === selectedTheater.id
      );

      console.log(theaterShowtimes)
      
      if (theaterShowtimes && theaterShowtimes.length > 0) {
        // Extract the year from the showtime.startTime
        const showtimeYear = new Date(theaterShowtimes[0].startTime).getFullYear();
        
        // Parse your selectedDate properly
        const dateParts = selectedDate.split(', ');
        const monthStr = dateParts[1].substring(0, 3);
        const day = parseInt(dateParts[1].substring(4));
        
        // Convert month abbreviation to month number (0-based in JavaScript)
        const months = {
          "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, 
          "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
        };
        const month = months[monthStr];
        
        // Parse time
        const isPM = selectedTime.includes('PM');
        let [hours, minutes] = selectedTime.replace(' AM', '').replace(' PM', '').split(':');
        hours = parseInt(hours);
        
        // Convert to 24-hour format
        if (isPM && hours < 12) {
          hours += 12;
        } else if (!isPM && hours === 12) {
          hours = 0;
        }
        
        // Create date object with correct year
        const showtimeDate = new Date(showtimeYear, month, day, hours, parseInt(minutes));
        
        const selectedShowtime = theaterShowtimes.find(showtime => {
          const startTime = new Date(showtime.startTime);
          return startTime.getTime() === showtimeDate.getTime();
        });

        console.log(selectedShowtime)
        
        if (selectedShowtime) {
          navigate(`/seat-selection?movieId=${id}&theatreId=${selectedTheater.id}&showtimeId=${selectedShowtime.id}`);
        } else {
          alert("Selected showtime not found. Please try again.");
        }
      } else {
        alert("No showtimes available for this theater. Please select another theater.");
      }
    } else if (!selectedTheater) {
      alert("Please select a theater first");
    } else {
      alert("Please select a show time");
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white text-xl">
          <p className="text-red-500 font-bold mb-4">Error:</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
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
                {movie.theaters && movie.theaters.length > 0 ? (
                  movie.theaters.map((theater) => (
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
                          
                          {/* Group showtimes by date */}
                          {(() => {
                            // Group showtimes by date
                            const groupedByDate = theater.showTimings.reduce((acc, showtime) => {
                              if (!acc[showtime.date]) {
                                acc[showtime.date] = [];
                              }
                              acc[showtime.date].push(showtime);
                              return acc;
                            }, {});
                            
                            return Object.entries(groupedByDate).map(([date, showtimes]) => (
                              <div key={date} className="mb-4">
                                <h5 className="text-sm font-medium text-gray-300 mb-2">{date}</h5>
                                <div className="flex flex-wrap gap-2">
                                  {showtimes.map((showtime, index) => (
                                    <motion.button
                                      key={index}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTime(showtime.time);
                                        setSelectedDate(showtime.date);
                                      }}
                                      className={`py-1 px-3 rounded-full text-sm transition-all ${
                                        selectedTime === showtime.time && selectedDate === showtime.date
                                          ? "bg-red-500 text-white"
                                          : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                      }`}
                                    >
                                      {showtime.time}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            ));
                          })()}
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 bg-gray-800 bg-opacity-40 rounded-xl border border-gray-700 text-center">
                    <p className="text-gray-300">No theaters available for this movie.</p>
                  </div>
                )}
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
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Date:</span>
                      <span>{selectedDate}</span>
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