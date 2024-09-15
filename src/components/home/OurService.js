import Link from 'next/link';
import React from 'react';

const OurService = () => {
  return (
    <div>
      {/* Green Banner */}
      <div className="bg-[#64AE33] py-12 text-center">
        <h1 className="text-white text-4xl font-bold">OUR SERVICES</h1>
      </div>

      {/* Centered Images with Two Buttons Below Each */}
      <div className="flex flex-col items-center py-12"> {/* Added extra padding top and bottom */}
        <div className="flex space-x-8"> {/* Increased space between images */}
          {/* First Image with Buttons */}
          <div className="flex flex-col items-center space-y-4"> {/* Added space between image and buttons */}
            <img
              src="/Tax-Returns.jpg" // Replace with your image paths
              alt="Service Image 1"
              className="w-[300px] h-[300px] object-cover shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
                <h3 className="text-xl font-semibold">Tax Return</h3>
                <Link href="/TaxReturn">
              <button className="bg-[#64AE33] text-white py-2 px-4 rounded">Apply Now...</button>
              </Link>
          </div>

          {/* Second Image with Buttons */}
          <div className="flex flex-col items-center space-y-4"> {/* Added space between image and buttons */}
            <img
              src="/Tourism.jpg" // Replace with your image paths
              alt="Service Image 2"
              className="w-[300px] h-[300px] object-cover shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
            
            <h3 className="text-xl font-semibold">Flight Service</h3>
            <Link href='/search-flight'>
              <button className="bg-[#64AE33] text-white py-2 px-4 rounded">Book Now...</button>
              </Link>
          </div>
        </div>
      </div>

      {/* Green Banner for Our Advisory Service */}
      <div className="bg-[#64AE33] py-12 text-center mt-12"> {/* Added margin-top for space */}
        <h2 className="text-white text-3xl font-bold">Other Advisory Service</h2>
      </div>

      {/* Advisory Service Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-12"> {/* Increased gap between columns */}
        {/* First Advisory Image and Details */}
        <div className="text-center space-y-4"> {/* Added space between image, heading, and button */}
          <img
            src="/property.jpg" // Replace with your image paths
            alt="Advisory Service Image 1"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold">INBOUND INVESTMENT StRUCTURE</h3>
          <button className="bg-[#64AE33] text-white py-2 px-4 rounded">Read More...</button>
        </div>

        {/* Second Advisory Image and Details */}
        <div className="text-center space-y-4"> {/* Added space between image, heading, and button */}
          <img
            src="/travel.jpg" // Replace with your image paths
            alt="Advisory Service Image 2"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold">HOSPITALITY AND TOURISM</h3>
          <button className="bg-[#64AE33] text-white py-2 px-4 rounded">Read More...</button>
        </div>

        {/* Third Advisory Image and Details */}
        <div className="text-center space-y-4"> {/* Added space between image, heading, and button */}
          <img
            src="/investment.jpg" // Replace with your image paths
            alt="Advisory Service Image 3"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold">PROPERTY INVESTMENT</h3>
          <button className="bg-[#64AE33] text-white py-2 px-4 rounded">Read More...</button>
        </div>

        {/* Fourth Advisory Image and Details */}
        <div className="text-center space-y-4"> {/* Added space between image, heading, and button */}
          <img
            src="/target.jpg" // Replace with your image paths
            alt="Advisory Service Image 4"
            className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="text-xl font-semibold">BUSINESS ADVICE AND CORPORATE ADVICE</h3>
          <button className="bg-[#64AE33] text-white py-2 px-4 rounded">Read More...</button>
        </div>
      </div>
    </div>
  );
};

export default OurService;
