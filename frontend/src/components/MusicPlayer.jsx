import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, List } from 'lucide-react';
import { mockCurrentTrack } from '../mockData';

const MusicPlayer = ({ currentTrack = mockCurrentTrack, isPlaying, setIsPlaying }) => {
  const [currentTime, setCurrentTime] = useState(currentTrack?.currentTime || 0);
  const [volume, setVolume] = useState(70);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  useEffect(() => {
    let interval;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, setIsPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * currentTrack.duration);
    setCurrentTime(newTime);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="bg-gray-900 border-t border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Track Info */}
      <div className="flex items-center space-x-3 w-1/4">
        <img 
          src={currentTrack.image} 
          alt={currentTrack.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="text-gray-400 hover:text-white transition-colors ml-2"
        >
          <Heart size={16} fill={isLiked ? '#1db954' : 'transparent'} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/2 max-w-lg">
        <div className="flex items-center space-x-4 mb-2">
          <button 
            onClick={() => setIsShuffled(!isShuffled)}
            className={`transition-colors ${isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
          <button 
            onClick={toggleRepeat}
            className={`transition-colors ${repeatMode > 0 ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat size={16} />
            {repeatMode === 2 && <span className="text-xs ml-1">1</span>}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="bg-white rounded-full h-1 relative"
              style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Volume and Other Controls */}
      <div className="flex items-center space-x-3 w-1/4 justify-end">
        <button className="text-gray-400 hover:text-white transition-colors">
          <List size={16} />
        </button>
        <div className="flex items-center space-x-2">
          <Volume2 size={16} className="text-gray-400" />
          <div className="w-20 bg-gray-600 rounded-full h-1">
            <div 
              className="bg-white rounded-full h-1"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;