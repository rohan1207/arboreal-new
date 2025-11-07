import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const BookingPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { room, searchData, bookingDetails, personalInfo, selectedExtras } = location.state || {};

  const [paymentGateways, setPaymentGateways] = useState([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Pay at Hotel');
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardType: 'Visa',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!room || !searchData || !bookingDetails || !personalInfo) {
      navigate('/availability');
      return;
    }

    fetchPaymentGateways();
  }, []);

  const fetchPaymentGateways = async () => {
    try {
      console.log('=== Fetching Payment Gateways ===');
      const response = await axios.get(`${API_BASE_URL}/api/booking/payment-gateways`);
      console.log('Payment Gateways Response:', response.data);
      
      if (response.data.success) {
        setPaymentGateways(response.data.data);
        console.log(`Found ${response.data.data.length} payment gateways`);
        // Auto-select first gateway if user chose Credit Card but hasn't picked a gateway yet
        if (response.data.data.length > 0 && !selectedGateway) {
          setSelectedGateway(response.data.data[0].paymenttypeunkid);
        }
      }
    } catch (error) {
      console.error('Error fetching payment gateways:', error);
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = async () => {
    // Validate
    if (selectedPaymentMode === 'Credit Card') {
      if (!cardDetails.cardNumber || !cardDetails.cardHolderName || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    setProcessing(true);

    try {
      // Prepare booking data matching ezeetechnosys exact format from API documentation
      const roomDetails = {
        // Ensure all ID and rate fields are strings as per API sample
        Rateplan_Id: String(room.roomrateunkid),
        Ratetype_Id: String(room.ratetypeunkid),
        Roomtype_Id: String(room.roomtypeunkid),
        baserate: String(
          room.room_rates_info.rack_rate ?? room.room_rates_info.avg_per_night_after_discount ?? "0"
        ),
        extradultrate: String(room.extra_adult_rates_info?.rack_rate ?? "0"),
        extrachildrate: String(room.extra_child_rates_info?.rack_rate ?? "0"),
        number_adults: String(searchData.adults),
        number_children: String(searchData.children || 0),
        Title: personalInfo.title || "",
        First_Name: String(personalInfo.firstName || ""),
        Last_Name: String(personalInfo.lastName || ""),
        Gender: personalInfo.gender || "",
        SpecialRequest: personalInfo.specialRequest || ""
      };

      // Only add ExtraChild_Age if there are children (MANDATORY if number_children is not zero)
      if (searchData.children > 0) {
        roomDetails.ExtraChild_Age = Array(searchData.children).fill("5").join(",");
      }

      const bookingPayload = {
        Room_Details: {
          Room_1: roomDetails
        },
        check_in_date: bookingDetails.checkIn,
        check_out_date: bookingDetails.checkOut,
        // Use empty string for Booking_Payment_Mode per API sample to avoid mismatched enum
        Booking_Payment_Mode: "",
        Email_Address: personalInfo.email,
        Source_Id: "",
        MobileNo: String(personalInfo.phone || ""),
        Address: personalInfo.address || "",
        State: personalInfo.state || "",
        Country: personalInfo.country || "",
        City: personalInfo.city || "",
        Zipcode: personalInfo.zipcode || "",
        Device: "WEB",
        Languagekey: "en"
      };

      // ONLY add ExtraCharge if there are valid extras with non-zero rates
      // Do NOT send if all extras have Rs0.0000
      const hasValidExtras = selectedExtras && 
                            Object.keys(selectedExtras).length > 0 && 
                            bookingDetails.extrasCharge > 0;
      
      if (hasValidExtras) {
        bookingPayload.ExtraCharge = selectedExtras;
      }

      // Add card details if payment mode is Credit Card (all fields mandatory per API doc)
      if (selectedPaymentMode === 'Credit Card') {
        const cardTypeMap = {
          'Visa': 'VISA',
          'MasterCard': 'MASTERCARD',
          'American Express': 'AMEX',
          'Discover': 'DISCOVER'
        };

        if (!cardDetails.cardNumber || !cardDetails.cardHolderName || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv || !cardDetails.cardType) {
          alert('Please fill in all card details (number, name, type, expiry, CVV).');
          setProcessing(false);
          return;
        }

        bookingPayload.CardDetails = {
          cc_cardnumber: String(cardDetails.cardNumber).trim(),
          cc_cardtype: cardTypeMap[cardDetails.cardType] || cardDetails.cardType.toUpperCase(),
          cc_expiremonth: String(cardDetails.expiryMonth).padStart(2, '0'),
          cc_expireyear: String(cardDetails.expiryYear),
          cvvcode: String(cardDetails.cvv),
          cardholdername: cardDetails.cardHolderName.trim()
        };
      }

      // Add payment gateway if payment mode is Credit Card
      if (selectedPaymentMode === 'Credit Card') {
        const gatewayId = selectedGateway || (paymentGateways?.[0]?.paymenttypeunkid || null);
        if (gatewayId) {
          bookingPayload.paymenttypeunkid = gatewayId;
        } else {
          console.warn('Credit Card selected but no payment gateway available/selected');
        }
      }

      console.log('Submitting booking:', bookingPayload);

      // Submit booking
      const response = await axios.post(`${API_BASE_URL}/api/booking/create`, bookingPayload);

      if (response.data.success) {
        // Navigate to confirmation page
        navigate('/booking-confirmation', {
          state: {
            reservationNo: response.data.data.ReservationNo,
            bookingDetails: {
              ...bookingPayload,
              room,
              searchData,
              Email_Address: personalInfo.email,
              MobileNo: personalInfo.phone,
              totalAmount: bookingDetails.totalPrice + (bookingDetails.extrasCharge || 0)
            }
          }
        });
      } else {
        alert(response.data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error array content:', JSON.stringify(error.response?.data?.error, null, 2));
      
      // Handle error array from ezeetechnosys
      let errorMessage = 'Booking failed. Please try again.';
      
      if (error.response?.data?.error && Array.isArray(error.response.data.error)) {
        // If error is an array, get the first error object
        const errorObj = error.response.data.error[0];
        errorMessage = errorObj?.Error_Message || errorObj?.error || JSON.stringify(errorObj);
        console.error('Parsed error message:', errorMessage);
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      const errorDetails = error.response?.data?.errorDetails;
      
      if (errorDetails) {
        alert(`Booking Failed\n\nError: ${errorMessage}\nCode: ${errorDetails.Error_Code}\n\nPlease check your booking details and try again.`);
      } else {
        alert(`Booking Failed\n\n${errorMessage}\n\nPlease check the console for more details.`);
      }
    } finally {
      setProcessing(false);
    }
  };

  if (!room || !searchData || !bookingDetails || !personalInfo) {
    return null;
  }

  const totalAmount = bookingDetails.totalPrice + (bookingDetails.extrasCharge || 0);
  const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => (currentYear + i).toString());

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
            <div className="w-16 h-0.5 bg-green-600"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Payment Details
              </h2>

              {/* Payment Mode Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Select Payment Mode</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-amber-600 transition-all">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="Pay at Hotel"
                      checked={selectedPaymentMode === 'Pay at Hotel'}
                      onChange={(e) => setSelectedPaymentMode(e.target.value)}
                      className="w-5 h-5 text-amber-600"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">Pay at Hotel</p>
                      <p className="text-sm text-gray-600">Pay when you check-in</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-amber-600 transition-all">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="Credit Card"
                      checked={selectedPaymentMode === 'Credit Card'}
                      onChange={(e) => setSelectedPaymentMode(e.target.value)}
                      className="w-5 h-5 text-amber-600"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Secure card payment</p>
                    </div>
                  </label>
                </div>
                
                {/* Info about payment gateways */}
                {paymentGateways.length === 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Note:</strong> Payment gateways (like Razorpay, PayU) are managed through ezeetechnosys. 
                      Currently, no online payment gateways are configured. Card details will be stored for manual processing.
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Gateways (if available) */}
              {paymentGateways.length > 0 && selectedPaymentMode === 'Credit Card' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Select Payment Gateway</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentGateways.map((gateway) => (
                      <button
                        key={gateway.paymenttypeunkid}
                        onClick={() => setSelectedGateway(gateway.paymenttypeunkid)}
                        className={`
                          p-4 border-2 rounded-lg text-left transition-all
                          ${selectedGateway === gateway.paymenttypeunkid 
                            ? 'border-amber-600 bg-amber-50' 
                            : 'border-gray-200 hover:border-amber-300'
                          }
                        `}
                      >
                        <p className="font-semibold">{gateway.paymenttype}</p>
                        <p className="text-sm text-gray-600">{gateway.shortcode}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Details Form */}
              {selectedPaymentMode === 'Credit Card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold">Card Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Type
                      </label>
                      <select
                        name="cardType"
                        value={cardDetails.cardType}
                        onChange={handleCardDetailsChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      >
                        {cardTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Card Holder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardHolderName"
                        value={cardDetails.cardHolderName}
                        onChange={handleCardDetailsChange}
                        placeholder="Name on card"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {/* Card Number */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {/* Expiry Month */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Month
                      </label>
                      <select
                        name="expiryMonth"
                        value={cardDetails.expiryMonth}
                        onChange={handleCardDetailsChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">Select Month</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>

                    {/* Expiry Year */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Year
                      </label>
                      <select
                        name="expiryYear"
                        value={cardDetails.expiryYear}
                        onChange={handleCardDetailsChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailsChange}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t">
                <button
                  onClick={() => navigate(-1)}
                  disabled={processing}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitBooking}
                  disabled={processing}
                  className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </button>
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
              <h3 className="text-xl font-serif font-bold mb-4">Final Summary</h3>

              {/* Room Details */}
              <div className="mb-4 pb-4 border-b">
                <h4 className="font-semibold">{room.Room_Name}</h4>
                <p className="text-sm text-gray-600">{bookingDetails.nights} nights</p>
              </div>

              {/* Guest Info */}
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-1">Guest:</p>
                <p className="font-semibold text-sm">
                  {personalInfo.title} {personalInfo.firstName} {personalInfo.lastName}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Room Rate</span>
                  <span className="font-semibold">
                    {room.currency_sign}{bookingDetails.totalPrice.toFixed(2)}
                  </span>
                </div>

                {bookingDetails.extrasCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Extra Services</span>
                    <span className="font-semibold">
                      {room.currency_sign}{bookingDetails.extrasCharge.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total to Pay</span>
                  <span className="text-amber-600">
                    {room.currency_sign}{totalAmount.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Payment Mode: {selectedPaymentMode}
                </p>
              </div>

              {/* Important Notes */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Check-in time is after {room.check_in_time || '2:00 PM'} and check-out time is before {room.check_out_time || '12:00 PM'}.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
