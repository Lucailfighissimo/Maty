import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import PlaylistCard from './PlaylistCard';
import ArtistCard from './ArtistCard';
import { mockTrendingSongs, mockPopularArtists, mockPlaylists } from '../mockData';

const SearchPage = ({ searchQuery, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs([]);
      setFilteredArtists([]);
      setFilteredPlaylists([]);
    } else {
      const query = searchQuery.toLowerCase();
      
      setFilteredSongs(
        mockTrendingSongs.filter(song => 
          song.title.toLowerCase().includes(query) || 
          song.artist.toLowerCase().includes(query)
        )
      );
      
      setFilteredArtists(
        mockPopularArtists.filter(artist => 
          artist.name.toLowerCase().includes(query)
        )
      );
      
      setFilteredPlaylists(
        mockPlaylists.filter(playlist => 
          playlist.name.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery]);

  const handlePlay = (song) => {
    setCurrentTrack(song);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const browseCategories = [
    { name: 'Podcasts', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop' },
    { name: 'Made For You', color: 'bg-blue-600', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
    { name: 'Charts', color: 'bg-purple-600', image: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop' },
    { name: 'New Releases', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
    { name: 'Discover', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop' },
    { name: 'Concert', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop' },
    { name: 'Hip-Hop', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
    { name: 'Rock', color: 'bg-gray-600', image: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop' }
  ];

  if (searchQuery.trim() === '') {
    return (
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Browse all</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {browseCategories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden h-32`}
            >
              <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
              <div className="absolute -right-4 -bottom-2 transform rotate-12">
                <div className="w-20 h-20 rounded shadow-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
      {/* Search Results */}
      {filteredSongs.length === 0 && filteredArtists.length === 0 && filteredPlaylists.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Songs */}
          {filteredSongs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredSongs.map((song, index) => (
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
          )}

          {/* Artists */}
          {filteredArtists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;