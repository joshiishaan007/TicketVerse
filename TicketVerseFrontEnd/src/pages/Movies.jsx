import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Mock Data (Replace this with API Call when ready)
    const mockMovies = [
      { id: 1, title: "Movie 1", image: "/assets/movie1.jpg" },
      { id: 2, title: "Movie 2", image: "/assets/movie2.jpg" },
      { id: 3, title: "Movie 3", image: "/assets/movie3.jpg" },
      { id: 4, title: "Movie 4", image: "/assets/movie4.jpg" },
      { id: 5, title: "Movie 5", image: "/assets/movie5.jpg" },
      { id: 6, title: "Movie 6", image: "/assets/movie6.jpg" },
    ];
    setMovies(mockMovies);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      {/* Page Title */}
      <motion.h2 
        className="text-4xl font-bold text-center mb-8 tracking-wide text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Browse Movies
      </motion.h2>

      {/* Movie Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.07, rotate: 1 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-2xl shadow-lg transition-all hover:shadow-red-500/50 hover:bg-opacity-20"
          >
            <Link to={`/movie/${movie.id}`} className="block">
              {/* Movie Image */}
              <motion.img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-80 object-cover rounded-xl border-2 border-transparent transition-all hover:border-red-500"
                whileHover={{ scale: 1.05 }}
              />
              {/* Movie Title (Centered and Black) */}
              <h3 className="text-lg text-center mt-3 font-semibold tracking-wider text-black">
                {movie.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Movies;
