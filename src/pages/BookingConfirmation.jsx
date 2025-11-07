import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiPhone, FiCalendar, FiMapPin, FiUser, FiHome } from "react-icons/fi";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservationNo, bookingDetails } = location.state || {};

  if (!reservationNo || !bookingDetails) {
    navigate("/");
    return null;
  }

  const { room, searchData, Email_Address, MobileNo } = bookingDetails;
  const guestName = `${bookingDetails.Room_Details.Room_1.First_Name} ${bookingDetails.Room_Details.Room_1.Last_Name}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: 'long',
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(searchData.checkIn);
    const checkOut = new Date(searchData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-[#f5f3ed] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FiCheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 font-light text-lg">
            Thank you for choosing The Arboreal Resort
          </p>
        </motion.div>

        {/* Reservation Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 shadow-lg mb-8 text-center"
        >
          <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
            Reservation Number
          </p>
          <p className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            {reservationNo}
          </p>
          <p className="text-sm text-gray-600">
            Please save this number for your records
          </p>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-serif text-gray-900 mb-6">
            Booking Details
          </h2>

          <div className="space-y-6">
            {/* Guest Info */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiUser className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Guest Name</p>
                <p className="text-lg text-gray-900 font-medium">{guestName}</p>
              </div>
            </div>

            {/* Room Info */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiHome className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Room Type</p>
                <p className="text-lg text-gray-900 font-medium">
                  {room.Room_Name || room.Roomtype_Name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {searchData.adults} Adult{searchData.adults > 1 ? 's' : ''}
                  {searchData.children > 0 && `, ${searchData.children} Child${searchData.children > 1 ? 'ren' : ''}`}
                </p>
              </div>
            </div>

            {/* Check-in */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCalendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Check-in</p>
                <p className="text-lg text-gray-900 font-medium">{formatDate(searchData.checkIn)}</p>
                <p className="text-sm text-gray-600">After 2:00 PM</p>
              </div>
            </div>

            {/* Check-out */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCalendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Check-out</p>
                <p className="text-lg text-gray-900 font-medium">{formatDate(searchData.checkOut)}</p>
                <p className="text-sm text-gray-600">Before 11:00 AM</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCalendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Total Stay</p>
                <p className="text-lg text-gray-900 font-medium">
                  {calculateNights()} Night{calculateNights() > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-serif text-gray-900 mb-6">
            Confirmation Sent To
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiMail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">{Email_Address}</p>
              </div>
            </div>

            {MobileNo && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Phone</p>
                  <p className="text-gray-900">{MobileNo}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Resort Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 text-white p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-serif mb-6">
            Resort Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FiMapPin className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-300 mb-1">Address</p>
                <p className="text-white">
                  The Arboreal, Pvt. Road,<br />
                  Gevhande Apati, Lonavala,<br />
                  Maharashtra 412108
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300 mb-1">Contact</p>
                <p className="text-white">+91 777 50 23535 | +91 976 78 55988</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300 mb-1">Email</p>
                <p className="text-white">reservations@thearborealresort.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8"
        >
          <h3 className="text-lg font-serif text-gray-900 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Check-in time is after 2:00 PM and check-out is before 11:00 AM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Please carry a valid government ID proof at the time of check-in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Early check-in and late check-out are subject to availability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>A confirmation email with your booking details has been sent</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider font-medium"
          >
            Print Confirmation
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 text-sm uppercase tracking-wider font-medium"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
