import React, { useState } from 'react';
import { FaPlane } from 'react-icons/fa';
import Loader from '@/components/Loader';
import FlightInfo from '@/components/flights/FlightsInfo';

const SearchFlight = () => {
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState('');
  const [from_code, setFromCode] = useState('');
  const [to, setTo] = useState('');
  const [to_code, setToCode] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [flights, setFlights] = useState([]);

  const fetchSuggestions = async (query, setSuggestions) => {
    try {
      // read iata-codes.json file from public folder
      const response = await fetch('/iata-codes.json');
      const data = await response.json();
      const suggestions = data.airports.filter((item) => 
        item.city.toLowerCase().includes(query.toLowerCase()) &&
        item.iata_code !== from_code &&
        item.iata_code !== to_code
      );
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setFromCode('');
    if (value.length >= 1) {
      fetchSuggestions(value, setFromSuggestions);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setToCode('');
    if (value.length >= 1) {
      fetchSuggestions(value, setToSuggestions);
    } else {
      setToSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, setInputValue, setIATACode, setSuggestions) => {
    setInputValue(suggestion.name);
    setIATACode(suggestion.iata_code);
    setSuggestions([]);
  };

  const handleIncrement = (type) => {
    if (type === 'adults') setAdults(adults + 1);
    if (type === 'children') setChildren(children + 1);
  };

  const handleDecrement = (type) => {
    if (type === 'adults' && adults > 0) setAdults(adults - 1);
    if (type === 'children' && children > 0) setChildren(children - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/flights/search-flights?origin=${from_code}&destination=${to_code}&departure_date=${formattedDate}&adults=${adults}&children=${children}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error('Failed to search flights');
      }

      const result = await response.json();
      const rawFlights = []

      result.best_flights.forEach((flight) => {
        rawFlights.push(flight)
      });

      result.other_flights.forEach((flight) => {
        rawFlights.push(flight)
      });

      setFlights(rawFlights);

      console.log('Search results:', result);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  return (
    <div>
      <div className="relative w-full h-[800px] bg-cover bg-center" style={{ backgroundImage: 'url(/ticketbackground.jpg)' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <form onSubmit={handleSubmit} className='w-full max-w-lg'>
            <div className="relative mb-4 w-full max-w-lg">
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input
                type="text"
                id="from"
                name="from"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter city"
                value={from}
                onChange={handleFromChange}
              />
              {fromSuggestions.length > 0 && (
                <ul className="absolute w-full border border-gray-300 rounded-md mt-2 bg-white z-10 max-h-48 overflow-y-scroll">
                  {fromSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion, setFrom, setFromCode, setFromSuggestions)}
                    >
                      {suggestion.name} - {suggestion.city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative mb-4 w-full max-w-lg">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="text"
                id="to"
                name="to"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter city"
                value={to}
                onChange={handleToChange}
              />
              {toSuggestions.length > 0 && (
                <ul className="absolute w-full border border-gray-300 rounded-md mt-2 bg-white z-10 max-h-48 overflow-y-scroll">
                  {toSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion, setTo, setToCode, setToSuggestions)}
                    >
                      {suggestion.name} - {suggestion.city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

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

            <div className="w-full max-w-lg">
              <button
                type="submit"
                className="relative w-full bg-[#64AE33] text-white py-2 px-6 rounded-md flex items-center justify-center space-x-2 overflow-hidden transition-all duration-300 hover:scale-110"
              >
                <FaPlane className="text-xl" />
                <span>Search Flights</span>
              </button>
            </div>
          </form>
          
          {flights.length > 0 &&
            <>
              <h1 className="text-3xl font-bold mt-8">Search Results</h1>
              <div className='max-h-screen overflow-y-scroll'>
                {flights.map((flight, index) => (
                  <FlightInfo key={index} flight={flight} />
                ))}
              </div>
            </>
          }
        </div>
      </div>

      {loading &&
        <Loader />
      }
    </div>
  );
};

export default SearchFlight;
