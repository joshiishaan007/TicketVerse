"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  Edit,
  LogOut,
  Key,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  ChevronRight,
  Ticket,
  Settings,
  History,
  Eye,
} from "lucide-react"

const Profile = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("bookings")
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [bookings, setBookings] = useState([])
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Mock data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock user data
      const mockUserData = {
        id: "user123",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        profileImage: "https://i.pravatar.cc/300?img=8",
        memberSince: "January 2022",
        preferences: {
          favoriteGenres: ["Action", "Sci-Fi", "Thriller"],
          preferredCinemas: ["Cinema City", "Movieplex"],
          notifications: true,
        },
      }

      // Mock bookings data
      const mockBookings = [
        {
          id: "book123456",
          movieId: "1",
          movieTitle: "Inception",
          movieImage: "/assets/movie1.jpg",
          date: "October 15, 2023",
          time: "8:00 PM",
          hall: "Cinema Hall 3",
          seats: ["A4", "A5"],
          totalAmount: 25.98,
          status: "upcoming",
          bookingDate: "October 10, 2023",
        },
        {
          id: "book123457",
          movieId: "2",
          movieTitle: "The Dark Knight",
          movieImage: "/assets/movie2.jpg",
          date: "October 5, 2023",
          time: "6:30 PM",
          hall: "Cinema Hall 1",
          seats: ["C8", "C9", "C10"],
          totalAmount: 38.97,
          status: "confirmed",
          bookingDate: "September 30, 2023",
        },
        {
          id: "book123458",
          movieId: "3",
          movieTitle: "Interstellar",
          movieImage: "/assets/movie3.jpg",
          date: "September 25, 2023",
          time: "7:15 PM",
          hall: "Cinema Hall 2",
          seats: ["F5"],
          totalAmount: 12.99,
          status: "confirmed",
          bookingDate: "September 20, 2023",
        },
        {
          id: "book123459",
          movieId: "4",
          movieTitle: "Dune",
          movieImage: "/assets/movie4.jpg",
          date: "September 15, 2023",
          time: "9:00 PM",
          hall: "Cinema Hall 4",
          seats: ["H7", "H8"],
          totalAmount: 25.98,
          status: "cancelled",
          bookingDate: "September 10, 2023",
          cancellationReason: "Schedule conflict",
        },
        {
          id: "book123460",
          movieId: "5",
          movieTitle: "Avengers: Endgame",
          movieImage: "/assets/movie5.jpg",
          date: "August 20, 2023",
          time: "5:45 PM",
          hall: "Cinema Hall 1",
          seats: ["D12", "D13", "D14", "D15"],
          totalAmount: 51.96,
          status: "confirmed",
          bookingDate: "August 15, 2023",
        },
      ]

      setUserData(mockUserData)
      setBookings(mockBookings)
      setProfileForm({
        name: mockUserData.name,
        email: mockUserData.email,
        phone: mockUserData.phone,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    })
  }

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm({
      ...profileForm,
      [name]: value,
    })
  }

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    // In a real app, you would call an API to update the password
    alert("Password updated successfully!")
    setShowPasswordModal(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would call an API to update the profile
    setUserData({
      ...userData,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
    })

    setEditMode(false)
    alert("Profile updated successfully!")
  }

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    navigate("/")
    alert("Logged out successfully!")
  }

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500 text-blue-100"
      case "confirmed":
        return "bg-green-500 text-green-100"
      case "cancelled":
        return "bg-red-500 text-red-100"
      default:
        return "bg-gray-500 text-gray-100"
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Clock size={16} />
      case "confirmed":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      default:
        return null
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
          Loading profile...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
            {/* Profile Image */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-lg"
              >
                <img
                  src={userData.profileImage || "/placeholder.svg"}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full shadow-lg"
              >
                <Edit size={16} className="text-white" />
              </motion.button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-gray-300 mb-4">Member since {userData.memberSince}</p>

              {editMode ? (
                <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-red-500 rounded-lg font-medium"
                    >
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-700 rounded-lg font-medium"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="text-red-400" size={18} />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-red-400" size={18} />
                    <span>{userData.phone}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMode(true)}
                    className="mt-4 px-4 py-2 bg-gray-700 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Profile
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex border-b border-gray-700 mb-8"
        >
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
              activeTab === "bookings" ? "text-red-500 border-b-2 border-red-500" : "text-gray-300 hover:text-white"
            }`}
          >
            <History size={18} />
            Booking History
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
              activeTab === "settings" ? "text-red-500 border-b-2 border-red-500" : "text-gray-300 hover:text-white"
            }`}
          >
            <Settings size={18} />
            Account Settings
          </motion.button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 gap-6">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Movie Image */}
                      <div className="md:w-1/4 lg:w-1/5">
                        <div className="relative h-48 md:h-full">
                          <img
                            src={booking.movieImage || "/placeholder.svg"}
                            alt={booking.movieTitle}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent md:bg-gradient-to-l"></div>
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusBadge(booking.status)}`}
                          >
                            {getStatusIcon(booking.status)}
                            <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{booking.movieTitle}</h3>
                            <p className="text-gray-400 text-sm">Booking ID: {booking.id}</p>
                          </div>
                          <div className="mt-2 md:mt-0 text-right">
                            <p className="font-bold">${booking.totalAmount.toFixed(2)}</p>
                            <p className="text-gray-400 text-sm">Booked on {booking.bookingDate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="text-red-400" size={16} />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="text-red-400" size={16} />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="text-red-400" size={16} />
                            <span>{booking.hall}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-300 text-sm mb-2">Seats</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.seats.map((seat) => (
                              <span key={seat} className="inline-block px-2 py-1 bg-gray-700 rounded-md text-xs">
                                {seat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {booking.status === "cancelled" && (
                          <div className="mb-4 text-gray-400 text-sm">
                            <p>Cancellation reason: {booking.cancellationReason}</p>
                          </div>
                        )}

                        <div className="flex justify-end">
                          {booking.status === "upcoming" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-red-500 rounded-lg text-sm font-medium flex items-center gap-2"
                              onClick={() =>
                                navigate(`/confirmation?movieId=${booking.movieId}&seats=${booking.seats.join(",")}`)
                              }
                            >
                              <Ticket size={16} />
                              View Ticket
                            </motion.button>
                          )}

                          {booking.status === "confirmed" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gray-700 rounded-lg text-sm font-medium flex items-center gap-2"
                              onClick={() => navigate(`/movie/${booking.movieId}`)}
                            >
                              <Eye size={16} />
                              View Movie
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Account Settings */}
              <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="text-red-400" size={20} />
                      <span>Change Password</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="text-red-400" size={20} />
                      <span>Logout</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold mb-6">Preferences</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Favorite Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.preferences.favoriteGenres.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-red-500 bg-opacity-20 border border-red-500 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Preferred Cinemas</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.preferences.preferredCinemas.map((cinema) => (
                        <span key={cinema} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                          {cinema}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          defaultChecked={userData.preferences.notifications}
                        />
                        <div className="block bg-gray-700 w-14 h-8 rounded-full"></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            userData.preferences.notifications ? "transform translate-x-6 bg-red-500" : ""
                          }`}
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-300">
                        Receive email notifications about new releases and offers
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-6">Change Password</h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 bg-gray-700 rounded-lg font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-red-500 rounded-lg font-medium"
                  >
                    Update Password
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile

