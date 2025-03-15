"use client"

import { useState } from "react"

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <>
    <br/>
    <br/>
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-80 p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-md h-[600px] perspective-[1500px] relative">
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl transition-transform duration-800 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col h-full text-white">
            <h2 className="text-2xl font-bold mb-1 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400 mb-8 text-center">Sign in to continue your movie journey</p>

            <form className="flex flex-col gap-5 flex-1">
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Username
                </label>
                <span className="absolute right-4 top-3">👤</span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Password
                </label>
                <span className="absolute right-4 top-3">🔒</span>
              </div>

              <div className="text-right mb-2">
                <a href="#" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="py-3 bg-gradient-to-r from-red-500 to-pink-500 border-none rounded-lg text-white font-semibold cursor-pointer relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
              >
                Sign In
                <span className="absolute block w-0 h-0 rounded-full bg-white bg-opacity-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"></span>
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-400 mb-1">New to our platform?</p>
              <button
                onClick={handleFlip}
                className="bg-transparent border-none text-pink-500 font-semibold cursor-pointer transition-all hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl transition-transform duration-800 ease-in-out ${isFlipped ? "rotate-y-0" : "rotate-y-180"}`}
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col h-full text-white">
            <h2 className="text-2xl font-bold mb-1 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-sm text-gray-400 mb-6 text-center">Join us for the best movie experience</p>

            <form className="flex flex-col gap-4 flex-1">
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Username
                </label>
                <span className="absolute right-4 top-3">👤</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Full Name
                </label>
                <span className="absolute right-4 top-3">📝</span>
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Email
                </label>
                <span className="absolute right-4 top-3">✉️</span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Password
                </label>
                <span className="absolute right-4 top-3">🔒</span>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-none rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
                  Phone Number
                </label>
                <span className="absolute right-4 top-3">📱</span>
              </div>

              <button
                type="submit"
                className="py-3 bg-gradient-to-r from-red-500 to-pink-500 border-none rounded-lg text-white font-semibold cursor-pointer relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
              >
                Sign Up
                <span className="absolute block w-0 h-0 rounded-full bg-white bg-opacity-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"></span>
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Already have an account?</p>
              <button
                onClick={handleFlip}
                className="bg-transparent border-none text-pink-500 font-semibold cursor-pointer transition-all hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add a small style block for the 3D transform properties that Tailwind doesn't cover */}
      <style jsx>{`
        .perspective-[1500px] {
          perspective: 1500px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        input:focus + label, 
        input:valid + label {
          top: -10px;
          left: 10px;
          font-size: 12px;
          background: rgba(17, 24, 39, 0.8);
          padding: 0 5px;
          color: #ec4899;
        }
      `}</style>
    </div>
    </>
  )
}

export default Auth

