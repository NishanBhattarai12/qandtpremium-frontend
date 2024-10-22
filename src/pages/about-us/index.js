import React, { useState } from 'react';
import Link from 'next/link';

const AboutUs = ({ data, visiondata }) => {
  data = data[0];
  visiondata = visiondata[0];

  const [expandedStates, setExpandedStates] = useState(data.founders.map(() => false));

  const toggleReadMore = (index) => {
    setExpandedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${data.background_image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{data.title}</h1>
          <nav className="text-white mb-4">
            <Link className="hover:underline" href="/">
              Home
            </Link> &gt; <span>{data.title}</span>
          </nav>
        </div>
      </div>
        
      <div className="max-w-7xl mx-auto">
        <div className="px-8 pt-12">
          <h2 className="text-2xl text-center text-gray-700 font-bold mb-4">Introduction</h2>
          <p className="mb-4 text-center text-gray-600" dangerouslySetInnerHTML={{ __html: data.introduction }}></p>
        </div>

        {data.founders.map((founder, index) => {
          const words = founder.long_description.split(' ');
          const truncatedText = words.slice(0, 100).join(' ');
          const shouldShowReadMore = words.length > 100;

          return (
            <div key={index} className="p-8 mx-4 mt-6 rounded-lg bg-white shadow-lg md:flex md:items-center">
              <div className="md:w-1/3 flex justify-center self-start" style={{ marginTop: "50px" }}>
                <img
                  src={founder.image}
                  alt="Person"
                  className="w-40 h-40 object-cover rounded-full border-4 border-[#64AE33] transition-transform transform hover:scale-105"
                />
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800">{founder.name}</h3>
                <p className="text-lg text-gray-500">{founder.title}</p>
                <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: founder.short_description }}></p>
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span dangerouslySetInnerHTML={{ __html: expandedStates[index] ? founder.long_description : truncatedText }}></span>
                    {shouldShowReadMore && (
                      <>
                        {!expandedStates[index] && '...'}
                        <a
                          href="#"
                          className="text-[#64AE33] font-medium ml-1 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleReadMore(index);
                          }}
                        >
                          {expandedStates[index] ? 'Read Less' : 'Read More'}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: "60px" }} className="px-8 max-w-[900px] mb-6 mx-auto">
          <h2 className="text-2xl text-[#3466ad] text-center text-gray-600 font-bold mb-6">{visiondata.introduction}</h2>
          <div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visiondata.visions.map((item, index) => (
              <Link className="flex flex-col items-center text-center" key={index} href={`/our-vision/${item.slug}`}>
                <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-bold transition-all text-gray-600 hover:text-gray-800">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/aboutus/contents`);
  const data = await response.json();

  const vision = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourvision/contents`);
  const visiondata = await vision.json();
  return {
    props: {
      data,
      visiondata
    },
  };
};

export default AboutUs;