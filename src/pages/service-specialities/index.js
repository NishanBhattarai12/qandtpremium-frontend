import React from 'react';
import Link from 'next/link';

const ServiceAndSpecialities = ({ data, visiondata }) => {
    data = data[0];
    visiondata = visiondata[0];

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
            {data.introduction && (
                <div className="p-8">
                    <h2 className="text-2xl text-gray-700 font-bold mb-4">Introduction</h2>
                    <p className="mb-4 text-gray-600" dangerouslySetInnerHTML={{ __html: data.introduction }}></p>
                </div>
            )}

            <div className="p-8">
                {data.services.map((service, index) => (
                    <div key={index} className="p-4 border rounded-lg mb-4 shadow-md flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-[30%] flex justify-center items-center">
                        <img src={service.image} alt={service.name} className="w-full h-auto rounded-lg" />
                    </div>
                    <div className="w-full md:w-[70%] flex flex-col">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href='#' className="text-gray-700">
                                {service.name}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: service.long_description.length > 300 ? `${service.long_description.slice(0, 300)}...` : service.long_description }}>
                        </p>
                        <Link href='#' className="text-[#64AE33] hover:underline">
                            Learn more
                        </Link>
                    </div>
                  </div>
                ))}
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourservices/contents`);
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

export default ServiceAndSpecialities;