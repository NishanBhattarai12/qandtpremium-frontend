import React, {useState} from 'react';
import Link from 'next/link';

const OurTeam = ({ data, visiondata }) => {
    data = data[0];
    console.log(data);
    visiondata = visiondata[0];

    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamClick = (team) => {
      setSelectedTeam(team);
    };

    const handleClosePopup = () => {
      setSelectedTeam(null);
    };

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
            {data.introduction && (
                <div className="p-8">
                    <h2 className="text-2xl text-gray-600 font-bold mb-4">Introduction</h2>
                    <p className="mb-4 text-gray-600" dangerouslySetInnerHTML={{ __html: data.introduction }}></p>
                </div>
            )}

            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.teams.map((team, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-md cursor-pointer" onClick={() => handleTeamClick(team)}>
                    <img src={team.image} alt={team.name} className="w-full h-auto rounded-lg mb-4" />
                    <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                    <p className="text-gray-600 mb-2">{team.title}</p>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: team.short_description }}></p>
                  </div>
                ))}
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

        {selectedTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl w-full max-h-[80vh] overflow-y-auto relative">
              <button className="absolute top-2 right-2 text-4xl text-gray-600" onClick={handleClosePopup}>
                &times;
              </button>
              <img src={selectedTeam.image} alt={selectedTeam.name} className="w-64 h-auto rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">{selectedTeam.name}</h3>
              <p className="text-gray-600 mb-2">{selectedTeam.title}</p>
              <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: selectedTeam.short_description }}></p>
              <p className="contents text-gray-600" dangerouslySetInnerHTML={{ __html: selectedTeam.long_description }}></p>
            </div>
          </div>
        )}
        </>
    );
};

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourteam/contents`);
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

export default OurTeam;