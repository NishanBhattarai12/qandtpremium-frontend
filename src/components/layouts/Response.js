import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Response = ({title, message, success}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            aria-label="Close"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="text-center">
          <div
            className={`inline-block ${
              isAnimated ? "animate-bounce" : ""
            } transition-all duration-500 ease-in-out transform`}
          >
            {success ? (
              <FaCheckCircle
                className="text-green-500 mx-auto mb-4"
                size={64}
                aria-hidden="true"
              />
            ) : (
              <IoMdClose
                className="text-red-500 mx-auto mb-4"
                size={64}
                aria-hidden="true"
              />
            )  
            }
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Response;
