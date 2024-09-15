import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen fixed top-0 left-0 bg-white bg-opacity-75 z-50">
      <div className="loader rrrr border-t-4 border-[#64AE33]-500 rounded-full w-16 h-16 animate-spin"></div>
      <style jsx>{`
        .loader {
          border-top-color: #64AE33;
        }
      `}</style>
    </div>
  );
};

export default Loader;