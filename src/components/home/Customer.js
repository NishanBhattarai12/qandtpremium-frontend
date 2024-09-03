import React from 'react';
import { FaUser, FaTrophy, FaSpinner } from 'react-icons/fa';

function Customer() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          
          {/* Customer Icon with Text */}
          <div className="text-center">
            <FaUser className="text-green-600 text-6xl mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700 max-w-xs">
              Fulfilling the customer need is our priority and goal.
            </p>
          </div>

          {/* #1 Icon with Text */}
          <div className="text-center">
            <FaTrophy className="text-yellow-500 text-6xl mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700 max-w-xs">
              One of the topmost service brands available across Australia.
            </p>
          </div>

          {/* Loading Icon with 1000+ Customers */}
          <div className="text-center">
            <FaSpinner className="text-blue-500 text-6xl mx-auto mb-4 animate-spin" />
            <p className="text-lg font-semibold text-gray-700 max-w-xs">
              1000+ customers all across Melbourne.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Customer;
