import React, { useState } from "react";
import { FaUser, FaPlane, FaFileAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const flightsData = [
    { destination: "Paris", date: "July 15, 2023", flightNumber: "AF1234" },
    { destination: "Tokyo", date: "August 22, 2023", flightNumber: "JL5678" },
    { destination: "New York", date: "September 10, 2023", flightNumber: "UA9012" },
    { destination: "London", date: "October 5, 2023", flightNumber: "BA3456" },
    { destination: "Sydney", date: "November 20, 2023", flightNumber: "QF7890" }
  ];

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

  const renderContent = () => {
    switch (activeContent) {
      case "profile":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>Location: New York, USA</p>
          </div>
        );
      case "flights":
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedFlights = flightsData.slice(startIndex, startIndex + itemsPerPage);
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Flights Booking</h2>
            {paginatedFlights.map((flight, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">Flight to {flight.destination}</p>
                <p>Date: {flight.date}</p>
                <p>Flight Number: {flight.flightNumber}</p>
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
                activeContent === "profile"
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
              <span>My Profile</span>
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
              <span>My Flights Booking</span>
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
              <span>My Tax Returns</span>
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