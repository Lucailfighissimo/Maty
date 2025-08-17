import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const ArtistCard = ({ artist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3">
        <img 
          src={artist.image} 
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full"
        />
        <button 
          className={`absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } hover:scale-105 hover:bg-green-400`}
        >
          <Play size={16} className="text-black ml-0.5" />
        </button>
      </div>
      <h3 className="text-white font-medium text-sm mb-1 truncate text-center">{artist.name}</h3>
      <p className="text-gray-400 text-xs text-center">Artist</p>
    </div>
  );
};

export default ArtistCard;