import React from "react";
import { motion } from "framer-motion";

const movies = ["movie1.jpg", "movie2.jpg", "movie3.jpg", "movie4.jpg", "movie5.jpg"];

// Duplicate the movies to create a smooth looping effect
const movieLoop = [...movies, ...movies];

const Home = () => {
  return (
    <div className="mt-16">
      {/* Scrolling Banner */}
      <div className="relative w-full h-[500px] overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }} // Moves continuously
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }} // ⏳ Slowed down speed
          style={{ display: "flex", width: "200%" }} // Ensures smooth looping
        >
          {movieLoop.map((movie, index) => (
            <img
              key={index}
              src={`/assets/${movie}`}  
              alt={`Movie Poster ${index + 1}`} 
              className="w-[800px] h-[500px] object-cover mx-2 rounded-lg shadow-lg" 
            />
          ))}
        </motion.div>
      </div>

      {/* Trending Movies */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Trending Movies</h2>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255, 0, 150, 0.5)" }} // Neon Glow Effect
              transition={{ duration: 0.3 }}
            >
              <img 
                src={`/assets/movie${item}.jpg`} 
                alt={`Movie Poster ${item}`} 
                className="w-[250px] h-[350px] object-cover rounded-lg"
              />
              <h3 className="text-lg mt-3 text-center font-semibold">Movie {item}</h3> 
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
