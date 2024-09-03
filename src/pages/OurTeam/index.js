import React from 'react';

const teamMembers = [
  {
    name: 'Mahesh Gaire',
    position: 'CEO',
    image: '/mahesh.jpg', // Replace with actual image URL
  },
  {
    name: 'Nishan Bhattarai',
    position: 'Project Head',
    image: '/nishan.jpg', // Replace with actual image URL
  },
  {
    name: 'Robert Johnson',
    position: 'CFO',
    image: 'https://example.com/path-to-cfo-image.jpg', // Replace with actual image URL
  },
  {
    name: 'Emily Davis',
    position: 'COO',
    image: 'https://example.com/path-to-coo-image.jpg', // Replace with actual image URL
  },
  // Add more team members here
];

function OurTeam() {
  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full h-[500px]">
        <img
          src="/ourteam.jpg" // Replace with actual header image URL
          alt="Team Header"
          className="w-full h-[500px] object-cover absolute"/>
     </div>
      {/* Team Members Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center transition-transform transform hover:scale-110 duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 object-cover rounded-full mx-auto mb-4 transition-transform transform"
              />
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-lg text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
