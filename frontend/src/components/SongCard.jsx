import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const SongCard = ({ song, isPlaying, onPlay, onPause, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(song);
    }
  };

  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayPause}
    >
      <div className="relative mb-3">
        <img 
          src={song.image} 
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
          className={`absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg transition-all duration-300 ${
            isHovered || isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } hover:scale-105 hover:bg-green-400`}
        >
          {isPlaying ? 
            <Pause size={16} className="text-black ml-0.5" /> : 
            <Play size={16} className="text-black ml-0.5" />
          }
        </button>
      </div>
      <h3 className="text-white font-medium text-sm mb-1 truncate">{song.title}</h3>
      <p className="text-gray-400 text-xs truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;