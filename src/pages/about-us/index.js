import React from 'react';
import Link from 'next/link';

const AboutUs = ({ data, visiondata }) => {
  data = data[0];
  visiondata = visiondata[0];

  return (
    <>
      <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${data.background_image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] p-8">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <nav className="text-white mb-4">
            <Link className="hover:underline" href="/">
              Home
            </Link> &gt; <span>{data.title}</span>
          </nav>
        </div>
      </div>
        
      <div className="max-w-7xl mx-auto">
        <div className="p-8">
          <h2 className="text-2xl text-center md:text-left text-gray-600 font-bold mb-4">Introduction</h2>
          <p className="mb-4 text-center md:text-left text-gray-600" dangerouslySetInnerHTML={{ __html: data.introduction }}></p>
        </div>

        <div className="p-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/6 flex flex-col items-center md:items-start">
            <img src={data.founders[0].image} alt="Person" className="mb-4 w-32 h-32 object-cover rounded-full md:w-auto md:h-auto" />
            <h3 className="text-xl font-bold text-center md:text-left">{data.founders[0].name}</h3>
            <p className="text-gray-600 mb-2 text-center md:text-left">{data.founders[0].title}</p>
            <p className="text-gray-600 text-center md:text-left" dangerouslySetInnerHTML={{ __html: data.founders[0].short_description }}></p>
          </div>
          <div className="w-full md:w-5/6 mt-4 md:mt-0 md:pl-8">
            <p className="text-gray-600 text-center md:text-left mb-4" dangerouslySetInnerHTML={{ __html: data.founders[0].long_description }}></p>
          </div>
        </div>

        <div className="p-8 flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-5/6 mt-4 md:mt-0">
            <p className="text-gray-600 text-center md:text-left mb-4 contents" dangerouslySetInnerHTML={{ __html: data.founders[1].long_description }}></p>
          </div>
          <div className="w-full md:w-1/6 pl-0 md:pl-8 flex flex-col items-center md:items-start">
            <img src={data.founders[1].image} alt="Person" className="mb-4 w-32 h-32 object-cover rounded-full md:w-auto md:h-auto" />
            <h3 className="text-xl font-bold text-center md:text-left">{data.founders[1].name}</h3>
            <p className="text-gray-600 mb-2 text-center md:text-left">{data.founders[1].title}</p>
            <p className="text-gray-600 text-center md:text-left" dangerouslySetInnerHTML={{ __html: data.founders[1].short_description }}></p>
          </div>
        </div>

        <div className="p-8 max-w-[900px] mb-6 mx-auto">
          <h2 className="text-2xl text-[#3466ad] text-center text-gray-600 font-bold mb-6">{visiondata.introduction}</h2>
          <div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visiondata.visions.map((item, index) => (
              <Link className="flex flex-col items-center text-center" key={index} href='#'>
                <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-bold text-gray-600">{item.title}</h3>
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