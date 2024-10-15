import React, { useState } from 'react';

const Welcome = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mt-4 mb-4 text-gray-700">
        Welcome to Q and T Premium: Elevating Your Experience
      </h2>
      <p className="text-lg text-gray-600">
        At Q and T Premium, we are committed to delivering top-tier services that meet the diverse needs of our valued clients. Our mission is to provide a seamless and enriching experience through a variety of premium services that cater to both personal and business requirements.
        {isExpanded && (
          <>
            <br />
            From expert advisory solutions to comprehensive service packages, Q and T Premium is your trusted partner for success. We believe in combining quality and excellence to offer services that not only meet your expectations but exceed them. Whether it's enhancing the security of your property, optimizing your investments, or managing your assets with precision, Q and T Premium is here to support you every step of the way.
            <br />
            Our team of professionals is dedicated to ensuring your satisfaction by delivering personalized solutions that are tailored to your specific needs. With a focus on innovation and customer care, we are here to transform your challenges into opportunities. Trust Q and T Premium for all your premium service needs and experience the difference that quality and dedication can make.
          </>
        )}
        <a
          href="#"
          className="text-[#64AE33] hover:underline ml-2"
          onClick={(e) => {
            e.preventDefault();
            toggleReadMore();
          }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </a>
      </p>
    </div>
  );
};

export default Welcome;