import React, { useState } from "react";
import { FaPlane, FaUser, FaChild, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format } from 'date-fns';
import { useDispatch } from "react-redux";
import { addBooking } from "@/store/bookingSlice";
import { useRouter } from 'next/router';

const FlightSearchForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    adults: 1,
    children: 0,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [formSubmissionError, setFormSubmissionError] = useState(null);

  const locations = {
    'Sydney': '/m/06y57',
    'Melbourne': '/m/0chgzm',
    'Brisbane': '/m/01b8jj',
    'Perth': '/m/062qg',
    'Adelaide': '/m/0mgp',
    'Gold Coast': '/m/0g4g7',
    'Canberra': '/m/0dp90',
    'Newcastle': '/m/0dv9v',
    'Wollongong': '/m/01j12w',
    'Sunshine Coast': '/m/02vmlw',
    'Hobart': '/m/03kjh',
    'Geelong': '/m/0g34_',
    'Townsville': '/m/01q58t',
    'Cairns': '/m/01sgmd',
    'Darwin': '/m/02bm8',
    'Toowoomba': '/m/02ckm7',
    'Ballarat': '/m/01kq5',
    'Bendigo': '/m/0gxbl',
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const handleBookNow = async (flight) => {
    try {
      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRIP_SECRET_KEY}`
        },
        body: new URLSearchParams({
          amount: flight.price,
          currency: "usd"
        })
      });

      const data = await response.json();
      flight.clientSecret = data.client_secret;

      dispatch(addBooking(flight));
      router.push('/search-flight/booking');
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.from) newErrors.from = "Please select a departure location";
    if (!formData.to) newErrors.to = "Please select a destination";
    if (formData.from === formData.to) newErrors.to = "Destination must be different from departure";
    if (formData.adults < 1) newErrors.adults = "At least one adult is required";
    if (formData.children < 0) newErrors.children = "Number of children cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/flights/search-flights?origin=${formData.from}&destination=${formData.to}&departure_date=${formattedDate}&adults=${formData.adults}&children=${formData.children}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setIsLoading(false);

        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }

        const result = await response.json();
        const flights = [];
        let i = 0;

        for (i = 0; i < result.best_flights.length; i++) {
          flights.push({
            id: i + 1,
            logo: result.best_flights[i].flights[0].airline_logo,
            airline: result.best_flights[i].flights[0].airline,
            price: result.best_flights[i].price,
            departure: format(new Date(result.best_flights[i].flights[0].departure_airport.time), 'MMM dd, yyyy hh:mm a'),
            arrival: format(new Date(result.best_flights[i].flights[0].arrival_airport.time), 'MMM dd, yyyy hh:mm a'),
          });
        }

        for (i = i; i < result.other_flights.length; i++) {
          flights.push({
            id: i + 1,
            logo: result.other_flights[i].flights[0].airline_logo,
            airline: result.other_flights[i].flights[0].airline,
            price: result.other_flights[i].price,
            departure: format(new Date(result.other_flights[i].flights[0].departure_airport.time), 'MMM dd, yyyy hh:mm a'),
            arrival:  format(new Date(result.other_flights[i].flights[0].arrival_airport.time), 'MMM dd, yyyy hh:mm a'),
          });
        }

        setSearchResults(flights);
        setCurrentPage(1);
      } catch (error) {
        setFormSubmissionError(error.message);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-4xl mt-16 mb-36 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#64AE33]">Flight Search</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">
              From
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPlane className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="from"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                aria-describedby="from-error"
              >
                <option value="">Select departure</option>
                {Object.entries(locations).map(([name, kgmid]) => (
                  <option key={kgmid} value={kgmid}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {errors.from && (
              <p className="mt-2 text-sm text-red-600" id="from-error">
                {errors.from}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">
              To
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPlane className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="to"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                aria-describedby="to-error"
              >
                <option value="">Select destination</option>
                {Object.entries(locations).map(([name, kgmid]) => (
                  <option key={kgmid} value={kgmid}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {errors.to && (
              <p className="mt-2 text-sm text-red-600" id="to-error">
                {errors.to}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
              Number of Adults
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="adults"
                id="adults"
                min="1"
                value={formData.adults}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                aria-describedby="adults-error"
              />
            </div>
            {errors.adults && (
              <p className="mt-2 text-sm text-red-600" id="adults-error">
                {errors.adults}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-700">
              Number of Children
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaChild className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="children"
                id="children"
                min="0"
                value={formData.children}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                aria-describedby="children-error"
              />
            </div>
            {errors.children && (
              <p className="mt-2 text-sm text-red-600" id="children-error">
                {errors.children}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#64AE33] hover:bg-[#56982B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56982B] transition duration-150 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Searching...
              </>
            ) : (
              "Search Flights"
            )}
          </button>
        </div>
      </form>
      {formSubmissionError && (
        <p className="mt-4 text-red-600 text-center">{formSubmissionError}</p>
      )}
      {searchResults.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 relative z-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Search Results</h3>
          <div className="space-y-4">
            {currentItems.map((flight) => (
              <div key={flight.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={flight.logo} alt={`${flight.airline} logo`} className="w-12 h-12 mr-4" />
                  <div>
                    <p className="text-lg font-medium text-[#33AE64]">{flight.airline}</p>
                    <p className="text-sm text-gray-600">Departure: {flight.departure} | Arrival: {flight.arrival}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${flight.price}</p>
                  <button onClick={() => handleBookNow(flight)} className="mt-2 px-4 py-2 bg-[#33AE64] text-white rounded-md hover:bg-[#299755] transition duration-150 ease-in-out">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 justify-items-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm flex-wrap" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative mt-2 inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`relative mt-2 inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(searchResults.length / itemsPerPage)}
                className="relative mt-2 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <FaChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;