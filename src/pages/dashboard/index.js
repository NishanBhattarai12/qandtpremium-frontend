import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';
import { setTokens } from '@/store/authSlice';
import { FaUser, FaPlane, FaFileAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Dashboard = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [flightsData, setFlightsData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const [activeContent, setActiveContent] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    let err = false;
    if ((formData.password || formData.confirmPassword) && (formData.password !== formData.confirmPassword)) {
      setPasswordError('Passwords do not match');
      err = true;
    }
    if (formData.name == '') {
      err = true;
      setNameError('Name is required');
    }
    if (err) {
      return;
    }

    setNameError('');
    setPasswordError('');
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/change-profile-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        dispatch(setTokens({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
              name: formData.name,
              email: user.email,
              id: user.id
            }
          }));
        setSuccessMessage('Profile updated successfully');
      } else {
        setErrorMessage('Profile update failed');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Profile update failed');
    }
  };

  const taxReturnsData = [
    { year: "2022", status: "Submitted", refundAmount: 1500 },
    { year: "2021", status: "Processed", refundAmount: 2200 },
    { year: "2020", status: "Processed", refundAmount: 1800 },
    { year: "2019", status: "Processed", refundAmount: 2000 },
    { year: "2018", status: "Processed", refundAmount: 1700 }
  ];

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/flights/user-flights`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch flights data');
        }

        const flightsData = await response.json();
        setFlightsData(flightsData);
      } catch (error) {
        console.error('An error occurred while fetching flights data:', error);
      }
    };

    fetchFlightsData();
  }, []);

  useEffect(() => {
    const { content } = router.query;
    if(content != 'flights' && content != 'tax' && content != 'profile' && content != 'change-profile-details') {
      setActiveContent('profile');
    } else {
      setActiveContent(content);
    }
  }, [router.query]);

  const renderContent = () => {
    switch (activeContent) {
      case "profile":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl text-gray-700 font-bold">My Profile</h2>
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <button
              className="bg-[#33AE64] hover:bg-[#299755] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
              onClick={() => {
                setActiveContent("change-profile-details");
              }}
            >
              <FaEdit className="text-white" />
              <span>Change Profile Details</span>
            </button>
          </div>
        );
        case "change-profile-details":
          return (
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-700 font-bold">Change Profile Details</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
                    New Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#33AE64] hover:bg-[#299755] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </form>

              {errorMessage && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {successMessage}
                </div>
              )}
            </div>
          );
      case "flights":
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedFlights = flightsData.slice(startIndex, startIndex + itemsPerPage);
        return (
          <div className="space-y-4">
            <h2 className="text-2xl text-gray-700 font-bold">My Flights Booking</h2>
            {paginatedFlights.map((flight, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between flex-wrap">
                    <img src={flight.logo_url} alt={flight.airline} className="h-8 mb-2 sm:mb-0" />
                    <span className="text-lg text-gray-700 font-semibold mb-2 sm:mb-0">{flight.airline}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${flight.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                      {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium text-gray-600">{flight.departure_location}</p>
                    </div>
                    <FaPlane className="text-blue-500 my-2 sm:my-0 transform rotate-90 sm:rotate-0" />
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium text-gray-600">{flight.arrival_location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-medium text-gray-600">{new Date(flight.departure_time).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="font-medium text-gray-600">{new Date(flight.arrival_time).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Flight</p>
                      <p className="font-medium text-gray-600">{flight.flight_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Aircraft</p>
                      <p className="font-medium text-gray-600">{flight.airplane_name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Booking Date</p>
                      <p className="font-medium text-gray-600">{new Date(flight.booking_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium text-green-600">${flight.price}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Payment ID: {flight.stripe_payment_id}</p>
                </div>
              </div>
            ))}
            {renderPagination(flightsData.length)}
          </div>
        );
      case "tax":
        const taxStartIndex = (currentPage - 1) * itemsPerPage;
        const paginatedTaxReturns = taxReturnsData.slice(taxStartIndex, taxStartIndex + itemsPerPage);
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Tax Returns</h2>
            {paginatedTaxReturns.map((taxReturn, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">{taxReturn.year} Tax Return</p>
                <p>Status: {taxReturn.status}</p>
                <p>Refund Amount: ${taxReturn.refundAmount}</p>
              </div>
            ))}
            {renderPagination(taxReturnsData.length)}
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Welcome! Select a topic to view details.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 bg-gray-50 p-6 space-y-4">
            <button
              className={`w-full flex items-center justify-start space-x-3 p-3 rounded-lg transition duration-300 ${
                activeContent === "profile" || activeContent == "change-profile-details"
                  ? "bg-[#64AF33] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveContent("profile");
                setCurrentPage(1);
              }}
              aria-label="View My Profile"
            >
              <FaUser className="text-xl" />
              <span className="text-gray-700">My Profile</span>
            </button>
            <button
              className={`w-full flex items-center justify-start space-x-3 p-3 rounded-lg transition duration-300 ${
                activeContent === "flights"
                  ? "bg-[#64AF33] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveContent("flights");
                setCurrentPage(1);
              }}
              aria-label="View My Flights Booking"
            >
              <FaPlane className="text-xl" />
              <span className="text-gray-700">My Flights Booking</span>
            </button>
            <button
              className={`w-full flex items-center justify-start space-x-3 p-3 rounded-lg transition duration-300 ${
                activeContent === "tax"
                  ? "bg-[#64AF33] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveContent("tax");
                setCurrentPage(1);
              }}
              aria-label="View My Tax Returns"
            >
              <FaFileAlt className="text-xl" />
              <span className="text-gray-700">My Tax Returns</span>
            </button>
          </div>
          <div className="w-full sm:w-2/3 p-6 transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;