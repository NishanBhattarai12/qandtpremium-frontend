import Link from 'next/link';
import React from 'react';

const OurService = () => {
  return (
    <div>
      <div className="bg-[#64AE33] py-8 text-center">
        <h1 className="text-white text-4xl font-bold">Our Services</h1>
      </div>

      <div className="flex flex-col items-center py-12 px-4">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center space-y-4">
            <img
              src="/Tax-Returns.jpg"
              alt="Service Image 1"
              className="w-full md:w-[300px] h-[300px] object-cover shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-xl font-semibold">Tax Return</h3>
            <Link href="/tax-return">
              <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Apply Now...</button>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <img
              src="/Tourism.jpg"
              alt="Service Image 2"
              className="w-full md:w-[300px] h-[300px] object-cover shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-xl font-semibold">Flight Service</h3>
            <Link href="/search-flight">
              <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Book Now...</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#64AE33] py-8 text-center mt-12">
        <h2 className="text-white text-3xl font-bold">Other Advisory Service</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-12">
        <div className="text-center space-y-4">
          <img
            src="/property.jpg"
            alt="Advisory Service Image 1"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold h-14">INBOUND INVESTMENT StRUCTURE</h3>
          <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Read More...</button>
        </div>

        <div className="text-center space-y-4">
          <img
            src="/travel.jpg"
            alt="Advisory Service Image 2"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold h-14">HOSPITALITY AND TOURISM</h3>
          <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Read More...</button>
        </div>

        <div className="text-center space-y-4">
          <img
            src="/investment.jpg"
            alt="Advisory Service Image 3"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold h-14">PROPERTY INVESTMENT</h3>
          <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Read More...</button>
        </div>

        <div className="text-center space-y-4">
          <img
            src="/target.jpg"
            alt="Advisory Service Image 4"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold h-14">BUSINESS ADVICE AND CORPORATE ADVICE</h3>
          <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Read More...</button>
        </div>
      </div>
    </div>
  );
};

export default OurService;
