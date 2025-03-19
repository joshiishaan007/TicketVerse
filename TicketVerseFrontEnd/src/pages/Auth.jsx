"use client"

import { useState, useEffect } from "react"
import axios from "axios" // Added for HTTP requests

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  // Added state for form inputs
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })
  const [registerForm, setRegisterForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: ""
  })
  // Added state for error messages
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")
  // Added state for loading status
  const [isLoading, setIsLoading] = useState(false)
  // Added state for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem("jwtToken")
    if (token) {
      setIsAuthenticated(true)
      // You can redirect here if needed using window.location
    }
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    // Clear errors when switching forms
    setLoginError("")
    setRegisterError("")
  }

  // Added handler for login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  // Added handler for register form changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterForm({
      ...registerForm,
      [name]: value
    })
  }

  // Added login submission handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: loginForm.username,
        password: loginForm.password
      })

      // Store JWT token in localStorage
      localStorage.setItem("jwtToken", response.data.token)
      
      // Set authentication status
      setIsAuthenticated(true)
      
      // Redirect to home page or dashboard
      window.location.href = "/dashboard"
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fixed registration submission handler to properly use the response
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterError("")

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username: registerForm.username,
        fullName: registerForm.fullName,
        email: registerForm.email,
        password: registerForm.password,
        phoneNumber: registerForm.phoneNumber
      })

      // Handle successful registration
      // Flip to login form with success message
      setIsFlipped(false)
      setLoginError("Registration successful! Please login.")
      
      // Clear the registration form
      setRegisterForm({
        username: "",
        fullName: "",
        email: "",
        password: "",
        phoneNumber: ""
      })
    } catch (error) {
      setRegisterError(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Added logout function
  const logout = () => {
    localStorage.removeItem("jwtToken")
    setIsAuthenticated(false)
    window.location.href = "/"
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
      {isAuthenticated ? (
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            You are logged in!
          </h2>
          <p className="text-gray-400 mb-6">Welcome to your movie journey</p>
          <button
            onClick={logout}
            className="py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 border-none rounded-lg text-white font-semibold cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
          >
            Logout
          </button>
        </div>
      ) : (
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
              
              {loginError && (
                <div className="mb-4 p-2 bg-red-900/40 border border-red-500/50 rounded text-sm text-center">
                  {loginError}
                </div>
              )}

              <form className="flex flex-col gap-5 flex-1" onSubmit={handleLoginSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
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
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
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
                  disabled={isLoading}
                  className="py-3 bg-gradient-to-r from-red-500 to-pink-500 border-none rounded-lg text-white font-semibold cursor-pointer relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
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

              {registerError && (
                <div className="mb-4 p-2 bg-red-900/40 border border-red-500/50 rounded text-sm text-center">
                  {registerError}
                </div>
              )}

              <form className="flex flex-col gap-4 flex-1" onSubmit={handleRegisterSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
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
                    name="fullName"
                    value={registerForm.fullName}
                    onChange={handleRegisterChange}
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
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
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
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
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
                    name="phoneNumber"
                    value={registerForm.phoneNumber}
                    onChange={handleRegisterChange}
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
                  disabled={isLoading}
                  className="py-3 bg-gradient-to-r from-red-500 to-pink-500 border-none rounded-lg text-white font-semibold cursor-pointer relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
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
      )}

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