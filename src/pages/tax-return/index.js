import React from 'react';

const TaxReturn = () => {
  return (
    <div className="flex flex-col min-h-screen">
     

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Half - Image with Text Overlay */}
        <div className="w-full md:w-1/2 relative">
          <img
            src="/taxbackground.jpg" // Replace with your image path
            alt="Tax Return Image"
            className="w-[800px] h-[900px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <h2 className="text-white text-8xl md:text-8xl font-bold text-center p-4">
              GET YOUR TAX RETURN AT JUST $199
            </h2>
          </div>
        </div>

        {/* Right Half - Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Tax Return Form</h2>
            <form className="space-y-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Current Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Current Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Tax Number or ABN Number */}
              <div>
                <label htmlFor="taxNumber" className="block text-sm font-medium text-gray-700">
                  Tax Number or ABN Number
                </label>
                <input
                  type="text"
                  id="taxNumber"
                  name="taxNumber"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Message Box with Bank Details */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (Bank Details)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#64AE33] text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default TaxReturn;
