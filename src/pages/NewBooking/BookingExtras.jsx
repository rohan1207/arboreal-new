import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const BookingExtras = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { room, searchData, bookingDetails, personalInfo } = location.state || {};

  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [totalExtrasCharge, setTotalExtrasCharge] = useState(0);

  // Fetch available extras
  useEffect(() => {
    if (!room || !searchData || !bookingDetails || !personalInfo) {
      navigate('/availability');
      return;
    }

    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/booking/extras`);
      if (response.data.success) {
        setExtras(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching extras:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle extra selection
  const handleExtraToggle = (extraId) => {
    setSelectedExtras(prev => {
      const newSelected = { ...prev };
      if (newSelected[extraId]) {
        delete newSelected[extraId];
      } else {
        newSelected[extraId] = {
          quantity: 1
        };
      }
      return newSelected;
    });
  };

  // Handle quantity change
  const handleQuantityChange = (extraId, quantity) => {
    if (quantity < 1) return;
    setSelectedExtras(prev => ({
      ...prev,
      [extraId]: {
        ...prev[extraId],
        quantity: parseInt(quantity)
      }
    }));
  };

  // Calculate total extras cost
  useEffect(() => {
    if (Object.keys(selectedExtras).length === 0) {
      setTotalExtrasCharge(0);
      return;
    }

    calculateExtras();
  }, [selectedExtras]);

  const calculateExtras = async () => {
    try {
      setCalculating(true);

      const extraChargeIds = Object.keys(selectedExtras).join(',');
      const totalExtraItems = Object.values(selectedExtras)
        .map(extra => extra.quantity)
        .join(',');

      const response = await axios.post(`${API_BASE_URL}/api/booking/calculate-extras`, {
        checkInDate: bookingDetails.checkIn,
        checkOutDate: bookingDetails.checkOut,
        extraChargeId: extraChargeIds,
        totalExtraItem: totalExtraItems
      });

      if (response.data.success) {
        setTotalExtrasCharge(response.data.data.totalCharge);
      }
    } catch (error) {
      console.error('Error calculating extras:', error);
    } finally {
      setCalculating(false);
    }
  };

  const handleSkip = () => {
    navigate('/booking/payment', {
      state: {
        room,
        searchData,
        bookingDetails: {
          ...bookingDetails,
          extrasCharge: 0
        },
        personalInfo,
        selectedExtras: {}
      }
    });
  };

  const handleContinue = () => {
    // Prepare extras data for booking
    const extrasData = Object.entries(selectedExtras).reduce((acc, [extraId, data], index) => {
      acc[`Extra_${index + 1}`] = {
        ExtraChargeId: extraId,
        ChargeAdult: data.quantity.toString()
      };
      return acc;
    }, {});

    navigate('/booking/payment', {
      state: {
        room,
        searchData,
        bookingDetails: {
          ...bookingDetails,
          extrasCharge: totalExtrasCharge
        },
        personalInfo,
        selectedExtras: extrasData
      }
    });
  };

  if (!room || !searchData || !bookingDetails || !personalInfo) {
    return null;
  }

  const totalAmount = bookingDetails.totalPrice + totalExtrasCharge;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Select Date</span>
            </div>
            <div className="w-16 h-0.5 bg-green-600"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Personal Info</span>
            </div>
            <div className="w-16 h-0.5 bg-amber-600"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Extras & Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Extras Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Enhance Your Stay
              </h2>
              <p className="text-gray-600 mb-6">
                Add extra services to make your stay more comfortable (Optional)
              </p>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                  <p className="mt-4 text-gray-600">Loading available extras...</p>
                </div>
              ) : extras.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-4 text-gray-600 font-semibold">No extra services available at the moment</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Extra services (like spa, transport, welcome drinks) need to be configured in the hotel's booking system.
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Click "Skip" or "Continue to Payment" to proceed with your booking.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {extras.map((extra, index) => {
                    const isSelected = selectedExtras[extra.ExtraChargeId];
                    
                    return (
                      <motion.div
                        key={`${extra.ExtraChargeId}-${index}`}
                        whileHover={{ scale: 1.01 }}
                        className={`
                          border-2 rounded-lg p-6 cursor-pointer transition-all
                          ${isSelected ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}
                        `}
                        onClick={() => handleExtraToggle(extra.ExtraChargeId)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={!!isSelected}
                                onChange={() => {}}
                                className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">{extra.charge}</h3>
                                <p className="text-sm text-gray-600 mt-1">{extra.ShortCode}</p>
                                {extra.description && (
                                  <p className="text-sm text-gray-500 mt-2">{extra.description}</p>
                                )}
                                <div className="mt-2 text-sm text-gray-600">
                                  <span className="font-medium">Charge Rule:</span> {extra.ChargeRule}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-xl font-bold text-amber-600">
                              {room.currency_sign}{extra.Rate}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              per {extra.ChargeRule ? extra.ChargeRule.toLowerCase() : 'item'}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        {isSelected && extra.ChargeRule === 'PERQUANTITY' && (
                          <div className="mt-4 pt-4 border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quantity
                            </label>
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(extra.ExtraChargeId, isSelected.quantity - 1)}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-amber-600 hover:text-amber-600 transition-colors"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={isSelected.quantity}
                                onChange={(e) => handleQuantityChange(extra.ExtraChargeId, e.target.value)}
                                className="w-20 text-center border-2 border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              />
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(extra.ExtraChargeId, isSelected.quantity + 1)}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-amber-600 hover:text-amber-600 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t">
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <div className="space-x-4">
                  <button
                    onClick={handleSkip}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleContinue}
                    className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-xl font-serif font-bold mb-4">Booking Summary</h3>

              {/* Room Details */}
              <div className="mb-4 pb-4 border-b">
                <h4 className="font-semibold">{room.Room_Name}</h4>
                <p className="text-sm text-gray-600">{bookingDetails.nights} nights</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Room Rate</span>
                  <span className="font-semibold">
                    {room.currency_sign}{bookingDetails.totalPrice.toFixed(2)}
                  </span>
                </div>

                {Object.keys(selectedExtras).length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Extra Services</span>
                    <span className="font-semibold">
                      {calculating ? (
                        <span className="text-gray-400">Calculating...</span>
                      ) : (
                        `${room.currency_sign}${totalExtrasCharge.toFixed(2)}`
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Selected Extras List */}
              {Object.keys(selectedExtras).length > 0 && (
                <div className="mb-4 pb-4 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Selected Extras:</p>
                  <ul className="space-y-2">
                    {Object.entries(selectedExtras).map(([extraId, data]) => {
                      const extra = extras.find(e => e.ExtraChargeId === extraId);
                      return (
                        <li key={extraId} className="text-xs text-gray-600 flex justify-between">
                          <span>{extra?.charge}</span>
                          <span>×{data.quantity}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-amber-600">
                    {room.currency_sign}{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Guest Info */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">Guest Details:</p>
                <p className="font-semibold text-sm">
                  {personalInfo.title} {personalInfo.firstName} {personalInfo.lastName}
                </p>
                <p className="text-xs text-gray-600 mt-1">{personalInfo.email}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingExtras;
