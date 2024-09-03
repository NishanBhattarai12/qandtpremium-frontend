import React, { useState } from 'react';
import { FaPlane } from 'react-icons/fa'; // Import flight icon

const SearchFlight = () => {
  // State for number of adults and children
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  // Handler for incrementing and decrementing adults and children
  const handleIncrement = (type) => {
    if (type === 'adults') setAdults(adults + 1);
    if (type === 'children') setChildren(children + 1);
  };

  const handleDecrement = (type) => {
    if (type === 'adults' && adults > 0) setAdults(adults - 1);
    if (type === 'children' && children > 0) setChildren(children - 1);
  };

  return (
    <div>
      {/* Full-Width Background Image */}
      <div className="relative w-full h-[800px] bg-cover bg-center" style={{ backgroundImage: 'url(/ticketbackground.jpg)' }}>
        {/* Centered Search Form */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* From Field */}
          <div className="mb-4 w-full max-w-lg">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter airport or city"
            />
          </div>

          {/* To Field */}
          <div className="mb-4 w-full max-w-lg">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <input
              type="text"
              id="to"
              name="to"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter airport or city"
            />
          </div>

          {/* Number of Passengers */}
          <div className="mb-6 flex flex-col items-start w-full max-w-lg">
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
              Passengers
            </label>
            <div className="flex space-x-8 mb-4">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleDecrement('adults')}
                  className="bg-gray-200 text-gray-800 p-2 rounded"
                >
                  -
                </button>
                <span className="mx-2 text-lg">{adults} Adults</span>
                <button
                  type="button"
                  onClick={() => handleIncrement('adults')}
                  className="bg-gray-200 text-gray-800 p-2 rounded"
                >
                  +
                </button>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleDecrement('children')}
                  className="bg-gray-200 text-gray-800 p-2 rounded"
                >
                  -
                </button>
                <span className="mx-2 text-lg">{children} Children</span>
                <button
                  type="button"
                  onClick={() => handleIncrement('children')}
                  className="bg-gray-200 text-gray-800 p-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-lg">
            <button
              type="submit"
              className="relative w-full bg-[#64AE33] text-white py-2 px-6 rounded-md flex items-center justify-center space-x-2 overflow-hidden transition-all duration-300 hover:scale-110"
            >
              <FaPlane className="text-xl" />
              <span>Search Flights</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
