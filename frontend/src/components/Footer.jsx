import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-2 bg-black text-white border-t border-gray-800">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:h-24">
        <p className="text-sm leading-loose text-center text-gray-400 mx-auto">
          &copy; {currentYear} SteamBeam. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
