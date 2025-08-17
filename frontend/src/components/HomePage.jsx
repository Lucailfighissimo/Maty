import React, { useState } from 'react';
import SongCard from './SongCard';
import PlaylistCard from './PlaylistCard';
import ArtistCard from './ArtistCard';
import { mockTrendingSongs, mockPopularArtists, mockPlaylists, mockRecentlyPlayed } from '../mockData';

const HomePage = ({ currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) => {
  const handlePlay = (song) => {
    setCurrentTrack(song);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
      {/* Recently Played */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRecentlyPlayed.map((item) => (
            <div 
              key={item.id}
              className="bg-gray-700 bg-opacity-50 rounded-md flex items-center p-2 hover:bg-opacity-70 transition-all cursor-pointer group"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="ml-4 flex-1">
                <p className="text-white font-medium text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Made for You */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* Trending Songs */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Trending songs</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mockTrendingSongs.map((song, index) => (
            <SongCard 
              key={song.id}
              song={song}
              index={index}
              isPlaying={isPlaying && currentTrack?.id === song.id}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Popular artists</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mockPopularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;