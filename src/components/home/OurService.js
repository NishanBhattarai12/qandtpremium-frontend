import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const OurService = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourservices/contents`);
      const result = await response.json();
      setData(result[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <h3 className="text-xl font-semibold text-gray-700">Tax Return</h3>
            <Link href="/tax-return">
              <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Apply Now</button>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <img
              src="/Tourism.jpg"
              alt="Service Image 2"
              className="w-full md:w-[300px] h-[300px] object-cover shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-xl font-semibold text-gray-700">Flight Service</h3>
            <Link href="/search-flight">
              <button className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-2 px-4 rounded">Book Now</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#64AE33] py-8 text-center mt-12">
        <h2 className="text-white text-3xl font-bold">Other Advisory Service</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {data.services.map((service, index) => (
            <div key={index} className="text-center space-y-4">
              <img
                src={service.image}
                alt={`Advisory Service Image ${index + 1}`}
                className="w-[300px] h-[300px] object-cover mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
              />
              <h3 className="text-xl font-semibold h-14 text-gray-800">{service.name}</h3>
              <Link className="bg-[#64AE33] hover:bg-green-800 transition-all text-white py-3 px-4 rounded" href={`/service-specialities/${service.slug}`}>
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurService;
